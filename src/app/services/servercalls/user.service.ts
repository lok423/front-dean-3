import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class UserService {
  id: string;
  userId: string;
  baseUrl = environment.baseUrl;

  headers1= new HttpHeaders({
    //  'Content-Type':  'application/json',
      'Authorization': "Bearer "+localStorage.getItem('lsaToken_access')});

  constructor(private http:HttpClient) {
    this.userId = localStorage.getItem('lsaUserId')
   }

  // User basic information
  showUserInfo(){
    return this.http.get(this.baseUrl+'/usersinfo/'+this.userId, {headers: this.headers1})
  }

  updateUserInfo(a){
    return this.http.put(this.baseUrl+'/usersinfo/'+this.userId, a, {headers: this.headers1} )
  }

  // User Edit Photos
  updateUserPhoto(aa){
    return this.http.post(this.baseUrl+'/users/'+this.userId+'/picture', aa, {headers:this.headers1})
  }

  // User Disucssions
  storeUserDiscussion(aa){
    return this.http.post(this.baseUrl+'/users/'+this.userId+'/discussions', aa,  {headers: this.headers1})
  }

  updateUserDiscussion(aa){
    return this.http.put(this.baseUrl+'/users/'+this.userId+'/discussions', aa,  {headers: this.headers1})
  }

  storeUserDiscussionComment([discussionId, aa]){
    return this.http.post(this.baseUrl+'/users/'+this.userId+'/discussions/'+discussionId+'/comment', aa,  {headers: this.headers1})
  }


}
