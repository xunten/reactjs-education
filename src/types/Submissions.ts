
export interface Submission {
  id: bigint;
  assignment_id: bigint;
  student_id: bigint;
  submitted_at: Date;
  file_path: string;
  status: "GRADED" | "UNGRADED" | "SUBMITTED";
  score: number;
  graded_at: Date;
  teacher_comment: string;
  file_type: string;
  description: string;
  file_size: number;
}
