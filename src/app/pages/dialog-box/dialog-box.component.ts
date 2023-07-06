import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if(this.data) this.isEdit = false
  }

  isEdit = true

  onClose() {
    this.dialogRef.close(null)
  }

  myForm: FormGroup = new FormGroup({
     title: new FormControl(this.data?.title ?? ''), 
     imagePath: new FormControl(this.data?.imagePath ?? ''),
     content: new FormControl(this.data?.content ?? ''),
     price: new FormControl(this.data?.price ?? ''),
     year: new FormControl(this.data?.year ?? ''),
     chip: new FormControl(this.data?.chip ?? ''),
     SSD: new FormControl(this.data?.SSD ?? ''),
     memory: new FormControl(this.data?.memory ?? ''),
     display: new FormControl(this.data?.display ?? '')
  })

  onSubmit() {
    console.log(this.myForm)
    this.data = {
      title: this.myForm.value.title,
      imagePath: this.myForm.value.imagePath,
      content: this.myForm.value.content,
      price: this.myForm.value.price,
      year: this.myForm.value.year,
      chip: this.myForm.value.chip,
      SSD: this.myForm.value.SSD,
      memory: this.myForm.value.memory,
      display: this.myForm.value.display    
    }
    this.dialogRef.close(this.data)
  }
}
