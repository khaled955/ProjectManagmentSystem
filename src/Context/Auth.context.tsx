/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthContextProps, UserTokenPayload } from "../Interfaces/Interfaces";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextProps | null>(null)

 function AuthContextProvider({children}:{children:ReactNode}){
const [token , setToken] = useState<string | null>(()=>localStorage.getItem("userToken"))

return <AuthContext.Provider value={{token , setToken}}>

    {children}
</AuthContext.Provider>

    
}




 function useAuth(){
  const {token,setToken} =  useContext(AuthContext)!
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




return {token,setToken,tokenDecoded , isEmployee ,logOut}


}


export {useAuth , AuthContextProvider}

