export interface SchedulePattern {
  id: number;
  classId: number;
  dayOfWeek: number;     
  startTime: string;     
  endTime: string;       
  userId: number;         
  location: string;
}

// Khi tạo pattern mới
export interface SchedulePatternCreateDTO {
  classId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  userId: number;
  location: string;
}

export interface SchedulePatternUpdateDTO {
  patterns: SchedulePatternCreateDTO[];
}

// Khi update nhiều pattern cùng lúc
export interface SchedulePatternSingleUpdateDTO {
  id: number;
  dayOfWeek?: number;
  startTime?: string;
  endTime?: string;
  userId?: number;
  location?: string;
}

// Buổi học thực tế
export interface ScheduleSession {
  id: number;
  classId: number;
  startTime: string; 
  endTime: string;
  userId: number;
  location: string;
}

export type ClassScheduleSessionResponseDTO = ScheduleSession;
