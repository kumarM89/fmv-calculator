import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ground-rules',
  templateUrl: './ground-rules.component.html',
  styleUrls: ['./ground-rules.component.css']
})
export class GroundRulesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activatedRoute);
  }

}
