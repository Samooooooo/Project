import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from 'src/app/shared/question';
import { QuestionService } from 'src/app/shared/question.service';
import { Score } from 'src/app/shared/score';
import { ScoreService } from 'src/app/shared/score/score.service';

@Component({
  selector: 'lpc-check-q-details',
  templateUrl: './check-q-details.component.html',
  styleUrls: ['./check-q-details.component.css'],
})
export class CheckQDetailsComponent {
  question$: Observable<Question>;
  questions$: Observable<Question[]>;
  lastQError = 'No more Questions';
  lastQswitch = false;
  noOptionError = 'No Answer!!!';
  noOptionSwitch = false;
  selectedAnswer: string[] = [];
  score: Score | undefined;
  countDown = 0;
  maxWrong = 7;
  countDownBo = false;

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
    question.skipped = false;
    if (answers === '' || (Array.isArray(answers) && answers.length === 0)) {
      this.noOptionSwitch = true;
    } else {
      if (Array.isArray(answers)) {
        const correctAnswersFirstChars = question.correctAnswer.map((correct) =>
          correct.charAt(0),
        );
        const isCorrect = answers.every((answer) =>
          correctAnswersFirstChars.includes(answer.charAt(0)),
        );
        if (isCorrect && answers.length === question.correctAnswer.length) {
          this.showNextQuestion(question);
        } else {
          this.countDown = 3;
          this.countDownBo = true;
          this.countDownM();
          setTimeout(() => {
            this.showPreviosQuestion(question);
            this.countDownBo = false;
          }, 3000);
        }
      } else {
        //For Fill IN
        if (answers.includes(question.correctAnswer[0])) {
          this.showNextQuestion(question);
        } else {
          this.showPreviosQuestion(question);
        }
      }
    }
    setTimeout(() => {
      this.noOptionSwitch = false;
    }, 1000);
    question.selectedAnswer = answers;
    this.ScoreService.calculateUpdatedScores(question, answers);
    this.selectedAnswer = [];
    if (this.ScoreService.scores.wrong == this.maxWrong) {
      this.router.navigate(['scores']);
      console.log('finish');
    }
  }

  skipQuestion(question: Question, answers: string | string[]) {
    question.skipped = true;
    this.showNextQuestion(question);
    this.ScoreService.calculateUpdatedScores(question, answers);
  }

  showNextQuestion(question: Question) {
    const nextIndex = (parseInt(question.index) + 1).toString();

    this.questions$.subscribe((questions) => {
      if (parseInt(nextIndex) < questions.length) {
        this.lastQswitch = false;
        this.noOptionSwitch = false;
        this.question$ = this.service.getSingle(nextIndex);
        this.router.navigate(['check', nextIndex]);
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
      this.router.navigate(['check', prevIndex]);
    } else {
      this.lastQswitch = true;
      setTimeout(() => {
        this.lastQswitch = false;
      }, 1000);
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
  countDownM() {
    if (this.countDown > 0) {
      setTimeout(() => {
        this.countDown--;
        this.countDownM();
      }, 1000);
    }
  }
}
