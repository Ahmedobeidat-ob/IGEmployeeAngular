import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'; // Import MatDialogModule

@Component({
  selector: 'app-confirmation-message',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirmation-message.component.html',
  styleUrl: './confirmation-message.component.css'

})
export class ConfirmationMessageComponent {


  constructor(
    public dialogRef: MatDialogRef<ConfirmationMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Ensure you inject the dialog data
  ) {}

  onCancel(): void {

    this.dialogRef.close();
  }

  onConfirm(): void {


    this.dialogRef.close(true); // Close the dialog and pass a confirmation value
  }


}
