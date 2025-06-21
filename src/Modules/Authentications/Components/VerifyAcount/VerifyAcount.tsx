


import { useForm } from "react-hook-form"
import photo from "../../../../assets/images/th.jpeg"
import {EMAIL_VALIDATION} from "../../../../Services/Validation"
import type { FormInfoVerifyProps } from "../../../../Interfaces/Interfaces"
import { useState } from "react"
import toast from "react-hot-toast"
import { isAxiosError } from "axios"
import {AUTHENTICATION_URL} from "../../../../Services/URL"
import axiosInstance from "../../../../Services/AxiosInstance"
import { useLocation, useNavigate } from "react-router-dom"



export default function VerifyAcount() {
const [errorMessage , setErrorMessage] = useState< string | null>(null)
const navigate = useNavigate()
const location = useLocation()
const {handleSubmit , register ,formState:{errors , isSubmitting} } = useForm<FormInfoVerifyProps>({mode:"onChange",defaultValues:{email:location.state.email}})



 async function verificationAccount(info:FormInfoVerifyProps){
const toastId = toast.loading("Waiting....")

try {
const options = {
  url:AUTHENTICATION_URL.VERIFY_ACCOUNT,
  method: "PUT",
  data:info,
}
const {data} = await axiosInstance.request(options)
console.log(data)
if(data.message === "Account verified successfully"){
  setErrorMessage(null)
  toast.success( data.message || "Account created successfully. A verification code has been sent to your email address.")
  setTimeout(()=>{
navigate("/login")
  },2000)
}
  
} catch (error) {
  if(isAxiosError(error)){
    toast.error(error?.response?.data.message || "Some thing go Wrong!")
    setErrorMessage(error.response?.data.message || "Some Thing Go Wrong!")
  }


}finally{
  toast.dismiss(toastId)
}




}












  return (
    <div className=" rounded-2 py-2 px-4">
      <div className="text mt-3">
        <p style={{fontSize:10}} className=" mb-0 text-white">Welcome to PMS</p>
        <h3 style={{color:"#EF9B28"}} className="h4 fw-bold">Verify-Account</h3>
      </div>
      <div className="img text-center">
        <img style={{width:60}} className=" rounded-circle" src={photo} alt="personal-photo" />
      </div>
      <form className="row mt-2 py-3" onSubmit={handleSubmit(verificationAccount)}>

        
<div  className="col-md-8">


  {/*  Email input */}
   <div className="mb-3">
<label style={{color:"#EF9B28"}} className="d-block" htmlFor="email">E-mail</label>
<input
{...register("email" , {required:"Email Is Required" , pattern:{
  value:EMAIL_VALIDATION,
  message:"Email Must Be Valid"
}})}
style={{outline:0,width:"100%"}} type="text"  id="email" className="border-0 border-1 border-bottom bg-transparent p-1" placeholder="Enter Your Email"/>
{errors.email && <p className="text-white" style={{fontSize:12}}>{errors.email.message}</p>}

     </div>



  {/*  OTP Input */}
     <div className="mb-3">
<label style={{color:"#EF9B28"}} className="d-block" htmlFor="otp">OTP Validation</label>
<input
{...register("code",{required:"OTP Is Required",minLength:{
    value:4,
    message:"OTP Must Be  4 Characters Long"
   },maxLength:{
    value:4,
    message:"OTP Only 4 Characters Long"
   }})}



style={{outline:0,width:"100%"}} type="text"  id="userName" className="border-0 border-1 border-bottom bg-transparent p-1" placeholder="Enter Your Name"/>
{errors.code && <p className="text-white" style={{fontSize:12}}>{errors.code.message}</p>}
     </div>



</div>



{errorMessage && <p className="text-center text-white mt-2">{errorMessage}</p>}
 <button disabled={isSubmitting} className="auth-btn mt-3"> {isSubmitting ? <i className="fa-solid fa-spinner fa-spin"></i> :"Save"}</button>
      </form>
    </div>
  )
}
