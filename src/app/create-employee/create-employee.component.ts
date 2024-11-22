import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { EmployeeServiceService } from '../Service/employee-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  createForm!: FormGroup ;
  errorMessage: string = ''; // To hold error message
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeServiceService // Inject the service
  ) {
     this.createForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', Validators.required],
    homeAddress: ['', Validators.required],
    file: [null]
  });
}



ngOnInit() {
  this.createForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', Validators.required],
    homeAddress: ['', Validators.required],
    file: [null]
  });
}


onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.createForm.patchValue({ file });
  }
}



submit(): void {
  if (this.createForm.invalid || !this.createForm.get('file')?.value) {
    alert('Please make sure all fields are filled and a file is selected.');
    return;
  }

  const formData = new FormData();
  formData.append('name', this.createForm.get('name')?.value);
  formData.append('email', this.createForm.get('email')?.value);
  formData.append('mobileNumber', this.createForm.get('mobileNumber')?.value);
  formData.append('homeAddress', this.createForm.get('homeAddress')?.value);

  const fileInput = this.createForm.get('file')?.value;

  // Ensure file is added to the FormData
  if (fileInput) {
    formData.append('file', fileInput);
  }

  // Call the service with the FormData
  this.employeeService.createEmployee(formData).subscribe(
    response => {
      console.log('Employee created successfully', response);
      this.router.navigate(['']);
    },
    error => {
      console.error('Error creating employee:', error);
    }
  );
}

cancel():void{
  this.router.navigate(['']);
}


}
