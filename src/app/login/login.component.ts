import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorizationService } from '../authorization.service';
import { map } from 'rxjs/operators/map';
import { Http, Response } from '@angular/http';
import { forkJoin } from "rxjs/observable/forkJoin";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  navItems: any;
  activities: any;
  statures: any;
  segments: any;
  specialties: any;
  travelDistances: any;
  countries: any;
  selectedCountry: any;

  constructor(private fb: FormBuilder, private authService: AuthorizationService, private http: Http) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      country: ['', Validators.required]
    });
    this.loadNavItems();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value);
      this.authService.updateData(this.selectedCountry, this.navItems, this.activities, this.segments, this.specialties, this.statures, this.travelDistances);
    }
    this.formSubmitAttempt = true;
  }

  loadNavItems() {
    let countryQuery = this.http.get('/assets/countryData.json');
    let activityQuery = this.http.get('/assets/activityData.json');
    let segmentsQuery = this.http.get('/assets/segmentsData.json');
    let specialtyQuery = this.http.get('/assets/specialtyData.json');
    let statureQuery = this.http.get('/assets/statureData.json');
    let travelDistanceQuery = this.http.get('/assets/travelDistanceData.json');

    forkJoin([countryQuery, activityQuery, segmentsQuery, specialtyQuery, statureQuery, travelDistanceQuery]).subscribe(results => {
      this.navItems = results[0].json();
      this.countries = this.navItems.map(item => item.country);

      this.activities = results[1].json() as Array<any>;
      this.segments = results[2].json() as Array<any>;
      this.specialties = results[3].json() as Array<any>;
      this.statures = results[4].json() as Array<any>;
      this.travelDistances = results[5].json() as Array<any>;
    });
  }
}
