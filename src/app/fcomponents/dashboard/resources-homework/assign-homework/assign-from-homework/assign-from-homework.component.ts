import { Component, OnInit } from '@angular/core';
import { TutorService } from '../../../../../services/servercalls/tutor.service';
import * as moment from 'moment';
import { CommonSupportService } from '../../../../../services/support/common-support.service';


@Component({
  selector: 'app-assign-from-homework',
  templateUrl: './assign-from-homework.component.html',
  styleUrls: ['./assign-from-homework.component.css']
})
export class AssignFromHomeworkComponent implements OnInit {
  now: any;
  range = [];
  //allSessions=[];
  tutorStudentList=[];
  selectedStudent = null;
  selectedStudentSession = null;
  allStudentSessions=[];

  constructor(private tutorService: TutorService,
    private imageService: CommonSupportService
) { }

  ngOnInit() {
    this.range = this.getRange();

      console.log( 'I am a tutor.');
      // get sessions info
      this.getSessionInfo();

      // get schedules info, used for fullcalendar

  }

  getSessionInfo() {
    console.log(this.range);
    this.tutorService.indexTutorSessions(this.range).subscribe((res) => {
      // console.log(res['dataCon']);
      let allSessions = res['dataCon'];
      //this.allSessions= allSessions;
      this.getStudentList(allSessions);

    }, (error) => {
      console.log(error);
    });
    //console.log(this.allSessions);

  }

  getRange() {
    let range = [];
    this.now = moment();
    // two days before now, and five days after today
    let startDate = this.now.subtract(2, 'days').format().substr(0, 19);
    let endDate = this.now.add(7, 'days').format().substr(0, 19);
    range.push(startDate);
    range.push(endDate);
    // change now to original
    this.now.subtract(5, 'days');
    return range;
  }

  getStudentList(allSessions){
    console.log(allSessions);
    for(var i=0;i<allSessions.length;i++){
      let findSameStudent = this.tutorStudentList.map(function(e) { return e.learner_id; }).indexOf(allSessions[i].learner_id);
      if(findSameStudent===-1){
        let learner_img = this.imageService.findUserImg(allSessions[i].learner_id);
        this.tutorStudentList.push({learner_id:allSessions[i].learner_id,learner_name:allSessions[i].learner_name,learner_img:learner_img});
        this.allStudentSessions.push({
          learner_id:allSessions[i].learner_id,
          learner_img:learner_img,learner_name:allSessions[i].learner_name,
          sessions:
            /*
            {session_id:allSessions[i].session_id,
              session_date: allSessions[i].session_date,
              session_duration:allSessions[i].session_duration,
              session_location:allSessions[i].session_location,
              session_status: allSessions[i].session_status,
              session_subject:allSessions[i].session_subject,
              created_at: allSessions[i].created_at,
              tutor_id: allSessions[i].tutor_id,
              tutor_user_id: allSessions[i].tutor_user_id,
              updated_at: allSessions[i].updated_at
            }*/

            [this.changeFormat(allSessions[i])]

        });
      }else{
        this.allStudentSessions[this.allStudentSessions.length-1].sessions.push(
          this.changeFormat(allSessions[i])
/*
          {
          session_id:allSessions[i].session_id,
          session_date: allSessions[i].session_date,
          session_duration:allSessions[i].session_duration,
          session_location:allSessions[i].session_location,
          session_status: allSessions[i].session_status,
          session_subject:allSessions[i].session_subject,
          created_at: allSessions[i].created_at,
          tutor_id: allSessions[i].tutor_id,
          tutor_user_id: allSessions[i].tutor_user_id,
          updated_at: allSessions[i].updated_at
        }*/
      );

      }

    }
    console.log("student list: " ,this.tutorStudentList );
    console.log("student sessions: " ,this.allStudentSessions );

  }

  selectUser(student){
    this.selectedStudent = student;
    console.log("select student",student);
    this.getSelectedStudentSessions(student);
  }

  getSelectedStudentSessions(student){
    let learner_id = student.learner_id;
    for(var i=0; i<this.allStudentSessions.length;i++){
      if(learner_id===this.allStudentSessions[i].learner_id){
        this.selectedStudentSession = this.allStudentSessions[i];
      }
    }
    console.log("selectedStudentSession", this.selectedStudentSession.sessions);
  }

  changeFormat(session: any) {
    
      let newObj = {};
      // let sessionDate = e.session_date.slice(0, 10);
      // let sessionTime = e.session_date.slice(11);
      // let date = sessionDate + 'T' + sessionTime;
      let date = this.changeToMoment(session.session_date);
      let newDate = date.format('LL');
      let startTime = date.format('LT');
      let endTime = date.add(session.session_duration, 'hours').format('LT');
      let times = this.getTimes(session);
      let day = date.format('ddd');
      let tutorID = session.tutor_id.toString();
      let tutor_user_id = session.tutor_user_id.toString();
      //let learnerID = e.learner_id.toString();
      let update: number = session.last_update_party;
      //let tutor_img = this.imageService.findUserImg(tutor_user_id);
      //let learner_img = this.imageService.findUserImg(learnerID);
      // set property withinTwelveHours to be boolean
      let now = moment();
      let interval = moment.duration(date.diff(now)).asHours();
      let withinTwelveHours = false;
      if (interval <= 12) {
        withinTwelveHours = true;
      }
      console.log(interval, withinTwelveHours);
      newObj = {
        session_date: newDate,
        session_startTime: startTime,
        session_endTime: endTime,
        session_id: session.session_id,
        //learner_name: e.learner_name,
        tutor_name: session.tutor_name,
        session_subject: session.session_subject,
        session_location: session.session_location,
        session_status: session.session_status,
        session_times: times,
        session_day: day,
        tutor_id: tutorID,
        session_update: update,
        //tutor_img: tutor_img,
        //learner_img: learner_img,
        withinTwelveHours: withinTwelveHours
      };
      return newObj;

  }

  // change time to moment object format
  changeToMoment(time: any): any {
    let sessionDate = time.slice(0, 10);
    let sessionTime = time.slice(11);
    let date = sessionDate + 'T' + sessionTime;
    return moment(date);
  }

  // get time slots of one session
  getTimes(session: any) {
    let timesArray = [];
    let slots = session.session_duration * 2;
    let myDate = this.changeToMoment(session.session_date);
    // console.log(myDate);
    for (let i = 0; i < slots; i++) {
      timesArray.push(myDate.format().substr(0, 19));
      myDate.add(30, 'minutes');
    }
    return timesArray;
  }



}
