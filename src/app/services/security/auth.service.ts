import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class AuthService {
  xtExpire: string;
  a = new Date();
  currentTime = this.a.getTime();
  abc:number;
  baseUrl = environment.baseUrl;


  constructor(
    private http:HttpClient,
    private router:Router,
  ) { }

    register(regiUser):Promise<any> {
      return this.http.post(this.baseUrl+'/register', regiUser).toPromise().then(
        (data)=>{this.setTokens(data)},
      );
    }

    login(loginUser){
      return  new Promise((resolve, reject) => {
        this.http.post(this.baseUrl+'/login', loginUser).toPromise().then(
          (userData)=>{resolve(userData), this.setTokens(userData)},
          (err) => reject(err));
      });
    }

    forgotPassword(ea){
      console.log(ea)
      return this.http.post(this.baseUrl+'/password/email', ea)
    }

    setTokens(user){
      this.xtExpire =  String(this.currentTime + 43200000)

      localStorage.setItem('lsaToken_access', user.dataCon.xT.access_token);
      localStorage.setItem('lsaToken_expires', this.xtExpire);
      localStorage.setItem('lsaUserId', user.dataCon.xUi);
      localStorage.setItem('lsaUserName', user.dataCon.userBasic.first_name);
      localStorage.setItem('lsaWho', user.dataCon.xUr);

      sessionStorage.setItem('lsaUserskeys', JSON.stringify(user.dataCon.userBasic));
      sessionStorage.setItem('lsaUsersInfo', JSON.stringify(user.dataCon.userSecondary));

      if(user.dataCon.xUr==1){

      }
      if(user.dataCon.xUr==2){
        sessionStorage.setItem('lsaSpApplicantInfo', JSON.stringify(user.dataCon.applyInfo));

      }
      if(user.dataCon.xUr==3){
        sessionStorage.setItem('lsaSpTutorInfo', JSON.stringify(user.dataCon.tutorInfo));     
        sessionStorage.setItem('lsaSpTutorProfile', JSON.stringify(user.dataCon.tutorProfile));        
      }
    }

    getAuth(){
      let token = localStorage.getItem('lsaToken_access')
      if(token){
        var eT = Number(localStorage.getItem('lsaToken_expires'))
        console.log('now:'+this.currentTime)
        console.log('exp:'+eT)
       if(eT > this.currentTime){
         return true
       }
       else{
        return false
       }
      }
      else{
        return false
      }
    }

    getUserRole(){
      let role = localStorage.getItem('lsaWho');
      if(role == '3'){
        return 3
      }
      else if(role == '2'){
        return 2
      }else{
        return 1
      }
    }
    
    loggingOut(){
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['index']);
    }

}