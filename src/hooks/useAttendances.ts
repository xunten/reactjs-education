import { useQuery } from '@tanstack/react-query';
import attendanceApi from '../api/attendanceApi';
import type { Attendance } from '../types/Attendance';

export const useAttendances = (classId?: number, studentId?: number, scheduleId?: number) => {
  return useQuery<Attendance[], Error>({
    queryKey: ['attendances', { classId, studentId, scheduleId }],
    queryFn: () => attendanceApi.getAllWithFilters(classId, studentId, scheduleId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAttendancesBySchedule = (scheduleId: number) => {
  return useQuery<Attendance[], Error>({
    queryKey: ['attendances', scheduleId],
    queryFn: () => attendanceApi.getByScheduleId(scheduleId),
    enabled: !!scheduleId, // chỉ fetch khi scheduleId có giá trị
    staleTime: 1000 * 60 * 5,
  });
};