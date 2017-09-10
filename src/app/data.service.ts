import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class DataService {

  result: any;

  constructor(private _http: Http) { }

  //  getUsers() {
  //   return this._http.get('http://localhost:3000/api/students')
  //     .map(result => this.result = result.json());
  // }

  register(formdata: any) {
    console.log('register Student');
    return this._http.post('http://localhost:3000/api/registration', formdata)
    .map(result => this.result = result.json());
  }

}
