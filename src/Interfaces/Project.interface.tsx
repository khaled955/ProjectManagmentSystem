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

export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  manager: Manager;
}

export interface PaginatedProjectResponse {
  pageNumber: number;
  pageSize: number;
  data: Project[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}



export interface AddProjectProps{
  title: string ,
  description: string,
}



export interface ProjectFormProps {
  projectFormtitle: string;
  currentProject?: Project;
  handleHideProjectForm: () => void;
  handleCreateNewProject: (data: AddProjectProps) => Promise<void>;
  handleUpdateCurrentProject: (data: AddProjectProps) => Promise<void>;
}