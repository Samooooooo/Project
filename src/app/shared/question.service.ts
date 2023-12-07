import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Question } from './question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private jsonFilePath = 'assets/output.json';

  questions: Question[] = [];
  questionsLength = 0;

  constructor(private http: HttpClient) {
    this.getLength();
  }
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.jsonFilePath);
  }

  getSingle(index: string): Observable<Question> {
    return this.http.get<Question[]>(this.jsonFilePath).pipe(
      map((questions: Question[]) => {
        const foundQuestion = questions.find((q) => q.index == index);
        if (foundQuestion) {
          return foundQuestion;
        } else {
          throw new Error('Question not found');
        }
      }),
    );
  }
  getLength() {
    return this.http
      .get<Question[]>(this.jsonFilePath)
      .subscribe((questions) => {
        this.questionsLength = questions.length;
        console.log(this.questionsLength);
        console.log(questions.length);
      });
  }
}
