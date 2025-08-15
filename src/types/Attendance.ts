export interface Attendance {
  id: number;
  studentId: number;
  studentName?: string;
  scheduleId?: number;
  className: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  date: Date;
}
