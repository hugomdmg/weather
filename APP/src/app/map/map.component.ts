import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { WeatherData } from '../../infrastructure/interfaces';
import Api from '../services/api';
import { DataVisualiceComponent } from '../data-visualice/data-visualice.component';

@Component({
  selector: 'app-map',
  imports:[DataVisualiceComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: L.Map;
  currentLat: string = "0";
  currentLon: string = "0";
  clickedLat: number | null = null;
  clickedLon: number | null = null;
  data: WeatherData = {wind:{}}

  @Output() dataEmitter: EventEmitter<WeatherData> = new EventEmitter<WeatherData>();



  ngOnInit(): void {
    this.map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.map.on('mousemove', (event: L.LeafletMouseEvent) => {
      this.currentLat = event.latlng.lat.toFixed(4);
      this.currentLon = event.latlng.lng.toFixed(4);
    });

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      this.clickedLat = event.latlng.lat;
      this.clickedLon = event.latlng.lng;
      this.doSearch()
    });

    this.map.dragging.enable();

  }

  sendDataToParent() {
    console.log(this.data)
    this.dataEmitter.emit(this.data);
  }
  async doSearch() {
    const response = await Api.post('coord-weather', { coord: [{ lat: this.clickedLat, lon: this.clickedLon }] })
    this.data = response[0]
    this.sendDataToParent()
  }
  async searchLocation(locationName: string): Promise<void> {
    this.doSearchByName(locationName)
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`;
  
    try {
      const response = await fetch(geocodeUrl);
      const results = await response.json();
  
      if (results && results.length > 0) {
        const { lat, lon } = results[0];
        this.map.setView([lat, lon], 12);
  
        L.marker([lat, lon]).addTo(this.map).bindPopup(locationName).openPopup();
      } else {
        console.error('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  }


  async doSearchByName(name:string) {
    const response = await Api.post('city-weather', { city: name})
    this.data = response
    this.sendDataToParent()

  }
  
}
