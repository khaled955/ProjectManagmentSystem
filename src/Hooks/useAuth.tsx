import { useContext } from "react";
import { AuthContext } from "../Context/Auth.context";
import { useNavigate } from "react-router-dom";
import type { UserTokenPayload } from "../Interfaces/Interfaces";
import { jwtDecode } from "jwt-decode";

 
 function useAuth(){
  const {token,setToken,fetchUser,updateProfileInfo,userInfo ,errorMessage} =  useContext(AuthContext)!
   const navigate = useNavigate()
  let tokenDecoded;
if(token){
     tokenDecoded = jwtDecode<UserTokenPayload>(token)
    
}

const isEmployee = tokenDecoded?.roles[3] === "Employee"

function logOut(){
  setToken(null)
  localStorage.removeItem("userToken")
  navigate("/")
}



return {token,setToken,tokenDecoded , isEmployee ,logOut,fetchUser,updateProfileInfo,userInfo,errorMessage}


}


export {useAuth}