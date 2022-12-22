import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin-user/add-category/add-category.component';
import { AdminDashboardComponent } from './pages/admin-user/dashboard/admin-dashboard/admin-dashboard.component';
import { ViewCategoriesComponent } from './pages/admin-user/view-categories/view-categories.component';
import { ViewQuizzesComponent } from './pages/admin-user/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin-user/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NormalDashboardComponent } from './pages/normal-user/normal-dashboard/normal-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },

  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent,
      },
    ]
  },

  {
    path: 'user',
    component: NormalDashboardComponent,
    pathMatch: 'full',
    canActivate: [NormalGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
