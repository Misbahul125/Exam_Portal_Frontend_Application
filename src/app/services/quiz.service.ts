import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private httpClient: HttpClient) { }

  public addQuiz(quiz: any) {
    return this.httpClient.post(`${baseUrl}/quiz/`, quiz);
  }

  public getQuiz(quizId: number) {
    return this.httpClient.get(`${baseUrl}/quiz/${quizId}`);
  }

  public getQuizzes() {
    return this.httpClient.get(`${baseUrl}/quiz/`);
  }

  public getQuizzesOfCategory(categoryId: number) {
    return this.httpClient.get(`${baseUrl}/quiz/category/${categoryId}`);
  }

  public updateQuiz(quiz: any) {
    return this.httpClient.put(`${baseUrl}/quiz/`, quiz);
  }

  public deleteQuiz(qId: number) {
    return this.httpClient.delete(`${baseUrl}/quiz/${qId}`);
  }

}
