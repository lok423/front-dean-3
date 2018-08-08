import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';

@Injectable()
export class AccessTutorGuard implements CanActivate {

  constructor(
    private auth: AuthService, 
    private router: Router,
    
  ) {}

  canActivate(): boolean{
    if(this.auth.getUserRole()== 3){
        return true;
    } else {
      this.router.navigate(['/app/dashboard/home']);
        return false;
    }
}
}
