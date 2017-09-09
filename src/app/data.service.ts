import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result: any;

  constructor(private _http: Http) { }

  getUsers() {
    console.log('getUsers');
    this.setUsers().subscribe(res => console.log('Registraion :', res));
    return this._http.get('http://localhost:8080/api/students')
      .map(result => this.result = result.json());
  }

  setUsers() {
    console.log('setUsers');
    return this._http.post('http://localhost:8080/api/register', {firstName : "Pardeep"})
      .map(result => this.result = result.json().data);
  }

}
