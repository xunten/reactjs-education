export interface QuizQuestion {
  id: number;
  quiz_id: number;
  question_text: string;
    correct_option: string;
    score: number;
  created_at: string;
  updated_at: string;
}
