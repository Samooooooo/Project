import { Question } from './question';

export interface Score {
  wrong: number;
  skipped: number;
  remaining: number;
  wrongQuestions: Question[];
  skipedQuestions: Question[];
  rightQuestions: Question[];
  answersCounter: number;
}
