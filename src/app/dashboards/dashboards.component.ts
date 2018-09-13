import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {
  options: Object;
  constructor() {
    this.options = {
      title : { text : 'Physicians by Country' },
      chart: {
        type: 'column'
      },
      xAxis: {
        categories: ['2014', '2015', '2016', '2017', '2018']
      },
      credits: {
        enabled: false
      },
      series: [{
          name: 'USA',
          data: [33, 45, 41, 28, 57]
      }, {
        name: 'India',
        data: [66, 23, 54, 43, 55]
      }, {
        name: 'Germany',
        data: [46, 21, 54, 42, 45]
      }]
    };
  }

  ngOnInit() {
  }

}
