import { Component } from '@angular/core';
import { Question } from '../../shared/question';
import { QuestionService } from '../../shared/question.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'lpc-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent {
  questions$: Observable<Question[]>;

  constructor(private Service: QuestionService) {
    this.questions$ = this.Service.getQuestions();
  }

  showAnswer(question: Question) {
    question.showAnswer = true;
  }
}
