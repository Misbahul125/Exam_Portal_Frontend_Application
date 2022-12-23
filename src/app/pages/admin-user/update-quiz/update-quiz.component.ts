import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId: any;
  quiz: any;
  categories: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private categoryService: CategoryService,
    private matSnackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.qId = this.activatedRoute.snapshot.params['quizId'];

    this.quizService.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);

        this.categoryService.getAllCategories().subscribe(
          (data: any) => {
            this.categories = data;
            console.log(this.categories);
          },
          (error) => {
            console.log(error);
            Swal.fire("Error !!", "Something went wrong. Please try again later.", 'error');
          }
        )

      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading quiz', 'error');
      }
    )

  }

  public updateQuiz() {
    //console.log(this.quiz);

    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this.matSnackBar.open("Title required", '', {
        duration: 3000,
      });
      return;
    }

    if (this.quiz.description.trim() == '' || this.quiz.description == null) {
      this.matSnackBar.open("Description required", '', {
        duration: 3000,
      });
      return;
    }
    if (this.quiz.maxMarks == '0') {
      this.matSnackBar.open("Maximum Marks cannot be 0", '', {
        duration: 3000,
      });
      return;
    }
    if (this.quiz.numberOfQuestions == '0') {
      this.matSnackBar.open("Number Of Questions cannot be 0", '', {
        duration: 3000,
      });
      return;
    }
    if (this.quiz.category == null) {
      this.matSnackBar.open("Select Category required", '', {
        duration: 3000,
      });
      return;
    }

    Swal.fire({
      title: 'Update Quiz',
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

        this.quizService.updateQuiz(this.quiz).subscribe(
          (data: any) => {
            this.quiz.title = '';
            this.quiz.description = '';
            this.quiz.maxMarks = '';
            this.quiz.numberOfQuestions = '';
            this.quiz.category.cid = '';
            Swal.fire('Success', 'Quiz is updated successfully', 'success').then((e) => {
              this.router.navigate(['/admin/quizzes']);
            });
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Unable to update quiz', 'error');
          }
        )

      }
    });

  }

}
