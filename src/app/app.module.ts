import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { NgxSpinnerModule } from 'ngx-spinner'; // Import the spinner module

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './Components/employee-details/employee-details.component';
import { LoadingInterceptor } from './Interceptors/LoadingInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CarouselModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,  // Add ReactiveFormsModule here
    HttpClientModule  // Add HttpClientModule here
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
