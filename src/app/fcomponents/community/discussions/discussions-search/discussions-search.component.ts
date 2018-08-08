import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/security/auth.service';

@Component({
  selector: 'app-discussions-search',
  templateUrl: './discussions-search.component.html',
  styleUrls: ['./discussions-search.component.css']
})
export class DiscussionsSearchComponent implements OnInit {
  user=false;
  // discussions:any;
  // errorMessage:string;

  constructor(
    private auth: AuthService, 
  ) {
    if(this.auth.getUserRole()){
      this.user=true;}
   }

  ngOnInit() {
  }

}