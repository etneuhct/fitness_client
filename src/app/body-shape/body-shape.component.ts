import { Component, OnInit } from '@angular/core';
import {BodyShapeService} from "../_services/body-shape.service";
import {SortByDatePipe} from "../_pipes/sort-by-date.pipe";

@Component({
  selector: 'app-body-shape',
  templateUrl: './body-shape.component.html',
  styleUrls: ['./body-shape.component.css']
})
export class BodyShapeComponent implements OnInit {

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
  data: any;
  distance: any;
  globalSpeed: any;
  duration: any;


  constructor(
    private bodyShapeService: BodyShapeService
  ) { }

  ngOnInit(): void {
    const sortByDatePipe = new SortByDatePipe();
    this.bodyShapeService.objectBehaviorSubject.subscribe(
      shapes => {
        if (shapes) {
          const sorted = sortByDatePipe.transform(shapes, true, 'date')
          console.log(sorted)
          const values = []
          for (const key of [
            'body_fat', 'body_water', 'bone_mass', 'subcutaneous_fat', 'visceral_fat', 'weight',
            'lean_body_mass', 'muscle_mass', 'protein_rate']) {
            values.push(
              {
                name: key,
                series: Array.from(sorted.filter((v: any) => v[key]), (y: any) => ({
                  name: y.date,
                  value: y[key]
                }))
              }
            )
          }
          console.log(values)
          this.data = values
        }
      }
    )
  }

}
