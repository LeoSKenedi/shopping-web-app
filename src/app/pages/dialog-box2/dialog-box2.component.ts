import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box2',
  templateUrl: './dialog-box2.component.html',
  styleUrls: ['./dialog-box2.component.css']
})
export class DialogBox2Component {
  constructor(public dialogRef: MatDialogRef<DialogBox2Component>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onClose() {
    this.dialogRef.close();
  }

  myForm: FormGroup = new FormGroup({
    name: new FormControl(''), 
    surname: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
 })

 onSubmit() {
   console.log(this.myForm)
   this.data = {
     name: this.myForm.value.name,
     surname: this.myForm.value.surname,
     phone: this.myForm.value.phone,
     email: this.myForm.value.email,
    }
   this.dialogRef.close(this.data)
 }
}
