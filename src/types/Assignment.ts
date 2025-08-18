export interface Assignment {
  id: number;
  title: string;
  classId: number;
  className: string; 
  dueDate: string;
  maxScore: number;
}
// DTO để tạo bài tập mới
export interface AssignmentCreateDTO {
  title: string;
  classId: number;
  dueDate: string;
  maxScore: number;
}

// DTO để cập nhật bài tập (có thể chỉ cập nhật một số trường)
export interface AssignmentUpdateDTO {
  title?: string;
  classId?: number;
  dueDate?: string;
  maxScore?: number;
}