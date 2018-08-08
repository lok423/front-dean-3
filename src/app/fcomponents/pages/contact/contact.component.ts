import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/servercalls/general.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  feedback_message:string;
  successMessage:string;
  loginForm={
    name:'',
    email:'',
    phone:'',
    tutor_name:'',
    message:'',
  };

  constructor(
    private contactUsService:GeneralService,
    
  ) { }

  ngOnInit() {
  }
  onSubmit({valid}:{valid:boolean}) {
    console.log(valid);
    if(!valid){
      console.log('no');
      this.feedback_message = 'Please fill all inputs.'
    }
    else{
      
      console.log('yes');
      this.feedback_message = '';
      console.log(this.loginForm)
      this.contactUsService.storeContact(this.loginForm).subscribe(
        (loginForm)=>{
          console.log('made it');
          console.log(loginForm);
          this.successMessage ='Thank you for contacting us, we aim to get back to you in 24 hours.';
          
        },
        (error)=>{
          console.log('Noooooo');
          console.log(error)
          this.feedback_message = 'Sorry, but something has gone wrong.'
        }
      );


    }
  }

}