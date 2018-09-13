import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import { AuthorizationService } from '../authorization.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-kol-assessment',
  templateUrl: './kol-assessment.component.html',
  styleUrls: ['./kol-assessment.component.css']
})
export class KolAssessmentComponent implements OnInit {
  CompletedBY: string;
  WWID: string;
  PhysicianName: string;
  HCPName: string;
  HCPIdentifier: number;
  specialtyCtrl: FormControl = new FormControl();
  filteredSpecialties: Observable<any[]>;
  specialties: any[];
  moreThanOneAssociation: boolean = false;;
  regularParticipation: boolean = false;
  currentAffiliation: boolean = false;
  leaderOfARecogSociety: boolean = false;
  memberOfAnExecutiveBoard: boolean = false;
  presentations: any = [ {
    id: 1, title: 'Between 1 to 5 domestic and/or international speaking engagements', value: 1
  }, {
    id: 2, title: 'Between 5 to 10 domestic and/or international speaking engagements', value: 2
  }, {
    id: 3, title: 'More than 10 international speaking engagements', value: 3
  }, {
    id: 4, title: 'No domestic or international speaking engagements', value: 0
  }];
  selectedPresentationVal: number = 1;

  publications: any = [ {
    id: 1, title: 'Published 1-5 peer reviewed articles', value: 1
  }, {
    id: 2, title: 'Published 5-10 peer reviewed articles or participated on 1 journal editorial board or performed systematic reviews', value: 2
  }, {
    id: 3, title: '(1) Contributed to a textbook (editor or author) AND (2) 10 plus articles for scientific publications in international peer reviewed journals', value: 3
  }, {
    id: 4, title: 'No published articles', value: 0
  }];
  selectedPublicationVal: number = 1;

  expertise: any = [{
    id: 1,
    title: 'Years of relevant post graduate/residency experience (clinical, industry, other)',
    hasSubMenu: true
  }, {
    title: 'A) Less than 5 years',
    value: 1,
    isSubItem: true,
    group: 'yearsOfExp'
  }, {
    title: 'B) Minimum of 5-7 years',
    value: 2,
    isSubItem: true,
    group: 'yearsOfExp'
  }, {
    title: 'C) Minimum of 8-10 years',
    value: 3,
    isSubItem: true,
    group: 'yearsOfExp'
  }, {
    id: 2,
    title: 'Recommended or endorsed by someone considered to be a credible, or well-known thought leader',
    expertiseVal: false,
    hasSubMenu: false
  }, {
    id: 3,
    title: 'Product, treatment or research and development or other relevant experience (please select one option and briefly describe experience below)',
    hasSubMenu: true
  }, {
    title: 'A) Experienced',
    value: 1,
    isSubItem: true,
    group: 'experience'
  }, {
    title: 'B) Highly Experienced',
    value: 2,
    isSubItem: true,
    group: 'experience'
  }, {
    title: 'C) Advanced',
    value: 3,
    isSubItem: true,
    group: 'experience'
  }, {
    title: 'D) No relevant experience',
    value: 0,
    isSubItem: true,
    group: 'experience'
  }, {
    id: 4,
    title: 'Global reputation/recognition amongst peers',
    expertiseVal: false,
    hasSubMenu: false
  }];
  selectedExpertise: any = {
    yearsOfExp: 0,
    experience: 0
  };
  statures: any = []

  constructor(private dataService: AuthorizationService) {
    this.dataService.specialtyDataSource.asObservable().subscribe(message => this.specialties = message);
    this.dataService.statureDataSource.asObservable().subscribe(message => this.statures = message);
  }

  ngOnInit() {
    this.filteredSpecialties = this.specialtyCtrl.valueChanges
    .pipe(
      startWith<any>(''),
      map(specialty => typeof specialty === 'string' ? specialty : specialty.name),
      map(name => name ? this.filterSpecialties(name) : this.specialties.slice())
    );
  }

  filterSpecialties(name: string): any[] {
    return this.specialties.filter(specialty =>
      specialty.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(specialty?: any): string | undefined {
    return specialty ? specialty.name : undefined;
  }

  clearSelection() {
    this.specialtyCtrl.reset('');
  }

  onPresentationChange(selectedVal) {
    this.selectedPresentationVal = selectedVal.value;
  }

  onPublicationChange(selectedVal) {
    this.selectedPublicationVal = selectedVal.value;
  }

  onExpertiseSelectChange(item) {
    this.selectedExpertise[item.group] = item.value;
  }

  getKOLStature() {
    return this.statures.filter((val) => { return val.minVal <= this.getTotalScore() }).pop().name;
  }

  getTotalScore() {
    return (this.moreThanOneAssociation ? 1 : 0) + (this.regularParticipation ? 1 : 0) + (this.currentAffiliation ? 1 : 0) + (this.leaderOfARecogSociety ? 1 : 0) + (this.memberOfAnExecutiveBoard ? 1 : 0) + this.selectedPresentationVal + this.selectedPublicationVal + this.getExpertiseTotal()
  }

  getExpertiseTotal() {
    return this.expertise.map((val, key) => { return val.expertiseVal; })
      .filter((val) => { return val == true }).length + this.selectedExpertise.yearsOfExp + this.selectedExpertise.experience;
  }

  sendKOL() {
    this.dataService.updateKOL(this.statures.filter((val) => { return val.minVal <= this.getTotalScore() }).pop().consensus);
  }
}