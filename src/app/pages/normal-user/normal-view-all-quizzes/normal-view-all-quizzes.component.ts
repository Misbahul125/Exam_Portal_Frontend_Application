import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-normal-view-all-quizzes',
  templateUrl: './normal-view-all-quizzes.component.html',
  styleUrls: ['./normal-view-all-quizzes.component.css']
})
export class NormalViewAllQuizzesComponent implements OnInit {

  categoryId: any;
  quizzes: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parama) => {
    this.categoryId = this.activatedRoute.snapshot.params['categoryId'];  
      
    if (this.categoryId == 0) {
      //view all quiz
      this.quizService.getActiveQuizzes().subscribe(
        (data: any) => {
          this.quizzes = data;
          //console.log(this.quizzes);
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', 'Error in loading quiz', 'error');
        }
      )

    }
    else {
      //view single quiz
      this.quizService.getActiveQuizzesOfCategory(this.categoryId).subscribe(
        (data: any) => {
          this.quizzes = data;
          //console.log(this.quizzes);
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', 'Error in loading quiz', 'error');
        }
      )
    }

    });

  }

}
