import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { GenericService } from './../../app/services/generic/generic.service';
import { Injectable } from '@angular/core';
import { CredentialsService } from '../../app/services/credentials/credentials.service';

@Injectable()
export class AuthService extends GenericService<any> {

  constructor(public http: Http, public credentials: CredentialsService) {
    super(http, credentials);
  }

  auth(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.credentials.persistBasicAuthKey(username, password);
      resolve();
    }).catch(err => {
      console.log(err);
    });
  }

  getMember(): Observable<any> {
    return this.getRequest(this.buildUrl('members'));
  }
}
