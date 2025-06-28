import type { UserInfo } from "./Profile.interface";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number; // optional, defaults to 8
}


export interface  FormInfo {
  userName:string;
  email:string;
  password:string;
  country:string;
  phoneNumber:string;
  confirmPassword:string;
    profileImage:File | null


}



export interface FormInfoVerifyProps{
  email:string;
  code:string;
}


export interface FormLoginProps {
  email:string;
  password:string;
}


export interface FormForgetProps {
  email:string;
}


export interface ResetFormInfo{
  email:string;
  password:string;
  confirmPassword:string;
  seed:string;
}


export interface ChangePassInfoProps {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
}



// Auth Context interface

export interface AuthContextProps {
  token:string| null ;
  setToken:(token:string|null)=>void;
userInfo:UserInfo | null;
fetchUser:()=>Promise<void>;
updateProfileInfo: (info: ProfileData, onSuccess?: () => void) => Promise<void>;
errorMessage:string | null
}

export interface UserTokenPayload {
  exp: number;
  iat: number;
  roles: string[];
  userEmail: string;
  userGroup: string;
  userId: number;
  userName: string;
}







export interface  ProfileData {
  userName:string;
  email:string;
  country:string;
  phoneNumber:string;
  confirmPassword:string;
profileImage:undefined


}