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
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    )

  }

  submitQuiz() {
    console.log("submit");
    
  }

}