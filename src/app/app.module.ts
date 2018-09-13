import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule, MatToolbarModule, MatDividerModule, MatRadioModule, MatDialogModule, MatSelectModule, MatSidenavModule, MatIconModule, MatExpansionModule, MatListModule, MatSlideToggleModule, MatTableModule, MatGridListModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'angular2-highcharts';
import { FileUploadModule } from "ng2-file-upload";
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';
import { XlsxFileUploadComponent } from './xlsx-file-upload/xlsx-file-upload.component';
import { GroundRulesComponent } from './ground-rules/ground-rules.component';
import { LoginComponent } from './login/login.component';
import { AuthorizationService } from './authorization.service';
import { AuthorizationGuard } from './authorization.guard';
import { RecordService } from './record.service';
import { InputFormComponent } from './input-form/input-form.component';
import { KolAssessmentComponent } from './kol-assessment/kol-assessment.component';
import { DashboardsComponent } from './dashboards/dashboards.component';

declare var require: any;
const myRoots: Routes = [{
  path: '', component: HomeComponent, canActivate: [AuthorizationGuard]
}, {
  path: 'calculator', component: CalculatorComponent
}, {
  path: 'groundRules', component: GroundRulesComponent
}, {
  path: 'login', component: LoginComponent
}, {
  path: 'input', component: InputFormComponent
}, {
  path: 'assessment', component: KolAssessmentComponent
}, {
  path: 'dashboard', component: DashboardsComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalculatorComponent,
    CustomDialogComponent,
    XlsxFileUploadComponent,
    GroundRulesComponent,
    LoginComponent,
    InputFormComponent,
    KolAssessmentComponent,
    DashboardsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule, JsonpModule, HttpClientModule,
    MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule, MatToolbarModule, MatAutocompleteModule, MatSlideToggleModule, MatGridListModule,
    MatDividerModule, MatDialogModule, MatSelectModule, MatSidenavModule, MatIconModule, MatExpansionModule, MatRadioModule, MatListModule, MatTableModule,
    FormsModule, ReactiveFormsModule, FileUploadModule, ChartModule.forRoot(require('highcharts')),
    RouterModule.forRoot(myRoots)
  ],
  providers: [AuthorizationGuard, AuthorizationService, RecordService],
  bootstrap: [AppComponent],
  entryComponents: [CustomDialogComponent]
})
export class AppModule { }
