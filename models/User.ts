export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
  avatar?: string;
  department?: string;
  position?: string;
  skills?: string[];
  projects?: string[];
  createdAt: Date;
  updatedAt: Date;
}