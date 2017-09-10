import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
 import { DataService } from '../data.service';

@Component({
  selector: 'app-studentregistration',
  templateUrl: './studentregistration.component.html',
  styleUrls: ['./studentregistration.component.css']
})


export class StudentregistrationComponent implements OnInit {
  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  emailFormControl: any;

  firstName: string;
  lastName: string;
  email: string;
  selectedPhoto: any;

  constructor(private _dataService: DataService) {
    this.firstName = '';
    this.lastName = '';
  }

  ngOnInit() {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(this.EMAIL_REGEX)]);
  }

  uploadImage(fileObj) {
    this.selectedPhoto = fileObj.path[0].files[0];
    console.log('Selected FIle :', fileObj);
  }

  registerStudent() {
   const formData = new FormData();

   formData.append('firstName', this.firstName);
   formData.append('lastName', this.lastName);
   formData.append('email', this.email);
   formData.append('selectedPhoto', this.selectedPhoto);
   this._dataService.register(formData).subscribe(response => console.log(response));

  }

}
