import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  categoryId: any;
  category = {
    title: '',
    description: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private matSnackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.params['categoryId'];
    //console.log(this.questionId);

    this.categoryService.getCategory(this.categoryId).subscribe(
      (data: any) => {
        this.category = data;
        //console.log(this.category);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading category', 'error');
      });
  }

  public updateCategory() {
    console.log(this.category);

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

    Swal.fire({
      title: 'Update Category',
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

        this.categoryService.updateCategory(this.category).subscribe(
          (data: any) => {
            this.category.title='';
            this.category.description='';
            Swal.fire('Success', 'Category is updated successfully', 'success').then((e) => {
              this.router.navigate(['/admin/categories']);
            });
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Unable to update category', 'error');
          }
        )

      }
    });

  }

}
