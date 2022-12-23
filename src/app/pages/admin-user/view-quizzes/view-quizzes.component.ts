import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any;

  constructor(
    private quizService: QuizService,
    ) { }

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        //console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data', 'error');
      }
    )
  }

  deleteQuiz(qId: number) {
    //console.log(qId);

    Swal.fire({
      title: 'Delete Quiz',
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

        this.quizService.deleteQuiz(qId).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId != qId);
            Swal.fire('Success', 'Quiz is deleted successfully', 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Unable to delete quiz', 'error');
          }
        )

      }
    });

  }

}
