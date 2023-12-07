import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from 'src/app/shared/question';
import { QuestionService } from 'src/app/shared/question.service';
import { Score } from 'src/app/shared/score';
import { ScoreService } from 'src/app/shared/score/score.service';

@Component({
  selector: 'lpc-exam-q-details',
  templateUrl: './exam-q-details.component.html',
  styleUrls: ['./exam-q-details.component.css'],
})
export class ExamQDetailsComponent {
  question$: Observable<Question>;
  questions$: Observable<Question[]>;
  lastQError = 'No more Questions';
  lastQswitch = false;
  noOptionError = 'No Answer!!!';
  noOptionSwitch = false;
  selectedAnswer: string[] = [];
  score: Score | undefined;
  countDown = 0;

  constructor(
    private service: QuestionService,
    private ScoreService: ScoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const index = this.route.snapshot.paramMap.get('index')!;
    this.question$ = this.service.getSingle(index);
    this.questions$ = this.service.getQuestions();
  }

  checkAnswerAndNavigate(question: Question, answers: string | string[]) {
    if (answers === '' || (Array.isArray(answers) && answers.length === 0)) {
      this.noOptionSwitch = true;
    } else {
      if (Array.isArray(answers)) {
        this.showNextQuestion(question);
      } else {
        //For Fill IN
        this.showNextQuestion(question);
      }
    }
    question.selectedAnswer = answers;
    this.ScoreService.calculateUpdatedScores(question, answers);
    this.selectedAnswer = [];
    if (
      this.ScoreService.isExamRoute() &&
      this.ScoreService.scores.wrong == this.service.questionsLength * 0.2
    ) {
      setTimeout(() => {
        this.router.navigate(['scores']);
      }, 500);
    }
  }
  showNextQuestion(question: Question) {
    const nextIndex = (parseInt(question.index) + 1).toString();

    this.questions$.subscribe((questions) => {
      if (parseInt(nextIndex) < questions.length) {
        this.lastQswitch = false;
        this.noOptionSwitch = false;
        this.question$ = this.service.getSingle(nextIndex);
        this.router.navigate(['exam', nextIndex]);
      } else {
        this.router.navigate(['scores']);
      }
    });
  }

  showPreviosQuestion(question: Question) {
    const prevIndex = (parseInt(question.index) - 1).toString();

    if (parseInt(prevIndex) >= 0) {
      this.lastQswitch = false;
      this.question$ = this.service.getSingle(prevIndex);
      this.router.navigate(['exam', prevIndex]);
    } else {
      this.lastQswitch = true;
    }
  }
  packInArray(option: string) {
    if (this.selectedAnswer.includes(option)) {
      this.selectedAnswer = this.selectedAnswer.filter(
        (item) => item !== option,
      );
    } else {
      this.selectedAnswer.push(option);
    }
  }
}
