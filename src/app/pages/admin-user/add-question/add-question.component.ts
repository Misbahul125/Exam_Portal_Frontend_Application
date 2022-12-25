import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  quizId: any;
  quizTitle: any;
  question= {
    quiz: {
      qId: '',
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private matSnackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    this.quizTitle = this.activatedRoute.snapshot.params['quizTitle'];

    this.question.quiz['qId'] = this.quizId;
  }

  public addQuestionOfQuiz() {
    //console.log(this.question);

    if (this.question.content.trim() == '' || this.question.content == null) {
      this.matSnackBar.open("Content required",'', {
        duration: 3000,
      });
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      this.matSnackBar.open("Option 1 required",'', {
        duration: 3000,
      });
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      this.matSnackBar.open("Option 2 required",'', {
        duration: 3000,
      });
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      this.matSnackBar.open("Please select answer",'', {
        duration: 3000,
      });
      return;
    }

    Swal.fire({
      title: 'Add Question',
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

        this.questionService.addQuestionOfQuiz(this.question).subscribe(
          (data: any) => {
            this.question.content = '';
            this.question.option1 = '';
            this.question.option2 = '';
            this.question.option3 = '';
            this.question.option4 = '';
            this.question.answer = '';
            this.question.quiz.qId = '';
            Swal.fire('Success', 'Question is added successfully', 'success').then((e) => {
              this.router.navigate(['/admin/view-questions/'+this.quizId+'/'+this.quizTitle]);
            });
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Unable to add quiz', 'error');
          }
        )

      }
    });


  }

}
