import type { Member } from "./Member";
import type { Task } from "./Task";

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  createBy: string;
  status: string;
  members: Member[];
  tasks: Task[];
}
