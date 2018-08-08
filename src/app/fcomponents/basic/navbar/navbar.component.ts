import { Component, OnInit } from '@angular/core';
import { NewUserComponent } from '../newuser/newuser.component';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/security/auth.service';
import { CommonSupportService } from '../../../services/support/common-support.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  rolePosition: number;
  dialogRef: MatDialogRef<NewUserComponent, LoginComponent>;
  loggedIn=<boolean>false
  loggedInUserName: string;
  screenStatus = false;
  collapseStatus = false;
  counter = 0;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    private authService:AuthService,
    private commonSupport: CommonSupportService
  ) { }

  ngOnInit() {
    this.rolePosition = this.authService.getUserRole()

    if(this.authService.getAuth()){
      this.loggedIn = true;
      this.loggedInUserName = localStorage.getItem('lsaUserName');
    }
    else {
      this.loggedIn = false
    };

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
  }

  collapseContent(){
    if (this.counter < 1) {
      $(window).resize();
      this.counter += 1;
    }
    return this.collapseStatus;
  }

  newUser($event){
    let dialogRef = this.dialog.open(NewUserComponent,
      {panelClass: 'dialog1'});
  }

  loginUser($event){
    let dialogRef = this.dialog.open(LoginComponent,
      {panelClass: 'dialog1'});
  }

  onLogoutClick(){
    this.authService.loggingOut();
  }


}
