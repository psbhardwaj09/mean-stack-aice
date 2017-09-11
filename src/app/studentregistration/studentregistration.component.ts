import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

import { RegistrationData } from './studentregistration.model';
import { RegistrationDataService } from './studentregistration.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-studentregistration',
  templateUrl: './studentregistration.component.html',
  styleUrls: ['./studentregistration.component.css']
})


export class StudentregistrationComponent implements OnInit {
  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  emailFormControl: any;

  registerData: {};
  public registrationModel: {};
  firstName: string;
  lastName: string;
  email: string;
  selectedPhoto: any;
  selectedAadhar: any;
  imageName : string;
  aadharIdName : string;

  constructor(private _dataService: RegistrationDataService,private router : Router) {
   
  }

  ngOnInit() {
     this.registerData = {
			firstName: '',
			lastName: '',
			email: '',
      phone: '',
      address: '',
      
    };
    if(this._dataService.resetFormData){
      this.registerData = this._dataService.resetFormData
    }
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(this.EMAIL_REGEX)]);
  }

  uploadImage(fileObj) {
    this.selectedPhoto = fileObj.path[0].files[0];
    this.imageName = fileObj.path[0].files[0].name;
    console.log('Selected FIle :', fileObj);
  }

  uploadAadhar(aadharObj) {
    this.selectedAadhar = aadharObj.path[0].files[0];
    this.aadharIdName = aadharObj.path[0].files[0].name
    console.log('Selected FIle :', this.selectedAadhar);
  }

  registerStudent(formValues) {
   this._dataService.resetFormData = formValues;
   let formData = new FormData();
   formData.append('selectedPhoto', this.selectedPhoto);
   formData.append('selectedAadhar', this.selectedAadhar);
   formData.append('firstName', formValues.firstName);
   formData.append('lastName', formValues.lastName);
   formData.append('email', formValues.email);
   formData.append('phone', formValues.phone);
   formData.append('address', formValues.address);
   this._dataService.saveFormModel=formData;
   this.router.navigate(['/previewForm']);
  // this._dataService.register(formData).subscribe(response => console.log(response));
  }

  // preview(){
  //   this.router.navigate(['/previewForm']);
  // }
}


