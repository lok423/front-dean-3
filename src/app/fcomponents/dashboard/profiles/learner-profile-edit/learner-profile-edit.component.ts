import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LearnerService } from '../../../../services/servercalls/learner.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import * as $ from 'jquery';

@Component({
  selector: 'app-learner-profile-edit',
  templateUrl: './learner-profile-edit.component.html',
  styleUrls: ['./learner-profile-edit.component.css']
})

export class LearnerProfileEditComponent implements OnInit {
  learnersForm: FormGroup;
  submitted = false;
  currentlearner: any;
  errorMessage: string;
  formData = new FormData();
  minDOB = new Date(1929, 0, 1);
  maxDOB = new Date(2020, 0, 1);
  learnersData: any;
  learnerInfo: any;
  curriculum_list: string[] = ['(NCEA) National Certificates of Educational', '(CIE) Cambridge', '(IB) International Baccalaureate'];
  subject_list: string[] = ['Math', 'Physics', 'Chemistry', 'Biology', 'Science', 'Geography', 'Social Studies', 'Information System', 'Accounting', 'Economics', 'Finance', 'English', 'Maori', 'French', 'German', 'Spanish', 'Chinese', 'Japanese'];
  temp_ist = ['(NCEA) National Certificates of Educational', '(CIE) Cambridge', '(IB) International Baccalaureate'];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private learnerService: LearnerService,
    private elem: ElementRef
  ) {
    this.getLearnerInfo();
    this.formData = new FormData();
  }

  ngOnInit() {
    this.createForm();
  }

  // Get Learner Information from Database
  getLearnerInfo() {
    this.learnerService.showLearnerProfile().subscribe(
      (res) => {
        this.learnerInfo = Object.assign(res['dataCon'].learnerProfile),
        this.setFormValuesTo(this.learnerInfo);
      },
      (err) => {this.errorMessage = "Sorry, we can't get to your information at this time.";}
    );
  }

  // Initialise Reactive Form
  createForm() {
    this.learnersForm = this.fb.group({
      learner_name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      learner_DOB: ['', [Validators.required, this.dateRange]],
      subject: ['', Validators.required],
      curriculum: ['', Validators.required],
      aspiration: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[a-zA-Z 0-9]*$')]],
      sp_need: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[a-zA-Z 0-9]*$')]],
    });
  }

  // Date validition method
  dateRange(AC: FormControl) {
    if (AC.value) {
      let year = parseInt(moment(AC.value.toString()).format());
      if (year < 1930) {return {mindob: {}};}
      if (year > 2019) {return {maxdob: {}};}
      return null;
    }
  }

  // Set returned data values into form
  setFormValuesTo(userInfoData) {
    this.learnersForm.controls['learner_name'].setValue(userInfoData.learner_name);
    this.learnersForm.controls['learner_DOB'].setValue(userInfoData.learner_DOB);
    this.learnersForm.controls['subject'].setValue(userInfoData.subject);
    this.learnersForm.controls['curriculum'].setValue(userInfoData.curriculum);
    this.learnersForm.controls['aspiration'].setValue(userInfoData.aspiration);
    this.learnersForm.controls['sp_need'].setValue(userInfoData.sp_need);
  }

  // Submit form
  onSubmit() {
    let transfer_DOB = moment(this.learnersForm.value.learner_DOB).format().substr(0, 10);
    this.learnersForm.controls['learner_DOB'].setValue(transfer_DOB);
    this.learnersData = this.learnersForm.value;
    this.postLearnerInfo(this.learnersData);
    this.submitted = true;
  }

  // Pass updated values to backend API
  postLearnerInfo(dataToUpdate) {
    this.learnerService.updateLearnerProfile(dataToUpdate).subscribe(
      (res) => console.log(res),
      (err) => console.warn(err)
    );
  }


}
