import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EntryFormComponent } from '../entry-form/entry-form.component';
@Component({
  selector: 'app-na-bar',
  templateUrl: './na-bar.component.html',
  styleUrls: ['./na-bar.component.css']
})
export class NaBarComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
     this.dialog.open(EntryFormComponent,{
     width: "50%",
    })
  }
}
