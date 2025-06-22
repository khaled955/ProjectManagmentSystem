import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayOut from "./Modules/Shared/Components/AuthLayout/AuthLayOut"
import Login from "./Modules/Authentications/Components/Login/Login"
import Register from "./Modules/Authentications/Components/Register/Register"
import ForgetPassword from "./Modules/Authentications/Components/ForgetPassword/ForgetPassword"
import ChangePassword from "./Modules/Authentications/Components/ChangePassword/ChangePassword"
import VerifyAcount from "./Modules/Authentications/Components/VerifyAcount/VerifyAcount"
import NotFound from "./Modules/Shared/Components/NotFound/NotFound"
import ResetPassword from "./Modules/Authentications/Components/ResetPassword/ResetPassword"
import Dashboard from "./Modules/Dashboard/Components/Dashboard/Dashboard"
import { Toaster } from "react-hot-toast"
import { AuthContextProvider } from "./Context/Auth.context"
import MasterLayOut from "./Modules/Shared/Components/MasterLayOut/MasterLayOut"
import ProjectList from "./Modules/Project/Components/ProjectList/ProjectList"
import TasksList from "./Modules/Tasks/Components/TasksList/TasksList"
import UsersList from "./Modules/Users/Components/UsersList/UsersList"
import DisplayProfile from "./Modules/Profile/Components/DisplayProfile/DisplayProfile"


function App() {
  
const routes = createBrowserRouter([{path:"/" , element:<AuthLayOut/>,children:[
  {index:true ,element:<Login/>},
  {path:"login" ,element:<Login/>},
  {path:"register" ,element:<Register/>},
  {path:"forget-password" ,element:<ForgetPassword/>},
  {path:"change-password" ,element:<ChangePassword/>},
  {path:"verify-account" ,element:<VerifyAcount/>},
  {path:"reset-password" ,element:<ResetPassword/>},
  {path:"*" ,element:<NotFound/>},
]},

{path:"dashboard" , element:<MasterLayOut/> , children:[
  {index:true , element:<Dashboard/>},
  {path:"users" , element:<UsersList/>},
  {path:"projects" , element:<ProjectList/>},
  {path:"tasks" , element:<TasksList/>},
  {path:"profile" , element:<DisplayProfile/>},
  {path:"*" , element:<NotFound/>},
]}




])





  return (
    <>
    <AuthContextProvider>

   <RouterProvider router={routes}></RouterProvider>

    </AuthContextProvider>
    <div className="position-fixed top-0" style={{zIndex:999999999999}}>
         <Toaster/>

    </div>
    </>
  )
}

export default App
