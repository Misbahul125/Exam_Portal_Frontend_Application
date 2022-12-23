import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  quizId: any;
  quizTitle: any;
  questionId: any;
  question: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private matSnackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.questionId = this.activatedRoute.snapshot.params['questionId'];
    this.quizTitle = this.activatedRoute.snapshot.params['quizTitle'];
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    //console.log(this.questionId);

    this.questionService.getQuestion(this.questionId).subscribe(
      (data: any) => {
        this.question = data;
        //console.log(this.question);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading quiz question', 'error');
      }
    )
  }

  public updateQuestion() {
    //console.log(this.question);

    if (this.question.content.trim() == '' || this.question.content == null) {
      this.matSnackBar.open("Content required", '', {
        duration: 3000,
      });
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      this.matSnackBar.open("Option 1 required", '', {
        duration: 3000,
      });
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      this.matSnackBar.open("Option 2 required", '', {
        duration: 3000,
      });
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      this.matSnackBar.open("Please select answer", '', {
        duration: 3000,
      });
      return;
    }

    Swal.fire({
      title: 'Update Question',
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

        this.questionService.updateQuestionOfQuiz(this.question).subscribe(
          (data: any) => {
            this.question.content = '';
            this.question.option1 = '';
            this.question.option2 = '';
            this.question.option3 = '';
            this.question.option4 = '';
            this.question.answer = '';
            this.question.quiz.qId = '';
            Swal.fire('Success', 'Question is updated successfully', 'success').then((e) => {
              this.router.navigate(['/admin/view-questions/' + this.quizId + '/' + this.quizTitle]);
            });
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Unable to update question', 'error');
          }
        )

      }
    });

  }

}
