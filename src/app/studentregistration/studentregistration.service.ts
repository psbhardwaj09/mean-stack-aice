import { Injectable } from '@angular/core';
import { RegistrationData } from './studentregistration.model';

@Injectable()
export class RegistrationDataService {

    private registrationData: RegistrationData = new RegistrationData();
   
    constructor() { 
    }

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
}
