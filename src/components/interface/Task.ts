export interface Task {
  id: string;
  title: string;
  description: string;
  status: string; // nếu status có enum (TO_DO, DONE, …) thì mình có thể union type
  assigneeId: string;
  deadline: string;
}

// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   status: string; // nếu status có enum (TO_DO, DONE, …) thì mình có thể union type
//   assigneeId: string;
//   startDate: string;
//   endDate: string;
// }
