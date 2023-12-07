import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from 'src/app/shared/question';
import { QuestionService } from 'src/app/shared/question.service';

@Component({
  selector: 'lpc-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css'],
})
export class QuestionDetailsComponent {
  question$: Observable<Question>;
  questions$: Observable<Question[]>;
  lastQError = 'No more Questions';
  lastQswitch = false;

  constructor(
    private service: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const index = this.route.snapshot.paramMap.get('index')!;
    this.question$ = this.service.getSingle(index);
    this.questions$ = this.service.getQuestions();
  }
  showAnswer(question: Question) {
    question.showAnswer = true;
  }

  showNextQuestion(question: Question) {
    const nextIndex = (parseInt(question.index) + 1).toString();
    this.lastQswitch = false;
    this.questions$.subscribe((questions) => {
      if (parseInt(nextIndex) === questions.length) {
        this.lastQswitch = true;
        this.router.navigate(['learn', question.index]);
      } else {
        this.question$ = this.service.getSingle(nextIndex);
        this.router.navigate(['learn', nextIndex]);
      }
    });
  }

  showPreviosQuestion(question: Question) {
    const PreviosIndex = (parseInt(question.index) - 1).toString();
    this.lastQswitch = false;
    if (parseInt(PreviosIndex) < 0) {
      this.lastQswitch = true;
    } else {
      this.question$ = this.service.getSingle(PreviosIndex);
      this.router.navigate(['learn', PreviosIndex]);
    }
  }
}
