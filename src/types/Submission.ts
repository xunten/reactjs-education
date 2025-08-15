export interface Submission {
  id: number;
  assignmentId: number;
  assignmentTitle?: string;
  studentId: number;
  studentName?: string;
  status: 'SUBMITTED' | 'GRADED' | 'PENDING';
  score?: number;
}
