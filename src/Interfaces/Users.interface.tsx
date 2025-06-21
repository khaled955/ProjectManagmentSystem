export interface User {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}

export interface PaginatedUserResponse {
  pageNumber: number;
  pageSize: number;
  data: User[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}



 export interface UserDetailsProps {
  currentUser: User;
  handleHideUserCard: () => void;
}



export interface AddTaskProps{
 title: string,
  description: string,
  employeeId: string | number,
  projectId: string | number,

}