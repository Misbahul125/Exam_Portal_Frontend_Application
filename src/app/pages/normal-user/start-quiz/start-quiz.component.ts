import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  quizId: any;
  questions: any;

  marksObtained = 0;
  correctAnswers = 0;
  questionsAttempted = 0;

  isSubmitted = false;

  timer: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private locationStrategy: LocationStrategy,
    private questionService: QuestionService,
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    //console.log(this.quizId);

    this.getQuestionsFOrStartingTest();

  }

  private preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }

  getQuestionsFOrStartingTest() {

    this.questionService.getAllQuestionsOfQuiz(this.quizId).subscribe(
      (data) => {
        //console.log(data);
        this.questions = data;

        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
        });

        this.timer = this.questions.length * 2 * 60;

        console.log(this.questions);

        this.operateTimer();

      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    )

  }

  submitQuiz() {
    //console.log("submit");

    Swal.fire({
      title: 'End Test',
      text: 'Are you sure?',
      icon: 'info',
      showCancelButton: true,
      //cancelButtonColor: red,
      focusConfirm: false,
      confirmButtonColor: 'red',
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
    }).then((result) => {
      if (result.isConfirmed) {

        this.evaluateQuiz();

      }
    });

  }

  operateTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.submitQuiz();
        clearInterval(t);
      }
      else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let m = Math.floor(this.timer / 60);
    let s = this.timer - m * 60;
    return `${m} min : ${s} sec`;
  }

  evaluateQuiz() {
    
    this.isSubmitted = true;

    let singleQuestionMark = this.questions[0].quiz.maxMarks / this.questions.length;

    this.questions.forEach((question: any) => {

      if (question.givenAnswer == question.answer) {
        this.correctAnswers++;
        this.marksObtained += singleQuestionMark;
      }

      if (question.givenAnswer.trim() != '' && question.givenAnswer != null)
        this.questionsAttempted++;

    });

    console.log('Correct answer: ' + this.correctAnswers);
    console.log('Marks Obtained: ' + this.marksObtained);
    console.log('Attempted: ' + this.questionsAttempted);
  }

}