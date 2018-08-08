import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../../../fcomponents/basic/login/login.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Injectable()
export class RestrictGuard implements CanActivate {
  dialogRef: MatDialogRef<LoginComponent>;
  
  constructor(
    private auth: AuthService, 
    private router: Router,
    private dialog: MatDialog,
    
  ) {}
  
  canActivate(): boolean{
        if(!this.auth.getAuth()){
          let dialogRef = this.dialog.open(LoginComponent, {
            width: '700px',
          });
            return false;
        } else {
            return true;
        }
  }
}