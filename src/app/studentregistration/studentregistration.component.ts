import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { RegistrationData } from './studentregistration.model'
import { RegistrationDataService } from './studentregistration.service'
import { Http } from '@angular/http';

@Component({
  selector: 'app-studentregistration',
  templateUrl: './studentregistration.component.html',
  styleUrls: ['./studentregistration.component.css']
})


export class StudentregistrationComponent {
  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  emailFormControl: any;
  public registerData :{} ;
  public registrationModel :{};
  


  constructor(private http: Http) { 
      this.registerData = {
			firstName: '',
			lastName: '',
			email: '',
      phone :'',
      address:''
    }
  }

  registration(model){
    this.registrationModel = {
      firstName: model.firstName,
			lastName: model.lastName,
			email: model.email,
      phone :model.phone,
      address:model.address
    };
    this.http.post('/api/developers/add', this.registrationModel).subscribe(
				(data => {
					
			        console.log("regidtrationData"+this.registrationModel);
			 	})
			);      
  }
 
}
