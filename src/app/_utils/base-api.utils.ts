import {Observable} from "rxjs";
import {apiRoutes} from "./const.utils";
import {HttpClient} from "@angular/common/http";

export interface BaseApiInterface {
  getObject(objectId?: number | null, queryParameter?: {}, url ?: string): Observable<any>;

  patchObject(objectId: number, objectData: {}): Observable<any>;

  deleteObject(objectId: number): Observable<any>;

  createObject(objectData: {}): Observable<any>;
}

export abstract class BaseApiService implements BaseApiInterface {
  baseApiUrl = apiRoutes.base;
  apiUrl = this.baseApiUrl.toString();

  protected constructor(protected http: HttpClient) {
  }

  public getObject(id: number | null = null, queryParameter?: {}, url = this.apiUrl): Observable<any> {
    if (id !== null) {
      return this.http.get<any>(url + id.toString() + '/', {params: queryParameter});
    }
    return this.http.get<any>(url, {params: queryParameter});

  }

  public patchObject(objectId: number, objectData: {}, url = this.apiUrl): Observable<any> {
    return this.http.patch<any>(url + objectId + '/', objectData);
  }

  public deleteObject(objectId: number, url = this.apiUrl): Observable<any> {
    return this.http.delete<any>(url + objectId);
  }

  public createObject(objectData: {}, url = this.apiUrl): Observable<any> {
    return this.http.post<any>(url, objectData);
  }
}
