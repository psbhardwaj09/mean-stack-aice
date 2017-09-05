import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    HttpModule              // <-Add HttpModule
  ],
  providers: [DataService], // <-Add DataService
  bootstrap: [AppComponent]
})
export class AppModule { }
