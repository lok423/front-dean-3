import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NewUserComponent } from '../../fcomponents/basic/newuser/newuser.component';
import { LoginComponent } from '../../fcomponents/basic/login/login.component';
import { AuthService } from '../../services/security/auth.service';
import { Router } from '@angular/router';

import { CommonSupportService } from '../../services/support/common-support.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  rolePosition: number;
  loggedInUserName: string;
  dialogRef: MatDialogRef<NewUserComponent, LoginComponent>;
  scroll: any;
  loggedIn = <boolean>false;
  navStatus = false;
  screenStatus = false;
  collapseStatus = false;
  counter = 0;

  constructor(
    public dialog: MatDialog,
    private authService:AuthService,
    private router: Router,
    private elem: ElementRef,

    private commonSupport: CommonSupportService
  ) { }

  ngOnInit() {
    if (this.authService.getAuth()) {
      this.loggedIn = true
      this.loggedInUserName = localStorage.getItem('lsaUserName')
      this.rolePosition = this.authService.getUserRole()
    } else {
      this.loggedIn = false
    }

    $(window).resize(() => {
      var w=window,
      e=document.documentElement,
      g=document.getElementsByTagName('body')[0],
      x=w.innerWidth||e.clientWidth||g.clientWidth;
      if (x < 768) {
        this.screenStatus = true;
        this.collapseStatus = false;
      } else if (x === 768) {
        this.screenStatus = false;
        this.collapseStatus = true;
      } else {
        this.screenStatus = false;
        this.collapseStatus = true;
      }
    });

    $(window).scroll(() => {
      if ($(window).scrollTop() >= 60) { this.navStatus = true; }
      else { this.navStatus = false; }
    });
  }


  collapseContent(){
    if (this.counter < 1) {
      $(window).resize();
      this.counter += 1;
    }
    return this.collapseStatus;
  }

  newUser(){
    if(this.loggedIn){
      console.log('s')
      this.router.navigate(['/app/apply/teach']);
    }
    else{
      let dialogRef = this.dialog.open(NewUserComponent,
        {panelClass: 'dialog1'});
    }
  }

  loginUser($event) {
    let dialogRef = this.dialog.open(LoginComponent,
      { panelClass: 'dialog1' });
  }

  onLogoutClick() {
    this.authService.loggingOut();
  }

}
