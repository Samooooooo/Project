import { Component } from '@angular/core';
import { Score } from '../score';
import { ScoreService } from './score.service';
import { QuestionService } from '../question.service';

@Component({
  selector: 'lpc-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent {
  scores: Score;
  questionsInTotal: number;

  constructor(
    private scoreService: ScoreService,
    private service: QuestionService,
  ) {
    this.scores = this.scoreService.getScores();
    this.questionsInTotal = this.service.questionsLength;
    console.log(this.questionsInTotal);
    console.log(this.service.questionsLength);
  }

  isArray(answer: string | string[]): boolean {
    return Array.isArray(answer);
  }
}
