export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  projectId: string;
  assignedTo: string[];
  dueDate: Date;
  estimatedHours: number;
  completedAt?: Date;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}