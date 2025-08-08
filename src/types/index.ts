// User.ts
export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  roles: string[];
  isActive?: boolean;
}

// Class.ts
export interface Class {
  id: number;
  className: string;
  schoolYear: number;
  semester: string;
  teacherId: number;
  teacherName?: string;
}

// Assignment.ts
export interface Assignment {
  id: number;
  title: string;
  classId: number;
  dueDate: Date;
  maxScore: number;
  className?: string;
}

// Submission.ts
export interface Submission {
  id: number;
  assignmentId: number;
  assignmentTitle?: string;
  studentId: number;
  studentName?: string;
  status: 'SUBMITTED' | 'GRADED' | 'PENDING';
  score?: number;
}

// Quiz.ts
export interface Quiz {
  id: number;
  title: string;
  classId: number;
  className?: string;
  dueDate: Date;
  maxScore: number;
}

// QuizSubmission.ts
export interface QuizSubmission {
  id: number;
  quizId: number;
  quizTitle?: string;
  studentId: number;
  studentName?: string;
  score: number;
  submittedAt: Date;
}

// Attendance.ts
export interface Attendance {
  id: number;
  studentId: number;
  studentName?: string;
  scheduleId?: number;
  className: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  date: Date;
}

// ActivityLog.ts
export interface ActivityLog {
  id: number;
  actionType: 'CREATE' | 'UPDATE' | 'DELETE';
  targetTable: string;
  targetId: number;
  description: string;
  classId: number;
  className?: string;
  userId: number;
  userName?: string;
  timestamp: Date;
}
// Schedule.ts
export interface Schedule {
  id: number;
  classId: number;
  className: string;
  dayOfWeek: string;
  startTime: Date;
  endTime: Date;
}
// ClassMaterial.ts
export interface ClassMaterial {
    id: number;
    title: string;
    className: string;
    file_path: string;
    file_type: string;
    createdBy: string;
    created_at: Date;
    updated_at?: Date;
  classID: number;
  downloadCount?: number;
}
// Subject.ts
export interface Subject {
  id: number;
  subject_name: string;
  description: string;
  created_by: number;
  created_at: Date;
  updated_at: Date;
}
