import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommonSupportService {

  baseUserImgUrl = environment.baseUserImgUrl;
  userId: string;

  constructor() {
    this.userId = localStorage.getItem('lsaUserId');
  }

  // prepare image url with provided user id
  findUserImg(userId: any) {
    return this.baseUserImgUrl + userId + "-cp.jpeg";
  }

  // preapre image url with user id
  prepareUserImgUrl() {
    return this.baseUserImgUrl + this.userId + "-cp.jpeg";
  }

  //not using currently
  prepareUserImage(userImg) {
    return this.baseUserImgUrl + this.userId + "-cp.jpeg";
  }
}
