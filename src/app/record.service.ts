import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Injectable()
export class RecordService {

  constructor(private http: HttpClient) { }

  addRecord(entityName, values) {
    const uri = 'http://localhost:4000/records/add/' + entityName;
    debugger;
    // const obj = {
    //   name: name,
    //   price: price
    // };
    this.http.post(uri, values)
      .subscribe(res => {
        console.log('Done')
      });
  }

  getRecords() {
    const uri = 'http://localhost:4000/records';
    return this.http.get(uri)
            .map(res => {
              return res;
            });
  }

  editRecord(id) {
    const uri = 'http://localhost:4000/records/edit/' + id;
    return this.http.get(uri)
            .map(res => {
              return res;
            });
  }

  deleteRecord(id) {
    const uri = 'http://localhost:4000/records/delete/' + id;
    return this.http.get(uri)
        .map(res => {
          return res;
        });
  }
}
