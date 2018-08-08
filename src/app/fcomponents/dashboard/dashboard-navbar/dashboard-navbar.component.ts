import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/security/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.css']
})
export class DashboardNavbarComponent implements OnInit, AfterViewChecked  {
  rolePosition: number;
  // status=true;
  show = false;
  Dashboard:string;
  screenStatus = false;
  collapseStatus = false;
  counter = 0;
  
  constructor(
    private authService:AuthService,
    private route: ActivatedRoute,
    private cdRef : ChangeDetectorRef,
  ) { }
  
  // onClick1(){
  //   this.status=!this.status;
  // }
  onClick2(x){
    this.Dashboard=x.name;
  }
  ngOnInit() {
    this.rolePosition = this.authService.getUserRole()
    this.Dashboard=this.route.snapshot.routeConfig.path;

    $(window).resize(() => {
      var w=window,
      e=document.documentElement,
      g=document.getElementsByTagName('body')[0],
      x=w.innerWidth||e.clientWidth||g.clientWidth;
      if (x < 768) { 
        this.screenStatus = true; 
        this.collapseStatus = false; 
      } else if (x >= 768 && x < 992) {
        this.screenStatus = false; 
        this.collapseStatus = true; 
      // when user is Applicant, make navbar content in the vertical middle of dashboard navbar
      
        // if (this.rolePosition === 2) {
        //   $('#container').css({'height': '48px'});
        //   $('#navContent').css({'height': '48px'});
        //   $('#dashboardHome').css({'height': '48px', 'margin-top': '0.2rem'});
        //   $('#tutorApplication').css({'height': '48px', 'margin-top': '-0.5rem'});
        //   $('#myLessons').css({'height': '48px', 'margin-top': '-0.5rem'});
        //   $('#myHomework').css({'height': '48px', 'margin-top': '-0.5rem'});
        //   $('.learnerProfile').css({'height': '48px', 'margin-top': '-0.5rem'});
        // }
      } else if (x >= 992) { 
        this.screenStatus = false; 
        this.collapseStatus = true; 
        // if (this.rolePosition === 2) {
        //   $('#dashboardHome').css({'margin-top': '0'});
        //   $('#tutorApplication').css({'margin-top': '0'});
        //   $('#myLessons').css({'margin-top': '0'});
        //   $('#myHomework').css({'margin-top': '0'});
        //   $('.learnerProfile').css({'margin-top': '0'});
        // } 
      }
    });
  }

  // collapseStatus boolean value is false before and true afterwards
  ngAfterViewChecked() {
    let show = this.collapseContent();
    if (show != this.show) { // check if it change, tell CD update view
      this.show = show;
      this.cdRef.detectChanges();
    }
  }

  collapseContent(){
    if (this.counter < 1) {
      $(window).resize();
      this.counter += 1;
    }
    return this.collapseStatus;
  }
}
