import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmployeeServiceService } from '../Service/employee-service.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationMessageComponent } from '../dialog/confirmation-message/confirmation-message.component';
import { UpdateEmployeeDialogComponent } from '../dialog/update-employee-dialog/update-employee-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { routes } from '../app.routes';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-list-of-employee',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './list-of-employee.component.html',
  styleUrl: './list-of-employee.component.css'
})
export class ListOfEmployeeComponent {
  @ViewChild('employeeTable') tableRef!: ElementRef;
  employees: any[] = [];
  isLoading: boolean = true; // To show a loading indicator while fetching data
  errorMessage: string | null = null;
  isPopupOpen:boolean=false;
  constructor(private service:EmployeeServiceService, private router: Router ,private dialog: MatDialog){}


  ngOnInit():void {
this.fetchEmployees();
this.isPopupOpen=true;
  }


  fetchEmployees():void{
    this.service.getEmployees().subscribe({
      next:(data)=>{
        this.employees=data;
        this.isLoading=false;
      },
      error:(err)=>{
        this.errorMessage= 'Failed to fetch employees. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching employees:', err);
      },
    });
  }


  deleteEmployee(employeeId: string): void {
    this.isPopupOpen=false;
    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {

      data: {

        message: 'Are you sure you want to delete this employee?',
        employeeId

      },
      width: '400px',
      position: {
        top: '-10%',  // Adjust this to move the dialog above the table
        left: '35%',  // Centers the dialog horizontally
      },

    });


    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.isPopupOpen=true,
        this.service.deleteEmployee(employeeId).subscribe({
          next: () => {
            this.employees = this.employees.filter(emp => emp.employeeId !== employeeId);
            console.log('Employee deleted successfully');
          },
          error: (err) => {
            this.errorMessage = 'Failed to delete employee. Please try again later.';
            console.error('Error deleting employee:', err);
          }
        });
      } else {
        console.log('Delete operation canceled');
        this.isPopupOpen=true;
      }
    });
  }




  openUpdateEmployeeDialog(employeeId: string): void {
    console.log('Update button clicked for employee:', employeeId); // Debugging line

    const employee = this.employees.find(emp => emp.employeeId === employeeId);
    if (employee) {
     this.isPopupOpen=false;
      const dialogRef = this.dialog.open(UpdateEmployeeDialogComponent, {
        data: { ...employee }, // Pass the entire employee object
        width: '400px',        // Optional: Set dialog width
        disableClose: true,    // Optional: Prevent closing by clicking outside
        position: {  top: '-10%', left:'500px' },
        hasBackdrop: false,   // Ensure backdrop is enabled
        backdropClass: 'custom-backdrop',
         // Center the dialog vertically (10% from the top)
      });

      dialogRef.afterClosed().subscribe((formData: FormData) => {
this.isPopupOpen=true;
        if (formData) {
          this.service.updateEmployee(employeeId, formData).subscribe({
            next: () => {
              this.fetchEmployees(); // Refresh the employee list after update
            },
            error: (err) => {
              console.error('Failed to update employee:', err);
            }
          });
        }
      });
    }
  }



  updateEmployee(data: any): void {
    const { employeeId, file, ...employeeData } = data;

    const formData = new FormData();
    formData.append('id', employeeId);
    formData.append('name', employeeData.name);
    formData.append('email', employeeData.email);
    formData.append('mobileNumber', employeeData.mobileNumber);
    formData.append('homeAddress', employeeData.homeAddress);

    if (file) {
      formData.append('file', file);
    }

    this.service.updateEmployee(employeeId, formData).subscribe({
      next: () => {
        this.fetchEmployees(); // Reload the employee list
      },
      error: (err) => {
        console.error('Failed to update employee:', err);
      },
    });
  }

  navigateToCreatePage():void{
   this.router.navigate(['/create-employee'])
  }
}
