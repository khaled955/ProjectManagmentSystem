import { Outlet } from "react-router-dom";
import styles from "./AuthLayOut.module.css"
import logo from "../../../../assets/images/logo.png"
export default function AuthLayOut() {
  return (
   <>
   <div className={`container-fluid ${styles.authContainer} row justify-content-center overflow-y-auto `}>

 
    <div className="form-container col-md-6 h-100">
      <div className="logo text-center">
        <img style={{width:150}} src={logo} alt="logo of project managment system" />
      </div>
   <div style={{backgroundColor:"#2d4855"}} className="rounded-2">
       <Outlet/>
   </div>
    </div>
   </div>
   </>
  )
}
