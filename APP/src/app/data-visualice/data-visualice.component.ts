import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from '../../infrastructure/interfaces';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-data-visualice',
  imports: [CommonModule],
  templateUrl: './data-visualice.component.html',
  styleUrl: './data-visualice.component.css'
})
export class DataVisualiceComponent implements OnInit {
  @Input() dataFromParent: WeatherData = {wind:{}};
  ngOnInit(): void {
  }
  
}
