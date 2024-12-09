  export type QuestionType = "short" | "long" | "single" | "date" | "url";

  export interface Question {
    id: string;
    type: QuestionType;
    title: string;
    description: string;

    required: boolean;
    options?: string[]; // For single select questions
  }

  export interface Form {
    id: string;
    title: string;
    // description: string;
    questions: Question[];
    createdAt: Date;
  }
