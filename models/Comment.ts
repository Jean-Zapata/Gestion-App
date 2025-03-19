export interface Comment {
  id: string;
  content: string;
  userId: string;
  taskId?: string;
  projectId?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}