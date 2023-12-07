export interface Question {
  index: string;
  questionType: string;
  question: string;
  options: string[];
  correctAnswer: string[];
  showAnswer: boolean;
  skipped: boolean;
  selectedAnswer: string | string[];
}
