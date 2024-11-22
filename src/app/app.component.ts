import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ListOfEmployeeComponent } from './list-of-employee/list-of-employee.component';
import { HttpClient } from '@angular/common/http';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',



})

export class AppComponent {
  title = 'IGEmployee';
}
