import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../../../Hooks/useAuth"

export default function GusetRout({children}:{children:ReactNode}) {
  const {token} = useAuth()


if(token){
   return <Navigate to="/dashboard"/>
}else{
  return children
}

}
