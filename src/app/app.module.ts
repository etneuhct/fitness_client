import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BikingComponent} from './biking/biking.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BodyShapeComponent} from './body-shape/body-shape.component';
import {SortByDatePipe} from './_pipes/sort-by-date.pipe';
import {BikingStatsComponent} from './biking-stats/biking-stats.component';
import {FormatStatsPipe} from './_pipes/format-stats.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BikingComponent,
    BodyShapeComponent,
    SortByDatePipe,
    BikingStatsComponent,
    FormatStatsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  static InjectorInstance: Injector;

  constructor(private injector: Injector) {
    AppModule.InjectorInstance = injector;
  }
}
