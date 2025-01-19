import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';import { WeatherData } from '../infrastructure/interfaces';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
  receivedData: WeatherData = {wind:{}}

  onDataReceived(data: WeatherData) {
    this.receivedData = data;
  }
}
