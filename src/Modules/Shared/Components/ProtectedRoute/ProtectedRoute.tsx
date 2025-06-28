import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../../Hooks/useAuth";

export default function ProtectedRoute({children}:{children:ReactNode}) {
  const {token} = useAuth()


if(token){
  return children
}else{
   return <Navigate to="/"/>
}

}
