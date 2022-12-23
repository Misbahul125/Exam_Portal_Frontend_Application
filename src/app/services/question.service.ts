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

  public getAllQuestionsOfQuiz(quizId: number) {
    return this.httpClient.get(`${baseUrl}/question/quiz/all/${quizId}`);
  }

}
