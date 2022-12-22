import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import baseUrl from 'src/app/services/helper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title: '',
    description: ''
  };

  constructor(private categoryService: CategoryService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public addCategory() {

    if (this.category.title.trim() == '' || this.category.title == null) {
      this.matSnackBar.open("Title required",'', {
        duration: 3000,
      });
      return;
    }

    if (this.category.description.trim() == '' || this.category.description == null) {
      this.matSnackBar.open("Description required",'', {
        duration: 3000,
      });
      return;
    }

    this.categoryService.addCategory(this.category).subscribe(
      (data: any) => {
        this.category.title='';
        this.category.description='';
        Swal.fire('Success', 'Category is added successfully', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Unable to add category', 'error');
      }
    )

  }

}
