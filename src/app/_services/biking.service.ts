import { Injectable } from '@angular/core';
import {ObjectApiService} from "../_utils/api.utils";
import {BaseApiService} from "../_utils/base-api.utils";
import {apiRoutes, wsRoutes} from "../_utils/const.utils"
import {HttpClient} from "@angular/common/http";
import {Biking} from "../_interfaces/biking";
import {RouteStats} from "../_interfaces/route-stats";
import {map} from "rxjs/operators";
import {WebsocketService} from "./websocket.service";
import {environment} from "../../environments/environment";
import {Subject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class BikeBaseService extends BaseApiService {
  apiUrl = this.baseApiUrl + apiRoutes.biking;
  constructor(http: HttpClient) {
    super(http);
  }

  getStats() {
    return this.http.get(this.baseApiUrl + apiRoutes.bikingStats)
  }
}

@Injectable({
  providedIn: 'root'
})
export class BikingService extends ObjectApiService{
  message = new Subject<any>()

  constructor(
    protected api: BikeBaseService,
    private webSocketService: WebsocketService) {
    super(api)
    this.connect()
    this.message.subscribe(
      x => {
        if (Object.keys(x).indexOf('biking') > -1) {
          this.getObject(x['biking'])
        }
      }
    )
  }
  getDistance(bikeExercises: Biking[]): number {
    return bikeExercises.length;
  }
  getDuration(bikeExercises: Biking[]): number {
    return Number(bikeExercises[0]) - Number(bikeExercises[bikeExercises.length - 1]);
  }
  getRouteStats(bikeExercises: Biking[]): RouteStats {
    const distance = this.getDistance(bikeExercises);
    const duration = this.getDuration(bikeExercises);
    return {
      distance,
      duration,
      globalSpeed: distance / duration,
      speeds: this.getSpeeds(bikeExercises)
    };
  }
  getSpeeds(bikeExercises: Biking[]): any {
    const speedResults = [];
    let previous = -1;
    const exercises = bikeExercises.reverse();
    for (const bikeExercise of exercises) {
      if (previous > -1) {
        const timeBetween = (Number(bikeExercise) - Number(exercises[previous]));
        if (timeBetween && timeBetween > 0.2) {
          const speed = 1 / timeBetween;
          speedResults.push({name: bikeExercise, value: speed});
        }
      }
      previous += 1;
    }
    return speedResults;
  }
  getRoutes(bikePartialExercises: Biking[]): any {
    const lastRoute = [];
    let lastExercise = null;
    const sortedExercises = Array.from(bikePartialExercises, x => x.date).sort().reverse();
    for (const exercise of sortedExercises) {
      if (lastExercise == null || (Number(lastExercise) - Number(exercise)) < 30 ) {
        lastRoute.push(exercise);
        lastExercise = exercise;
      }
    }
    return [lastRoute];
  }
  getObjectBehaviorSubject(): any {
    return this.objectBehaviorSubject.pipe(
      map(res => {
      if (!res) { return null; }
      const results = [];
      for (const route of this.getRoutes(res)) {
        results.push(this.getRouteStats(route));
      }
      return results;
    }));
  }
  connect() {
    const url = `${environment.wsBaseUrl}notification/`
    this.webSocketService.connect(url).subscribe(
      x => {
        this.message.next(x)
      },
      error => {
      }
    )
  }
}
