import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  id:string;
  baseUrl = environment.baseUrl;
  
  headers1= new HttpHeaders({
  //  'Content-Type':  'application/json',
  'Authorization': "Bearer "+localStorage.getItem('lsaToken_access')});
    
  constructor(
    private http:HttpClient
  ) {this.id = localStorage.getItem('lsaUserId');}

  // Pass only the stripeToken 

  storePaymentInfo(aaa:Object ){
    return this.http.post(this.baseUrl+'users/'+this.id+'/payment', aaa, {headers: this.headers1});
  }

  updatePaymentInfo(aaa:Object){
    return this.http.put(this.baseUrl+'userspayment/'+this.id, aaa, {headers: this.headers1});
  }

  deletePaymentInfo(){
    return this.http.delete(this.baseUrl+'userspayment/'+this.id, {headers: this.headers1});
  }
}
