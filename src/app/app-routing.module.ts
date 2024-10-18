import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';
import { HomeComponent } from './Components/home/home.component';
import { EmployeeDetailsComponent } from './Components/employee-details/employee-details.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'home', component: HomeComponent }, // Changed 'Home' to 'home'
  { path: 'employees/details/:id', component: EmployeeDetailsComponent },
  { path: 'employees/add', component: EmployeeFormComponent },
  { path: 'employees/edit/:id', component: EmployeeFormComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
