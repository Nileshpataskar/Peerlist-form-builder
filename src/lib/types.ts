export type QuestionType = 'short' | 'long' | 'single' | 'number' | 'url';

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  required: boolean;
  options?: string[]; // For single select questions
}