import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ApplyTeachModel } from '../../models/ApplyTeachModel';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class NewTutorService {
  id:string;
  baseUrl = environment.baseUrl;

  headers1= new HttpHeaders({
  //  'Content-Type':  'application/json',
    'Authorization': "Bearer "+localStorage.getItem('lsaToken_access')});

  constructor(
    private http:HttpClient
  ) {this.id = localStorage.getItem('lsaUserId');}


  storeTutorApplication(aaa:Object ){
    return this.http.post(this.baseUrl+'jobs/'+this.id+'/apply', aaa, {headers: this.headers1});
  }

  showTutorApplication(){
    return this.http.get(this.baseUrl+'/applyteach/'+this.id, {headers: this.headers1})
  }

  updateTutorApplication(bbb:Object){
    return this.http.post(this.baseUrl+'applyteach/'+this.id, bbb, {headers: this.headers1})
  }

}