import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { RegistrationDataService } from '../studentregistration/studentregistration.service';
import { Http } from '@angular/http';

@Component({
  selector: 'reg-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})


export class PreviewComponent implements OnInit {
public  previewData = {};
  
constructor(private _dataService: RegistrationDataService,private router :Router) { 
  
  this.previewData = _dataService.resetFormData;
  console.log("preview data",this.previewData);
  
}
ngOnInit() {
  
}
saveRegistationData( serviceVar : RegistrationDataService ){
  this._dataService.register(this._dataService.saveFormModel).subscribe(response => console.log(response));
}

editRegistationData(){
   this.router.navigate(['/studentRegistraion']);
}
}
