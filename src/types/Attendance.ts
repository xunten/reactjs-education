export interface Attendance {
  id: number;
  studentId: number;
  studentName?: string;
  fullName: string;
  scheduleId?: number;
  className: string;
  status: 'Present' | 'Absent' | 'Late';
  markedAt: string;
}
