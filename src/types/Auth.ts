export interface Credentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    fullName: string;
    roles: string[];
  };
}
