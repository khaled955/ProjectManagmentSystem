import { useAuth } from "../../../../Context/Auth.context"
import styles from "./Header.module.css"
export default function Header({headerText="Hello From Header Component"}:{headerText:string}) {
  const {tokenDecoded} = useAuth()
  return (
    <div className={`${styles.headerContainer}`}>
      <h2 className="text-white">Welcome <span style={{color:"#EF9B28"}}>{tokenDecoded?.userName}</span></h2>
       <p className="text-white text-capitalize">{headerText}</p>



    </div>
  )
}
