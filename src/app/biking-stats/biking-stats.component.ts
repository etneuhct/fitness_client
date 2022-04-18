import { Component, OnInit } from '@angular/core';
import {BikeBaseService} from "../_services/biking.service";

@Component({
  selector: 'app-biking-stats',
  templateUrl: './biking-stats.component.html',
  styleUrls: ['./biking-stats.component.css']
})
export class BikingStatsComponent implements OnInit {
  results: any;

  constructor(private bikeBaseService: BikeBaseService) { }

  ngOnInit(): void {
    this.bikeBaseService.getStats().subscribe(
      x => {
        this.results = x
      }
    )
  }

}
