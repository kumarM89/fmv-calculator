import { Observable } from 'rxjs/Observable';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  isFirstLoad$: Observable<boolean>;

  constructor(private dialog: MatDialog, private authService: AuthorizationService) {
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.authService.firstLoad.getValue()) {
        this.openDialog();
        this.authService.firstLoad.next(false);
      }
    });
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
