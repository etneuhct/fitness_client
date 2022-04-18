import { Injectable } from '@angular/core';
import {BaseApiService} from "../_utils/base-api.utils";
import {apiRoutes} from "../_utils/const.utils";
import {HttpClient} from "@angular/common/http";
import {ObjectApiService} from "../_utils/api.utils";

@Injectable({
  providedIn: 'root'
})
export class BodyShapeBaseService extends BaseApiService {
  apiUrl = this.baseApiUrl + apiRoutes.bodyShape;
  constructor(http: HttpClient) {
    super(http);
  }
}

@Injectable({
  providedIn: 'root'
})
export class BodyShapeService extends ObjectApiService {
  constructor(api: BodyShapeBaseService) {
    super(api)
  }
}
