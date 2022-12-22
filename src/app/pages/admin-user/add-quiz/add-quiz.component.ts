import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories: any;

  quiz = {
    title: '',
    description: '',
    maxMarks:'',
    numberOfQuestions:'',
    active: true,
    category: {
      cid:'',
    },
  };

  constructor(private categoryService: CategoryService, private quizService: QuizService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", "Something went wrong. Please try again later.",'error');
      }
    )
  }

  public addQuiz() {
    //console.log(this.quiz);

    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this.matSnackBar.open("Title required",'', {
        duration: 3000,
      });
      return;
    }

    if (this.quiz.description.trim() == '' || this.quiz.description == null) {
      this.matSnackBar.open("Description required",'', {
        duration: 3000,
      });
      return;
    }
    if (this.quiz.maxMarks == '0') {
      this.matSnackBar.open("Maximum Marks cannot be 0",'', {
        duration: 3000,
      });
      return;
    }
    if (this.quiz.numberOfQuestions == '0') {
      this.matSnackBar.open("Number Of Questions cannot be 0",'', {
        duration: 3000,
      });
      return;
    }
    if (this.quiz.category == null) {
      this.matSnackBar.open("Select Category required",'', {
        duration: 3000,
      });
      return;
    }

    this.quizService.addQuiz(this.quiz).subscribe(
      (data: any) => {
        this.quiz.title='';
        this.quiz.description='';
        this.quiz.maxMarks='';
        this.quiz.numberOfQuestions='';
        this.quiz.category.cid= '';
        Swal.fire('Success', 'Quiz is added successfully', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Unable to add quiz', 'error');
      }
    )

  }

}
