import { Injectable } from '@angular/core';
import { RegistrationData } from './studentregistration.model';
import { Http } from '@angular/http';

@Injectable()
export class RegistrationDataService {

    result;
    private registrationData: RegistrationData = new RegistrationData();
    constructor(private _http: Http) {}

    getFormData(): RegistrationData {
        // Return the entire Form Data
        return this.registrationData;
    }

    resetFormData(): RegistrationData {
        // Return the form data after all this.* members had been reset
        this.registrationData.clear();
        return this.registrationData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false

    }

    register(formdata: any) {
      console.log('register Student');
      return this._http.post('http://localhost:3000/api/registration', formdata)
      .map(result => this.result = result.json());

    }
}
