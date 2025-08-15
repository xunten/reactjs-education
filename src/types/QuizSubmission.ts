export interface QuizSubmission {
  id: number;
  quizId: number;
  quizTitle?: string;
  studentId: number;
  studentName?: string;
  score: number;
  submittedAt: Date;
}
