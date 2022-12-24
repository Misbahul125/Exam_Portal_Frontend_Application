import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: any;

  constructor(
    private categoryService: CategoryService,
    ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data;
        //console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", "Something went wrong. Please try again later.", 'error');
      }
    )
  }

  public deleteCategory(categoryId: number, categoryTitle: string) {
    //console.log(categoryId);

    Swal.fire({
      title: 'Delete Category - '+categoryTitle,
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

        this.categoryService.deleteCategory(categoryId).subscribe(
          (data: any) => {
            this.categories = this.categories.filter((category: any) => category.cid != categoryId);
            Swal.fire('Success', 'Category is deleted successfully', 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Unable to delete category', 'error');
          }
        )

      }
    });
  }

}
