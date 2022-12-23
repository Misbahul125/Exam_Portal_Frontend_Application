import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  quizId: any;
  quizTitle: any;
  questions: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
  ) { }

  ngOnInit(): void {
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    this.quizTitle = this.activatedRoute.snapshot.params['quizTitle'];

    this.questionService.getAllQuestionsOfQuiz(this.quizId).subscribe(
      (data) => {
        //console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    )

  }

  public deleteQuestion(questionId: number) {
    //console.log(questionId);

    Swal.fire({
      title: 'Delete Question',
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

        this.questionService.deleteQuestion(questionId).subscribe(
          (data: any) => {
            this.questions = this.questions.filter((question: any) => question.quesId != questionId);
            Swal.fire('Success', 'Question is deleted successfully', 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Unable to delete question', 'error');
          }
        )

      }
    });

  }

}
