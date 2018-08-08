import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../../services/servercalls/general.service';
import { AuthService } from '../../../../services/security/auth.service';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-posts-search',
  templateUrl: './posts-search.component.html',
  styleUrls: ['./posts-search.component.css']
})
export class PostsSearchComponent implements OnInit {
  errorMessage: string;
  articles:any;
  user:number;
  authorPic:string
  postPic:string
  baseImgUrl = environment.baseImgUrl;

  constructor(
    public communitySearchService: GeneralService,
    private auth: AuthService, 
  ) {
    if(this.auth.getUserRole()==3){
      this.user = 3;}
   }

  ngOnInit() {
    
    this.communitySearchService.indexAllPosts().subscribe(
      (data)=>{
        console.log(data)
        this.articles = data['data']
      },
      (error)=>{
        this.errorMessage="Something went horribly wrong."
        console.log(error)
      }
    )
  }

}
