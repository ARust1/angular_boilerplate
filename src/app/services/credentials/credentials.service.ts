import { Injectable, isDevMode } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { request } from 'https';

@Injectable()
export class CredentialsService {
  requestOptions: RequestOptions;

  private apiUrl = {
    dev: '',
    prod: ''
  };

  constructor() { }

  public getApiUrl() {
    return isDevMode()
      ? this.apiUrl.dev
      : this.apiUrl.prod;
  }

  public getBasicAuthKey() {
    const key: string = localStorage.getItem('bAuthKey');
    return key;
  }

  public persistBasicAuthKey(username: string, password: string) {
    const bAuthKey = btoa(username + ':' + password);
    localStorage.setItem('bAuthKey', bAuthKey);
    this.buildRequestOptions();
  }


  public buildRequestOptions() {
    let headers: Headers;
    let requestOptions: RequestOptions;
    const key = this.getBasicAuthKey();
    return new Promise((resolve, reject) => {
      headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + key);
      requestOptions =  new RequestOptions({
        headers: headers
      });
      this.requestOptions = requestOptions;
      resolve(requestOptions);
    });
  }

  public getRequestOptions(): RequestOptions {
    return this.requestOptions;
  }
}
