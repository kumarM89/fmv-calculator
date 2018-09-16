import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDividerModule, MatSelectModule, MatDialog, MatTableModule } from "@angular/material";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AuthorizationService } from '../authorization.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  CompletedBY: string;
  data: any;
  selectedCountry: string;
  filteredData: any;
  isRoundTrip: boolean = false;
  baseCurrency: string;
  baseRate: number;
  ratePerHourCap: number;
  sessionCap: number;
  totalTime: number = 0.0;
  serviceTimeCalc: number = 0.0;
  prepTimeCalc: number = 0.0;
  travelDistanceCalc: number = 0.0;
  specialtyMultiplier: number = 0.0;
  selectedStature: number = 0.0;
  selectedActivity = { serviceTime: 0.0, prepTime: 0.0 };
  selectedTravelDistance: number = 0.0;
  hourlyCap: number = 100.0;
  minRange: number = 20.0;
  maxRange: number = 20.0;
  overriddenServiceTime: number;
  overriddenPrepTime: number;
  overriddenTravelTime: number;
  specialtyCtrl: FormControl = new FormControl();
  filteredSpecialties: Observable<any[]>;
  specialties: any[];
  segments: any[];
  statures: any[];
  activities: any[];
  distanceOptions: any[];
  kolAssessmentValue: number;
  formSubmitted: boolean = false;

  constructor(private countryData: AuthorizationService, private dialog: MatDialog, private router: Router) {
    this.countryData.jsonDataSource.asObservable().subscribe(message => this.data = message);
    this.countryData.activityDataSource.asObservable().subscribe(message => this.activities = message);
    this.countryData.segmentDataSource.asObservable().subscribe(message => this.segments = message);
    this.countryData.specialtyDataSource.asObservable().subscribe(message => this.specialties = message);
    this.countryData.statureDataSource.asObservable().subscribe(message => this.statures = message);
    this.countryData.travelDistanceDataSource.asObservable().subscribe(message => this.distanceOptions = message);

    this.countryData.selectedCountry.asObservable().subscribe(message => this.selectedCountry = message);
    this.countryData.kolAssessmentVal.asObservable().subscribe(message => this.selectedStature = message);

    if (this.data != null) {
      this.initializeCalculator();
    }
  }

  filterSpecialties(name: string): any[] {
    return this.specialties.filter(specialty =>
      specialty.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(specialty?: any): string | undefined {
    return specialty ? specialty.name : undefined;
  }

  itemSelected(evt: any) {
    var specialtyMultiplier = this.segments.filter(segment =>
      segment.id == evt.option.value.segmentID);
    this.specialtyMultiplier = specialtyMultiplier[0].consensus;
  }

  ngOnInit() {
    this.filteredSpecialties = this.specialtyCtrl.valueChanges
      .pipe(
        startWith<any>(''),
        map(specialty => typeof specialty === 'string' ? specialty : specialty.name),
        map(name => name ? this.filterSpecialties(name) : this.specialties.slice())
      );
    this.countryData.kolAssessmentSpecialtyVal.asObservable().subscribe(message => {
      this.specialtyCtrl.setValue(message);
      var specialtyMultiplier = this.segments.filter(segment =>
        segment.id == message.segmentID);
      this.specialtyMultiplier = specialtyMultiplier[0].consensus;
    });
  }

  clearSelection() {
    this.specialtyCtrl.reset('');
    this.specialtyMultiplier = 0;
  }

  calculate() {
      this.formSubmitted = true;
  }

  initializeCalculator() {
    this.filteredData = this.data.filter(current => current.country == this.selectedCountry)[0].data;
    this.baseCurrency = this.filteredData.baseCurrency;
    this.baseRate = this.filteredData.baseRate;
    this.ratePerHourCap = this.filteredData.ratePerHourCap;
    this.sessionCap = this.filteredData.sessionCap;
  }

  getTotalTime() {
    this.totalTime = (this.overriddenServiceTime ? this.overriddenServiceTime : this.selectedActivity.serviceTime)
      + (this.overriddenPrepTime ? this.overriddenPrepTime : this.selectedActivity.prepTime)
      + (this.isRoundTrip ? this.selectedTravelDistance * 2 : this.selectedTravelDistance);
    return this.totalTime;
  }

  getServiceHours() {
    var serviceTime = (this.overriddenServiceTime ? this.overriddenServiceTime : this.selectedActivity.serviceTime);
    this.serviceTimeCalc = (serviceTime >= this.hourlyCap ? this.hourlyCap : serviceTime);
    return this.serviceTimeCalc;
  }

  getPrepHpours() {
    var prepTime = (this.overriddenPrepTime ? this.overriddenPrepTime : this.selectedActivity.prepTime);
    this.prepTimeCalc = (prepTime <= (this.hourlyCap - this.serviceTimeCalc) ? prepTime : (this.hourlyCap - this.serviceTimeCalc));
    return this.prepTimeCalc;
  }

  getTravelDistanceHours() {
    var travelTime = this.isRoundTrip ? this.selectedTravelDistance * 2 : this.selectedTravelDistance;
    this.travelDistanceCalc = (travelTime <= (this.hourlyCap - this.serviceTimeCalc - this.prepTimeCalc) ? travelTime : (this.hourlyCap - this.serviceTimeCalc - this.prepTimeCalc));
    return this.travelDistanceCalc;
  }

  getMinVal() {
    return this.baseRate * this.specialtyMultiplier * this.selectedStature * ((100 - this.minRange) / 100);
  }

  getMaxVal() {
    return this.baseRate * this.specialtyMultiplier * this.selectedStature * ((100 + this.maxRange) / 100);
  }
}
