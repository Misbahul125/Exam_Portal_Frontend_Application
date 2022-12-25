import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public addQuestionOfQuiz(question: any) {
    return this.httpClient.post(`${baseUrl}/question/`, question);
  }

  public getAllQuestionsOfQuiz(quizId: number) {
    return this.httpClient.get(`${baseUrl}/question/quiz/all/${quizId}`);
  }

  public getAllowedQuestionsOfQuiz(quizId: number) {
    return this.httpClient.get(`${baseUrl}/question/quiz/${quizId}`);
  }

  public getQuestion(questionId: number) {
    return this.httpClient.get(`${baseUrl}/question/${questionId}`);
  }

  public updateQuestionOfQuiz(question: any) {
    return this.httpClient.put(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(questionId: number) {
    return this.httpClient.delete(`${baseUrl}/question/${questionId}`);
  }

}
