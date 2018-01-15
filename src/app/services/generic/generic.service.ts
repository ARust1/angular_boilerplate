import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions } from '@angular/http';
import { CredentialsService } from '../credentials/credentials.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class GenericService<T> {
  constructor(public http: Http, public credentials: CredentialsService) {
  }

  buildUrl(modelName: string): string {
    let url = this.credentials.getApiUrl();
    if (modelName) {
      url += `${modelName}`;
    }
    return url;
  }

  getRequest(url: string): Observable<T> {
    const requestOptions = this.credentials.getRequestOptions();
    return this.http.get(url, requestOptions)
      .map(response => response.json() as T)
      .catch(this.catchError);
  }

  postRequest(url: string, data: any): Observable<T> {
    const requestOptions = this.credentials.getRequestOptions();
    return this.http.post(url, JSON.stringify(data) , requestOptions)
      .map(response => response.json() as T)
      .catch(this.catchError);
  }

  putRequest(url: string, data: any): Observable<T> {
    const requestOptions = this.credentials.getRequestOptions();
    return this.http.put(url, JSON.stringify(data) , requestOptions)
      .map(response => response.json() as T)
      .catch(this.catchError);
  }

  deleteRequest(url: string): Observable<T> {
    const requestOptions = this.credentials.getRequestOptions();
    return this.http.delete(url, requestOptions)
    .map(response => response.json() as T)
    .catch(this.catchError);
  }

  catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error');
  }

  logResponse(res: Response) {
    return res;
  }

  extractData(res: Response) {
    return res.json();
  }
}
;