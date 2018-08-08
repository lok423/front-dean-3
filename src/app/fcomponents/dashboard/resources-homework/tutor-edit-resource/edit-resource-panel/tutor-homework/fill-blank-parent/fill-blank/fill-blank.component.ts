import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { QuestionObj, QuestionInfo } from '../../../../../../../../models/HomeworkResourceModel';

@Component({
  selector: 'app-fill-blank',
  templateUrl: './fill-blank.component.html',
  styleUrls: ['./fill-blank.component.css']
})
export class FillBlankComponent implements OnInit {
  // viewer type
  @Input() viewerType: string;
  // access type
  @Input() accessType: string;

  // Question Id
  @Input() questionId: number;
  // question status: init, unsaved, saved
  @Input() questionStatus: string;
  // Question information
  @Input() questionInfo: any;
  // function to create question object
  @Input() createQuizObj: Function;

  // get question value
  @Output() collectFormValue: EventEmitter<object> = new EventEmitter<object>();
  // return question id for editing
  @Output() editQuiz: EventEmitter<number> = new EventEmitter<number>();
  // return delete information
  @Output() deleteQuiz: EventEmitter<number> = new EventEmitter<number>();
  // return question id for discarding
  @Output() discardQuiz: EventEmitter<number> = new EventEmitter<number>();
  // move question position up
  @Output() upQuestion: EventEmitter<number> = new EventEmitter<number>();
  // move question position down
  @Output() downQuestion: EventEmitter<number> = new EventEmitter<number>();



    questionForm: FormGroup;
    questionText: string = "fill in the blank [fillblank] and [fillblank].";
    ans: string[] = [];

    //ansdemo = "\"abc\",\"23212\"";

    displayQuestionText = "";
    showAnss: boolean = false;
    inputNum = 0;

    //ansString:string ='';



    constructor(private fb: FormBuilder) {
    }

/*
autoExpand(){
  $(document)
    .one('focus.autoExpand', 'textarea.autoExpand', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', 'textarea.autoExpand', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
        this.rows = minRows + rows;
    });
}
*/


    ngOnInit() {
      //this.autoExpand();
      this.createForm();
      console.log(this.questionInfo);
      console.log(this.accessType);
      if (this.accessType == "modify" && this.questionStatus == "saved" && this.questionInfo.questionSaveStatus != "unSaved") {
        console.log(this.questionInfo);
        var answerList = this.questionInfo.questionContent.answerList;
        /*
        for (var i = 0; i < this.questionInfo.questionContent.ansArray.length; i++) {
          answerList.push(this.questionInfo.questionContent.ansArray[i].ans);
        }
        */
        this.displaySaveQuestion(answerList);
      }


      if (this.accessType == "overview") {
        for (var j = 0; j < this.questionInfo.length; j++) {
          this.displayOverView(j);
        }
      }

      $(document).ready(function() {
        $('#insert').on('click', function() {
          var cursorPosStart = $('#text').prop('selectionStart');
          var cursorPosEnd = $('#text').prop('selectionEnd');
          var v = $('#text').val();
          var textBefore = v.toString().substring(0, cursorPosStart);
          var textAfter = v.toString().substring(cursorPosEnd, v.toString().length);
          $('#text').val(textBefore + $(this).val() + textAfter);
        });
      });


    }

    displayOverView(j) {
      var id = "text-" + (j);
      var ans = this.questionInfo[j].questionContent.answerList;

      var i = 0;
      for (var p = 0; p < ans.length; p++) {
        $(document).ready(function() {

          //for(var p=0;p<this.ans.length;p++){
          console.log(i);
          $('#' + id).html($('#' + id).html().replace(/(\[blank_0[1-9]{1}\])|(\[blank_[1-9]{1}\d{1}\])/, '&nbsp;<u style="color:red;">&nbsp;&nbsp;&nbsp;' + ans[i] + '&nbsp;&nbsp;&nbsp;</u>&nbsp;'));
          i++;
          //}
        });
      }
    }

    displaySaveQuestion(answerList) {
      var id = "text";
      var ans = answerList;
      var questionText = this.questionInfo.questionContent.questionText;

      var i = 0;
      for (var p = 0; p < ans.length; p++) {
          questionText = questionText.replace(/(\[blank_0[1-9]{1}\])|(\[blank_[1-9]{1}\d{1}\])/, '&nbsp;<u id="red">&nbsp;&nbsp;&nbsp;' + ans[i] + '&nbsp;&nbsp;&nbsp;</u>&nbsp;');
          i++;
          /*
          $(document).ready(function() {
            console.log(i);
            $('#' + id).html($('#' + id).html().replace(/(\[blank_0[1-9]{1}\])|(\[blank_[1-9]{1}\d{1}\])/, '&nbsp;<u style="color:red;">&nbsp;&nbsp;&nbsp;' + ans[i] + '&nbsp;&nbsp;&nbsp;</u>&nbsp;'));
            i++;
            //}
          });
          */
      }
      console.log(questionText);
     this.questionText= questionText;
    }

    displayQuizAnswer(j) {
      var id = "ans-" + (j);
      var ans = this.questionInfo[j].questionContent.answerList;
      var i = 0;
      for (var p = 0; p < ans.length; p++) {
        $(document).ready(function() {

          //for(var p=0;p<this.ans.length;p++){
          console.log(i);
          $('#' + id).html($('#' + id).html().replace(/(\[blank_0[1-9]{1}\])|(\[blank_[1-9]{1}\d{1}\])/, '&nbsp;<u style="color:red;">&nbsp;&nbsp;&nbsp;' + ans[i] + '&nbsp;&nbsp;&nbsp;</u>&nbsp;'));
          i++;
          //}
        });
      }
    }



    createForm() {
      console.log("Start to create form for: " + this.viewerType);
      if (this.viewerType == "tutor") {
        if (this.questionStatus == "init") {
          // fired when a new question is added
          this.questionForm = this.fb.group({
            questionTitle: [''],
            questionText: ['', Validators.required],
            answerList:'',
            ansArray: this.fb.array([
              //this.getUnit()
            ])
          });
        } else if (this.questionStatus == "saved" && this.questionInfo.questionSaveStatus == "unSaved") {

          this.blankNum=this.questionInfo.questionContent.ansArray.length;
          // fired when a question is required to be edited
          this.questionForm = this.fb.group({
            questionTitle: [''],
            questionText: ['', Validators.required],
            answerList:'',
            ansArray: this.fb.array([]
            )
          });
          this.questionForm.setValue({
            questionTitle: this.questionInfo.questionContent.questionTitle,
            questionText: this.questionInfo.questionContent.questionText,
            ansArray: [],
            answerList:this.questionInfo.questionContent.answerList
          });


          for (const i in this.questionInfo.questionContent.ansArray) {
            console.log(this.questionInfo);

            const data = this.questionInfo.questionContent.ansArray[i];
            let ans = this.questionForm.get('ansArray') as FormArray;
            ans.push(this.fb.group({
              ans: data.ans
            }));
          }
        }
      } else if (this.viewerType == "learner") {
        console.log(this.questionInfo);
        //this.replaceAns();
        console.log("Creating form for LEARNER!!!!!");

        this.quizForm = this.fb.group({
          result: new FormArray([
          ])
        });
        this.addQuestion();
      }
    }
/*
    replaceAns() {
      var newAns = this.questionText;
      for (var i = 0; i < this.ans.length; i++) {
        newAns = newAns.replace(/\[blank\]/, this.ans[i]);
      }
      console.log(newAns);
      this.displayQuestionText = newAns;
    }
    */

//saved view
    saveQuestion() {
      if (this.questionForm.status === "VALID") {
        let quiz = {
          type: '',
          quizContent: {}
        };

        if (this.questionStatus == "init") {
          this.questionInfo = this.createQuizObj("blank", this.questionId, this.questionForm.value);
          console.log(this.questionInfo);
          quiz.type = "new";
        } else if (this.questionStatus == "saved") {
          if (this.questionInfo.questionSaveStatus == "unSaved") { // edit question
            this.questionInfo = this.createQuizObj(
              "blank",
              this.questionInfo.questionId,
              this.questionForm.value);
            quiz.type = "existed";
          }
        }
        this.questionInfo.questionSaveStatus = 'saved';
        quiz.quizContent = this.questionInfo;

        this.collectFormValue.emit(quiz);
      } else {
        alert("New question is not saved!!");
      }
    }
    // edit question
    editQuestion() {
      let i = this.questionInfo.questionId;
      this.editQuiz.emit(i);

    }

    // delete question
    deleteQuestion() {
      this.deleteQuiz.emit(this.questionInfo.questionId);
    }

    // discard uncompleted questions
    discardQuestion() {
      if (this.questionStatus == "init") {
        if (this.questionId == 1) {
          // empty the init question form if no questions are saved
          this.questionForm.reset();
          let ans = this.questionForm.get('ansArray') as FormArray;
          while(ans.length>0){
            ans.removeAt(0);
          }
          this.blankNum=0;
        } else {
          this.discardQuiz.emit(this.questionId);
        }
      } else if (this.questionStatus == "saved") {
        this.discardQuiz.emit(this.questionInfo.questionId);
      }
    }

    // up question
    moveQuestionUp() {
      this.upQuestion.emit(this.questionInfo.questionId);
    }

    // down question
    moveQuestionDown() {
      this.downQuestion.emit(this.questionInfo.questionId);
    }
    //saved view end

    //quiz view
    numOfAns: number = 0;
    quizForm: FormGroup;
    ansArray: any[] = [];
    finalArray: any[] = [];

    showAns() {
      this.showAnss = true;
      for (var i = 0; i < this.questionInfo.length; i++) {
        this.displayQuizAnswer(i);
      }
    }

    hideAns(){
      this.showAnss = false;
    }

    replaceTextToInput(j,i) {
      var id = "questionText-" + (j);
      //var input = '<input type="text" style="text-decoration: underline;" formControlName="ansInput"' + 'id="input-' + this.numOfAns + '">';
      var input = '&nbsp;<input type="text" style="border: none;border-bottom: solid 1px #383838;color: #383838;background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 98%, #454545 98%);background-repeat: no-repeat;background-size: 260px 100%;background-position: -260px 0;transition: background-position 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);" formControlName="ansInput"' + 'id="input-' + this.numOfAns + '"/>&nbsp;';

      //var input = '<u style="color:red;">&nbsp;&nbsp;'+ (i+1) + '&nbsp;&nbsp;</u>';
      console.log(input);
      console.log(id);
      $(document).ready(function() {
        $('#' + id).html($('#' + id).html().replace(/(\[blank_0[1-9]{1}\])|(\[blank_[1-9]{1}\d{1}\])/, input));
      });
      this.numOfAns++;
    }

    initQuestion(i) {
      console.log(this.questionInfo[i].questionContent.answerList);
      return new FormGroup({
        questionTitle: new FormControl(this.questionInfo[i].questionContent.questionTitle),
        questionText: new FormControl(this.questionInfo[i].questionContent.questionText),
        questionId: new FormControl(this.questionInfo[i].questionId),
        //questionAns: new FormControl(this.questionInfo[i].questionContent.answerList),
        ans: new FormArray([
        ])
      });

    }

    addQuestion() {
      var n = 0;
      const control = <FormArray>this.quizForm.get('result');
      for (var i = 0; i < this.questionInfo.length; i++) {
        control.push(this.initQuestion(i));
        this.addAns(i, n);
      }
    }
    addAns(j, n) {
      const formControl = <FormArray>this.quizForm.get('result');
      const control = <FormArray>formControl.controls[j].get('ans');
      console.log(control);
      for (var i = 0; i < this.questionInfo[j].questionContent.ansArray.length; i++) {
        this.replaceTextToInput(j,i);
        control.push(this.initAns());
      }

    }
    initAns() {
      return new FormGroup({
        ansInput: new FormControl("")
      });
    }
    collectAnswer() {

      const formControl = <FormArray>this.quizForm.get('result');
      var k = 0;
      for (var n = 0; n < this.questionInfo.length; n++) {
        const control = <FormArray>formControl.controls[n].get('ans');
        for (var j = 0; j < this.questionInfo[n].questionContent.ansArray.length; j++) {
          const ansInputControl = control.controls[j].get('ansInput');
          ansInputControl.patchValue($("#input-" + k).val());
          k++;
        }
      }
      
    }
    getQuestion(form) {
      //console.log(form.get('sections').controls);
      return form.controls.result.controls;
    }

    getOptionContent(form) {
      return form.controls.ans.controls;
    }

    onSubmit() {
      console.log(this.quizForm.value);
    }
    //quiz view end



    //form view
    /**
     * Create form unit
     */
    private getUnit() {
      return this.fb.group({
        ans: ['', Validators.required],
      });
    }

    /**
     * Add new unit row into form
     */
    private addUnit() {
      var blankNum = this.blankNum;
      if (blankNum<9){
        var blankName = "[blank_0" +(blankNum+1)+"]";

      }else{
        var blankName = "[blank_" +(blankNum+1)+"]";

      }
  console.log(blankName);
      this.blankArray.push(blankName);
      var originText = $('#questionText').val();
      //console.log(originText);
      var cursorPosStart = $('#questionText').prop('selectionStart');
      var cursorPosEnd = $('#questionText').prop('selectionEnd');
      var v = $('#questionText').val();
      var textBefore = v.toString().substring(0, cursorPosStart);
      var textAfter = v.toString().substring(cursorPosEnd, v.toString().length);
      $('#questionText').val(textBefore + blankName + textAfter);
      var text = $('#questionText').val();
      const control = <FormArray>this.questionForm.controls['ansArray'];
      control.push(this.getUnit());
      const textControl = this.questionForm.controls['questionText'];
      textControl.patchValue($('#questionText').val());
      this.blankNum++;
    }

    /**
     * Remove unit row from form on click delete button
     */
    private removeUnit(i: number) {
      const questionText = $('#questionText').val();
      const control = <FormArray>this.questionForm.controls['ansArray'];
      control.removeAt(i);
      //console.log(i);
      this.replaceWord(i);
      //this.blankArray.splice(i,1);
      this.blankNum--;
      const textControl = this.questionForm.controls['questionText'];
      textControl.patchValue($('#questionText').val());

    }

    collectAnswer1() {
      var wordMatch1 = /(\[blank_0[1-9]{1}\])|(\[blank_[1-9]{1}\d{1}\])/g;
      //var wordMatch2 = /\[blank_[1-9]{1}\d{1}\]/g;
      const questionText = $('#questionText').val();
      const form = this.questionForm.value;
      var answerList = [];
      var m1 = questionText.toString().match(wordMatch1);
      console.log(m1);
      if (m1) {
        for (var i = 0; i < m1.length; i++) {
          console.log(m1[i]);
          if(m1[i].match(/0[1-9]{1}\]/)){
          var blanknum1 = m1[i].match(/0[1-9]{1}\]/).toString();
          blanknum1 = blanknum1.substring(1,2);
          console.log(blanknum1);
        }
        if(m1[i].match(/[1-9]{1}\d{1}\]/)){
        var blanknum1 = m1[i].match(/[1-9]{1}\d{1}\]/).toString();
        blanknum1 = blanknum1.substring(0,2);
        console.log(blanknum1);
      }
          answerList.push(form.ansArray[Number(blanknum1)-1].ans);
        }
        if (m1.length != form.ansArray.length) {
          alert("Number of answer doesn't match number of blank!")
        }else{
          console.log(answerList);
          this.questionForm.controls['answerList'].patchValue(answerList);
          this.saveQuestion();
        }

      } else {
        alert("Please add at least one blank!");
      }

    }

    replaceWord(wordPosition) {
      if(wordPosition<9){
        var wordMatch = "blank_0"+(wordPosition+1);
      }else{
        var wordMatch = "blank_"+(wordPosition+1);

      }

      var count = wordPosition+1;
      const questionText = $('#questionText').val();
      //var text = questionText.replace(/\[blank\]/g, "[[blank]]");
      //console.log(text);
      var a = questionText.toString().split(/\[|\]/);
      console.log(a);

      for (var i = 0; i < a.length; i++) {
        if (a[i].match(wordMatch)) {
            var remove = a.splice(i, 1);
            console.log("remove");
        }
      }


      for (var i = 0; i < a.length; i++) {
  //console.log(count);
  if(a[i].match(/blank_0[1-9]{1}/)){

  var blanknum1 = a[i].match(/0[1-9]{1}/).toString();
  blanknum1 = blanknum1.substring(1,2);
  console.log(blanknum1);
  if (Number(blanknum1) >=(wordPosition+1)) {
    if(Number(blanknum1)<11){
      a[i] = "[blank_0"+(Number(blanknum1)-1)+"]";
    }else{
      a[i] = "[blank_"+(Number(blanknum1)-1)+"]";
    }
    count++;
  }else{
    a[i]="["+a[i]+"]";
  }
  }
  if(a[i].match(/blank_[1-9]{1}\d{1}/)){
  var blanknum1 = a[i].match(/[1-9]{1}\d{1}/).toString();
  blanknum1 = blanknum1.substring(0,2);
  console.log(blanknum1);
  if (Number(blanknum1) >=(wordPosition+1)) {
    if(Number(blanknum1)<11){
      a[i] = "[blank_0"+(Number(blanknum1)-1)+"]";
    }else{
      a[i] = "[blank_"+(Number(blanknum1)-1)+"]";
    }
    count++;
  }else{
    a[i]="["+a[i]+"]";
  }
  }


      }
      console.log(a);
      $('#questionText').val(a.join(""));
    }

    blankArray = [];
    blankNum=0;

}
