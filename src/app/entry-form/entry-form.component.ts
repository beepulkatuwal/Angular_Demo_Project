import { Component, Inject } from '@angular/core';
import {FormControl, FormGroup,FormBuilder, Validators} from '@angular/forms';import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent {
  formDetail:any = FormGroup;
  actionBtn : string = "Save"
  constructor( private formbuilder:FormBuilder, 
    private api: ApiService, 
    private dialogRef :MatDialogRef<EntryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,){ }


ngOnInit():void{
this.formDetail= this.formbuilder.group({
  firstName : ['',Validators.required],
  middleName: [''],
  lastName: ['',Validators.required],
  address: ['',Validators.required],
  city:['',Validators.required],
  state:['',Validators.required],
  postalCode:['',Validators.required]

})

// console.log(this.editData);
if(this.editData){
  this.actionBtn =" Update"
  this.formDetail.controls['firstName'].setValue(this.editData.firstName);
  this.formDetail.controls['middleName'].setValue(this.editData.middleName);
  this.formDetail.controls['lastName'].setValue(this.editData.lastName);
  this.formDetail.controls['address'].setValue(this.editData.address);
  this.formDetail.controls['city'].setValue(this.editData.city);
  this.formDetail.controls['state'].setValue(this.editData.state);
  this.formDetail.controls['postalCode'].setValue(this.editData.postalCode);
}
}
addDetails(){
  console.log(this.formDetail);
 if(!this.editData){
  if(this.formDetail.valid){
    this.api.postDetails(this.formDetail.value)
    .subscribe({
      next:(res)=>{
        alert("Details added succesfully");
        this.formDetail.reset();
        this.dialogRef.close();
      },
      error:()=>{
        alert("Error")
      }

    })
  }
}
else{
  this.updateDetails();
}
 }



  updateDetails() {
    this.api.putDetails(this.formDetail.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Details Updated succesfully");
        this.formDetail.reset();
        this.dialogRef.close();
        
      },
      error:()=>{
        alert("Error in Updating Details");
      }

    })
  }


 

}
