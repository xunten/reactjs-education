export interface Attendance {
  id: number;
  studentId: number;
  studentName?: string;
  fullName: string;
  scheduleId?: number;
  className: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  markedAt: string;
}
