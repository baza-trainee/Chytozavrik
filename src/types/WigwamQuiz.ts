export interface LastquizType {
  id: number;
  last_quiz_id?: string | null;
  unique_quizzes_passed?: string | null;
}

export interface QuizResponse {
  data: LastquizType;
}

export interface ErrorType {
  message: string;
}
