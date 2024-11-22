import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Route, Routes } from '@angular/router';
import { ListOfEmployeeComponent } from './app/list-of-employee/list-of-employee.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
