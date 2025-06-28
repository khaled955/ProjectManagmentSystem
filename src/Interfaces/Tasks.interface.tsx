import type { Project } from "./Project.interface";
import type { User } from "./Users.interface";




export interface Manager {
  id: number;
  userName: string;
  imagePath: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: string | null;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}








export interface AddTaskProps{
  title: string ,
  description: string,
   employeeId: string | number,
  projectId: string | number,
}







export interface PaginatedTaskResponse {
  pageNumber: number;
  pageSize: number;
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
  data: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  employee: User;
  project:Project;
}









export interface TaskFormProps {
  taskFormtitle: string;
  currentTask?: Task;
  handleHideTaskForm: () => void;
  handleCreateNewTask: (data: AddTaskProps) => Promise<void>;
  handleUpdateCurrentTask: (data: AddTaskProps) => Promise<void>;
}





export interface TaskPropForDrag{
   id: number;
  title: string;
  description: string;
  status: string;
}

export  interface CoulmnPropsForDrag {
  id:"ToDo" | "InProgress" |"Done";
  title:"ToDo" | "InProgress" |"Done";
}


