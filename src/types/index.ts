export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed";
  subtasks: string[]; // ✅ always defined
}