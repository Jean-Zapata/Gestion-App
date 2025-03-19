export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on_hold' | 'cancelled';
  startDate: Date;
  endDate: Date;
  progress: number;
  priority: 'low' | 'medium' | 'high';
  budget?: number;
  managerId: string;
  teamMembers: string[];
  createdAt: Date;
  updatedAt: Date;
}