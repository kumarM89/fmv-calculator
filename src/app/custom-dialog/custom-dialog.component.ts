import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements OnInit {

  description:string;
  header:string;
  openSelf:boolean;
  constructor(private dialogRef: MatDialogRef<CustomDialogComponent>, @Inject(MAT_DIALOG_DATA) data, private dialogNew: MatDialog) {
    this.header = data.header;
    this.description = data.content;
    this.openSelf = data.openSelf;
  }

  ngOnInit() {
  }

  acknowledge() {
    if(this.openSelf) {
      this.dialogRef.close();
      this.dialogNew.open(CustomDialogComponent, {
        autoFocus: true,
        width: '600px',
        height: '200px',
        disableClose: true,
        data: {
          header: 'Review Ground Rules',
          content: 'Please review the ground rules carefully before using the FMV calculator.',
          openSelf: false
        }
      });
    }
    else {
      this.dialogRef.close();
    }
  }
}
