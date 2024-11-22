import { Routes } from '@angular/router';
import { ListOfEmployeeComponent } from './list-of-employee/list-of-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';


export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: ListOfEmployeeComponent },
  { path: 'create-employee', component: CreateEmployeeComponent },
];
