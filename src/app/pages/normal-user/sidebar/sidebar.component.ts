import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-normal-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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

}
