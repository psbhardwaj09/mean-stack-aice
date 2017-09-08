import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';


// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { StudentregistrationComponent } from './studentregistration/studentregistration.component';
import { FindresultComponent } from './findresult/findresult.component';
import { StudentresultComponent } from './studentresult/studentresult.component';
import { CoursesComponent } from './courses/courses.component';
import { ExaminationComponent } from './examination/examination.component';
import { VerifyadmissionComponent } from './verifyadmission/verifyadmission.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';

import { MdButtonModule, MdCardModule, MdSelectModule,
  MdNativeDateModule, MdInputModule, MdIconModule, MdDatepickerModule } from '@angular/material';

import { RegistrationDataService } from './studentregistration/studentregistration.service'



const ROUTES: Routes = [
  { path : '', component : CarouselComponent},
  { path: 'studentRegistraion', component: StudentregistrationComponent },
  { path: 'aboutus',      component: AboutusComponent },
  { path: 'contactus',      component: ContactusComponent },
  { path: 'courses',      component: CoursesComponent },
  { path: 'result',      component: StudentresultComponent },
  { path: 'onlineExam',      component: ExaminationComponent },
  { path: 'verifyRegistraion',      component: VerifyadmissionComponent }
];


@NgModule({
  declarations: [

    AppComponent,
    NavbarComponent,
    CarouselComponent,
    StudentregistrationComponent,
    FindresultComponent,
    StudentresultComponent,
    CoursesComponent,
    ExaminationComponent,
    VerifyadmissionComponent,
    ContactusComponent,
    AboutusComponent
  ],
  imports: [
    RouterModule.forRoot(
      ROUTES,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule ,             // <-Add HttpModule
    BrowserAnimationsModule,
    MdButtonModule, // Add material components to imports array
    MdCardModule,
    MdSelectModule,
    MdInputModule,
    MdIconModule,
    MdDatepickerModule,
    MdNativeDateModule
  ],
  providers: [DataService, RegistrationDataService], // <-Add DataService
  bootstrap: [AppComponent]
})
export class AppModule { }
