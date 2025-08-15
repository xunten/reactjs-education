export interface Schedule {
  id: number;
  classId: number;
  className: string;
  dayOfWeek: string;
  startTime: Date;
  endTime: Date;
}
