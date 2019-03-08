import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { RecordService } from '../record.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  data: any;
  countries: any;
  baseCurrency: string;
  baseRate: number;
  ratePerHourCap: number;
  sessionCap: number;
  selectedCountry: any;
  records: any;

  constructor(private fb: FormBuilder, private countryData: AuthorizationService, private recordService: RecordService) {
    this.countryData.jsonDataSource.asObservable().subscribe(message => this.data = message);
  }

  ngOnInit() {
    this.form = this.fb.group({
      country: ['', Validators.required],
      baseCurrency: ['', Validators.required],
      baseRate: ['', Validators.required],
      ratePerHourCap: ['', Validators.required],
      sessionCap: ['', Validators.required]
    });
    if (this.data != null) {
      this.populateFormControls();
    }
    this.getRecords();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  populateFormControls() {
    this.countries = this.data.map(item => item.country);
  }

  updateVals() {
    const filteredData = this.data.filter(item => item.country === this.selectedCountry)[0].data;
    this.baseCurrency = filteredData.baseCurrency;
    this.baseRate = filteredData.baseRate;
    this.ratePerHourCap = filteredData.ratePerHourCap;
    this.sessionCap = filteredData.sessionCap;
  }

  addRecord(entityName) {
    if (this.form.valid) {
      this.recordService.addRecord(entityName, this.form.value);
    }
    this.formSubmitAttempt = true;
  }

  getRecords() {
    this.recordService.getRecords().subscribe(res => {
      this.records = res;
    });
  }

  deleteRecord(id) {
    this.recordService.deleteRecord(id).subscribe(res => {
      console.log('Deleted');
    });
  }
}
