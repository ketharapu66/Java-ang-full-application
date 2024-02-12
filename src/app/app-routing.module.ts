import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import { DateFormComponent } from './date-form/date-form.component';
import { NavComponent } from './nav/nav.component';
import { Subscreen1Component } from './subscreen1/subscreen1.component';
import { Subscreen2Component } from './subscreen2/subscreen2.component';
import { EmployeeComponent } from './employee/employee.component';
import {EmployeelistComponent} from './employeelist/employeelist.component';

const routes: Routes = [
  {path:'',component:EmployeelistComponent},
  { path: 'employee', component: EmployeeComponent },
  { path: 'nav', component: NavComponent },
  { path: 'form', component: FormComponent },
  { path: 'view', component: ViewComponent },
  { path: '', redirectTo: '/employee', pathMatch: 'full' },
  { path: 'employee/:id', component: EmployeeComponent },
  { path: '', redirectTo: '/employee', pathMatch: 'full' },
 
  { path: 'date-form', component: DateFormComponent },
  { path: 'sublist1/subscreen1', component: Subscreen1Component }, // Add route for subscreen1
  { path: 'sublist2/subscreen2', component: Subscreen2Component }, // Add route for subscreen2
  
 
   // Wildcard route to redirect any unknown paths to the nav component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
