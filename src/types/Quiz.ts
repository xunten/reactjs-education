export interface Quiz {
  id: number;
  title: string;
  classId: number;
  className?: string;
  dueDate: Date;
  maxScore: number;
}
