import { useEffect } from "react"
import logo from "../../../../assets/images/navlogo.png"
import avatar from "../../../../assets/images/th.jpeg"
import { baseURL } from "../../../../Services/URL"
import styles from "./Navbar.module.css"
import { useAuth } from "../../../../Hooks/useAuth"
export default function NavBar() {
 const {fetchUser,userInfo} = useAuth()




useEffect(()=>{

fetchUser()

},[fetchUser])







  if(!userInfo) return ""
  return (
    <nav className={`${styles.customFixedPosition} position-fixed top-0 start-0 end-0 p-2 shadow bg-white`} style={{zIndex:1000}}>
      <div className="row align-items-center">
        <div className="col-sm-2 logo">
          <img style={{width:150}} src={logo} alt="logo of pms" />
        </div>
        <div className="col-sm-10 d-flex justify-content-end gap-2 align-items-center">
          <div className="alert position-relative border-1 border-end">
            <i className="fa-solid fa-bell text-success"></i>
            <span style={{backgroundColor:"#EF9B28",width:20,height:20 ,display:"flex"}} className="position-absolute top-0 text-success rounded-circle justify-content-center align-items-center">1</span>
          </div>
          <div className="avatar">
            <img className="rounded-circle" style={{width:25}} src={userInfo.imagePath ? `${baseURL}/${userInfo.imagePath}`:avatar} alt="Avatar img" />
          </div>
          <div className="login-data">
            <h5 className="h6 mb-0">{userInfo.userName}</h5>
            <p className="fw-light">{userInfo.email}</p>
          </div>
        </div>
      </div>

    </nav>
  )
}
