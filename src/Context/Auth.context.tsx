/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useState, type ReactNode } from "react";
import type { AuthContextProps, ProfileData} from "../Interfaces/Interfaces";
import type { UserInfo } from "../Interfaces/Profile.interface";
import axiosInstance from "../Services/AxiosInstance";
import { AUTHENTICATION_URL } from "../Services/URL";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext<AuthContextProps | null>(null)

 function AuthContextProvider({children}:{children:ReactNode}){
const [token , setToken] = useState<string | null>(()=>localStorage.getItem("userToken"))
const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
const [errorMessage, setErrorMessage] = useState<string | null>(null);


// fetch user data


 const fetchUser = useCallback( async function () {
      try {
        const { data } = await axiosInstance.get(AUTHENTICATION_URL.GET_CURRENT_USER);
        setUserInfo(data);
      } catch (error) {
        if (isAxiosError(error)) toast.error(error?.response?.data.mesage || "Some Thing Go Wrong");
      }
    },[]
  )



// convert data into formdata 
 const convertDataIntoFormData = useCallback(     function(data:ProfileData){

const formData = new FormData()
formData.append("userName",data.userName)
formData.append("email",data.email)
formData.append("confirmPassword",data.confirmPassword)
formData.append("country",data.country)
formData.append("phoneNumber",data.phoneNumber)
if(data.profileImage){
  formData.append("profileImage",data.profileImage)

}

return formData

},[]


 )







// update user data



const updateProfileInfo: AuthContextProps["updateProfileInfo"] = useCallback(
  async function (info, onSuccess) {
    const toastId = toast.loading("Waiting....");

    const formData = convertDataIntoFormData(info);

    try {
      const { data } = await axiosInstance.put(
        AUTHENTICATION_URL.UPDATE_PROFILE,
        formData
      );
      toast.success(data.message || "Profile updated successfully");

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 3000);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data.message || "Something went wrong!");
        setErrorMessage(error.response?.data.message || "Something went wrong!");
      }
    } finally {
      toast.dismiss(toastId);
    }
  },
  [convertDataIntoFormData]
);



return <AuthContext.Provider value={{token,fetchUser,setToken,updateProfileInfo,userInfo,errorMessage}}>

    {children}
</AuthContext.Provider>

    
}






export { AuthContextProvider}

