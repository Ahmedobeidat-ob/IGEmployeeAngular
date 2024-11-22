import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeServiceService } from '../../Service/employee-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-employee-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './update-employee-dialog.component.html',
  styleUrl: './update-employee-dialog.component.css'
})
export class UpdateEmployeeDialogComponent {
  updateForm: FormGroup ;
  selectedFile: File | null = null;

  constructor( private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject the data
  ) {
    this.updateForm = this.fb.group({
      employeeId: [data.employeeId],
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      mobileNumber: [data.mobileNumber, Validators.required],
      homeAddress: [data.homeAddress, Validators.required],
    });
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  // Handle form submission
  submit(): void {
    if (this.updateForm.valid) {
      const updatedEmployee = this.updateForm.value;
      const formData = new FormData();

      formData.append('id', updatedEmployee.employeeId);
      formData.append('name', updatedEmployee.name);
      formData.append('email', updatedEmployee.email);
      formData.append('mobileNumber', updatedEmployee.mobileNumber);
      formData.append('homeAddress', updatedEmployee.homeAddress);

      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }

      // Close the dialog and send the formData back to the parent component
      this.dialogRef.close(formData);
    }}

  // Close dialog without returning data
  close(): void {
    this.dialogRef.close();
  }

  cancel(): void {
    this.updateForm.reset();
    this.dialogRef.close();
     // Reset the form fields
    // Close the dialog or navigate away, if needed
  }

}
