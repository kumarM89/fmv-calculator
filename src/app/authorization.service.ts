import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserInfo } from './user-info';

@Injectable()
export class AuthorizationService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  public firstLoad = new BehaviorSubject<boolean>(true);
  public jsonDataSource = new BehaviorSubject<string>("");
  public activityDataSource = new BehaviorSubject<any[]>([]);
  public segmentDataSource = new BehaviorSubject<any[]>([]);
  public specialtyDataSource = new BehaviorSubject<any[]>([]);
  public statureDataSource = new BehaviorSubject<any[]>([]);
  public travelDistanceDataSource = new BehaviorSubject<any[]>([]);

  public kolAssessmentVal = new BehaviorSubject<number>(0);
  public kolAssessmentSpecialtyVal = new BehaviorSubject<any>({});
  public selectedCountry = new BehaviorSubject<string>("");

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router) { }

  login(user: UserInfo){
    if (user.userName != '' && user.password != '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  updateData(country: string, data: string, activityDataSource: any[], segmentDataSource: any[], specialtyDataSource: any[], statureDataSource: any[], travelDistanceDataSource: any[]) {
    this.selectedCountry.next(country);

    this.jsonDataSource.next(data);
    this.activityDataSource.next(activityDataSource);
    this.segmentDataSource.next(segmentDataSource);
    this.specialtyDataSource.next(specialtyDataSource);
    this.statureDataSource.next(statureDataSource);
    this.travelDistanceDataSource.next(travelDistanceDataSource);
  }

  updateKOL(kolValue: number, kolSpecialtyVal: any) {
    this.kolAssessmentVal.next(kolValue);
    this.kolAssessmentSpecialtyVal.next(kolSpecialtyVal);
  }

}
