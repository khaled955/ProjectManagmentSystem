import type { ReactNode } from "react";

interface Group {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

 export interface UserInfo {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  country: string;
  creationDate: string;
  modificationDate: string;
  isActivated: boolean;
  imagePath: string | null;
  group: Group;
}




export interface DisplayProfileProps {
  userInfo: UserInfo;
  children: ReactNode;
  showUpdateModal: boolean;
  handleShowUpdateModal: () => void;
}



export interface UpdateProfileProps {
  onClose: () => void;

}