import { Observable } from 'rxjs/Observable';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    setTimeout(() => {this.openDialog()});
  }

  openDialog() {
    this.dialog.open(CustomDialogComponent, {
      autoFocus: true,
      width: '600px',
      height: '200px',
      disableClose: true,
      data: {
        header: 'Disclaimer',
        content: 'This FMV calculator is for demo use only.',
        openSelf: true
      }
    });
  }

}
