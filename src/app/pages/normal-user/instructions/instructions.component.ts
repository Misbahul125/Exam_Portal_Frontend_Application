import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  quizId: any;
  quiz: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    //console.log(this.quizId);

    this.quizService.getQuiz(this.quizId).subscribe(
      (data: any) => {
        this.quiz = data;
        //console.log(this.quiz);

      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading quiz', 'error');
      }
    )

  }

  public startQuiz() {
    //console.log('start');

    Swal.fire({
      title: 'Start Quiz',
      text: 'Are you ready?',
      icon: 'info',
      showCancelButton: true,
      //cancelButtonColor: red,
      focusConfirm: false,
      confirmButtonColor: 'red',
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/user/start/quiz/'+this.quizId]);
      }
    });

  }

}
