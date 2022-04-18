import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BikingComponent} from "./biking/biking.component";
import {BodyShapeComponent} from "./body-shape/body-shape.component";
import {BikingStatsComponent} from "./biking-stats/biking-stats.component";

const routes: Routes = [
  {component: BikingComponent, path: 'biking'},
  {component: BodyShapeComponent, path: 'body-shape'},
  {component: BikingStatsComponent, path: 'biking-stats'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
