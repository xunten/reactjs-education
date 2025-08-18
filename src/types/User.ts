
export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  imageUrl?: string;
  roles: string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
