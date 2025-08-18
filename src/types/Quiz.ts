export interface Quiz {
  id: number;
  title: string;
  description?: string;
  timeLimit: number;
  startDate: Date;
  endDate: Date;
  classId: number;
  className?: string;
  createdBy: number;
  grade: string;
  subject: string;
}
