import { Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import {Observable} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EntryFormComponent } from '../entry-form/entry-form.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-detailstable',
  templateUrl: './detailstable.component.html',
  styleUrls: ['./detailstable.component.css']
})
export class DetailstableComponent implements OnInit {

// openDialog() {
// throw new Error('Method not implemented.');
// }
  
  displayedColumns: string[] = ['id','Name', 'address','city','state','postalCode','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(
    public dialog: MatDialog, private api: ApiService ){}

  ngOnInit(): void {
    this.getAllDetails();
  }

  getAllDetails(){
    this.api.getDetails()
    .subscribe({
      next:(res :any)=>{
        this.dataSource = new MatTableDataSource(res);
        console.log("Data aaayo",res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{
        console.log("Data not coming");
      }

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editDetails(row: any){
    this.dialog.open(EntryFormComponent,{
      width: "50%",
      data: row,
     })
  }

  deleteDetails(id: number){
    this.api.deleteDetails(id)
    .subscribe({
      next:(res)=>{
        this.getAllDetails();
        alert("Details Deleted succesfully");
      },
      error:()=>{
        alert("Error deleting details")
      }

    })
  }

}
