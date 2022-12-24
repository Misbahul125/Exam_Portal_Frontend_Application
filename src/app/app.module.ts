import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { AdminDashboardComponent } from './pages/admin-user/dashboard/admin-dashboard/admin-dashboard.component';
import { NormalDashboardComponent } from './pages/normal-user/normal-dashboard/normal-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './pages/admin-user/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin-user/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin-user/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin-user/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin-user/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin-user/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin-user/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin-user/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin-user/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin-user/update-question/update-question.component';
import { UpdateCategoryComponent } from './pages/admin-user/update-category/update-category.component';

import { SidebarComponent as NormalSidebarComponent } from './pages/normal-user/sidebar/sidebar.component';
import { NormalViewAllQuizzesComponent } from './pages/normal-user/normal-view-all-quizzes/normal-view-all-quizzes.component';
import { InstructionsComponent } from './pages/normal-user/instructions/instructions.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AdminDashboardComponent,
    NormalDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    ViewQuizzesComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    ViewQuizQuestionsComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    UpdateCategoryComponent,
    NormalSidebarComponent,
    NormalViewAllQuizzesComponent,
    InstructionsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
