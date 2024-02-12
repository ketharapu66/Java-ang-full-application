import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import { CommonModule } from '@angular/common';
import { DateFormComponent } from './date-form/date-form.component';
import { NavComponent } from './nav/nav.component';
import { Subscreen1Component } from './subscreen1/subscreen1.component';
import { Subscreen2Component } from './subscreen2/subscreen2.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ViewComponent,
    DateFormComponent,
    NavComponent,
    Subscreen1Component,
    Subscreen2Component,
    EmployeeComponent,
    EmployeelistComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule ,// Add FormsModule here
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
