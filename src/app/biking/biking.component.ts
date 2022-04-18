import { Component, OnInit } from '@angular/core';
import {BikingService} from "../_services/biking.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-biking',
  templateUrl: './biking.component.html',
  styleUrls: ['./biking.component.css']
})
export class BikingComponent implements OnInit {

  meterPerRotation = 1.25;
  displayData = {totalTime: null, distance: null, speed: null, meanSpeed: null};
  view: any = [1400, 700];
  legend = false;
  yAxis = true;
  xAxisLabel = 'time';
  yAxisLabel = 'speed';
  timeline = false;
  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  speeds = [];
  speedStat: any;
  distance: any;
  globalSpeed: any;
  duration: any;

  constructor(private bikingService: BikingService) { }

  ngOnInit(): void {
    this.bikingService.getObjectBehaviorSubject()
      .pipe(map(
        res => {
        if (!res) { return null; }
        // @ts-ignore
        const lastRouteStats = res[0];
        this.distance = lastRouteStats.distance;
        this.duration = lastRouteStats.duration;
        this.globalSpeed = lastRouteStats.globalSpeed;
        this.speeds = lastRouteStats.speeds;
        this.speedStat = [
            {
            name: 'Biking',
            series:
              this.speeds
            }
          ];
        return;
        }
      )).subscribe();
  }

}
