import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-user-welcome',
  templateUrl: './new-user-welcome.component.html',
  styleUrls: ['./new-user-welcome.component.css']
})
export class NewUserWelcomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  highCourse = true;
  uniCourse = false;
  showHighCourse() {
    this.highCourse = true;
    this.uniCourse = false;
  }
  showUniCourse() {
    this.uniCourse = true;
    this.highCourse = false;
  }
}
