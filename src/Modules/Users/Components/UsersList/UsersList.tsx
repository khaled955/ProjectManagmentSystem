
import { Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical, BsEye } from 'react-icons/bs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AUTHENTICATION_URL, baseURL } from '../../../../Services/URL';
import axiosInstance from '../../../../Services/AxiosInstance';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import Loading from '../../../Shared/Components/Loading/Loading';
import NoData from '../../../Shared/Components/NoData/NoData';
import Pagination from '../../../Shared/Components/Pagination/Pagination';
import debounce from "lodash/debounce";
import type { PaginatedUserResponse, User } from '../../../../Interfaces/Users.interface';
import UserDetails from '../UserDetails/UserDetails';
import avatar from "../../../../assets/images/th.jpeg"
import ConfirmModal from '../../../Shared/Components/ConfirmModal/ConfirmModal';


export default function UsersList() {
const [usersList , setUsersList] = useState< PaginatedUserResponse| null>(null)
const [showUserDetails , setShowUserDetails] = useState(false)
const [currentUser , setCurrentUser] = useState<User | null>(null)
const [currentPage , setCurrentPage] = useState(1)
const [totalPageNumber , setTotalPageNumber] = useState(1)
const [isLoading , setIsLoading] = useState(false)
const [showConfirmModal , setShowConfirmModal] = useState(false)
const [seletedUserId , setSelectedUserId] = useState< number | null>(null)
const [searchQueryByName , setSearchQueryByName] = useState("")
const [alertMessage , setAlertMessage] = useState("")
const [btnText , setBtnText] = useState("")
const [successMsg , setSuccessMsg] = useState("")
const [groupsValue , setGroupsValue] = useState(1)



// fetch users

const fetchUsers = useCallback( async function(){
  try {
    const options = {
      url:AUTHENTICATION_URL.GET_ALL_USERS(5,currentPage,searchQueryByName,groupsValue),
      method:"GET",

    }
    
    const {data } = await axiosInstance.request(options)
    console.log(data.data)
       setUsersList(data)
       setTotalPageNumber(data.totalNumberOfPages)


  } catch (error) {
    if(isAxiosError(error)) {
      toast.error(error.response?.data.message || " Some thing go wrong!")
    }
  }




},[currentPage,searchQueryByName,groupsValue])

useEffect(()=>{
fetchUsers()
},[currentPage,fetchUsers])




const toggleUser = useCallback(  async function blockUser(userId:number){

     setIsLoading(true)
    const toastId = toast.loading("Waiting ....")

try {
  const options = {
    url: AUTHENTICATION_URL.TOGGLE_USER_BY_ID(userId),
    method:"PUT"
  }
  
 await axiosInstance.request(options)
toast.success(successMsg)
fetchUsers()


} catch (error) {
  
  if(isAxiosError(error)){
    toast.error(error.response?.data.message || "Some thing go wrong!")
  }
}finally{
  toast.dismiss(toastId)
  setIsLoading(false)
  setShowConfirmModal(false)
}


 },[fetchUsers,successMsg])




// handleSerachInputBy Name
const debounceSearchByUserName= useMemo(()=>{

  return debounce(() =>{
    if(searchQueryByName){
      fetchUsers()
    }

  },300)
  


},[fetchUsers,searchQueryByName])


function handleSearchQuertByName(e:React.ChangeEvent<HTMLInputElement>){
setSearchQueryByName(e.target.value)
setCurrentPage(1)
debounceSearchByUserName()
}

// clean up search function

useEffect(()=>{
return ()=> debounceSearchByUserName.cancel()

},[debounceSearchByUserName])





const handlesetGroupValue= useCallback(function(e:React.ChangeEvent<HTMLSelectElement>){
  const value = e.target.value
setGroupsValue(+value)
},[])













function handleHideConfirmModal(){
  setShowConfirmModal(false)
}


function handleHideUserCard(){
  setShowUserDetails(false)
}







if(!usersList) return <Loading/>

  return (
    <div>
{showUserDetails && currentUser && <UserDetails currentUser={currentUser} handleHideUserCard={handleHideUserCard}/>
}

{/* block modal */}

{showConfirmModal && seletedUserId && <ConfirmModal onClose={handleHideConfirmModal} selectedId={seletedUserId} show={showConfirmModal} isLoading={isLoading} onConfirm={toggleUser} message={alertMessage} btnText={btnText}/>}



      <div className="project-header px-2 rounded-2 d-flex justify-content-between align-items-center flex-wrap gap-2">
       <h2>Users</h2>
      
      </div>

<div className="filter-box my-4 position-relative row gap-3 justify-content-center align-items-center">
  {/* search by name input */}
 <div className="name-search position-relative col-md-8">
    <i className="fa-brands fa-searchengin position-absolute start-0 top-50 translate-middle-y ms-3"></i>
  <input value={searchQueryByName} onChange={handleSearchQuertByName} className="form-control px-5" type="search"  placeholder="Search By Name"/>
 </div>

{/* role input */}
 <div className="role-search position-relative col-md-2">
<select className='rounded-3 px-2 py-1' onChange={handlesetGroupValue} value={groupsValue}>
<option value="1">Manager</option>
<option value="2">Employee</option>

</select>
 </div>









</div>
{/*  table to display users */}

<table className="table table-responsive text-center">
  <thead>
    <tr  >
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>UserName</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Status</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Image</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Phone Number</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Email</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Country</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Created Date</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Action</th>
    </tr>
  </thead>
  <tbody className='text-center align-middle'>
 {usersList.data.length > 0 ?usersList.data.map((user:User)=> <tr key={user.id}>
  <td className='text-capitalize'>{user.userName}</td>
  <td style={{backgroundColor:"#315951E5" ,color:"white",borderRadius:20}}>{user.isActivated ?"Active":"InActive"}</td>
  <td>
    <img className='rounded-circle' width={40}  height={40} src={ user.imagePath ?`${baseURL}/${user.imagePath}` : avatar} alt="user-photo" />
  </td>
  <td>{user.phoneNumber}</td>
  <td>{user.email}</td>
  <td>{user.country}</td>
  <td>{new Date(user.creationDate).toLocaleTimeString()}</td>
  <td> 
<Dropdown>
      <Dropdown.Toggle
        as="button"
        className="btn btn-link p-0 border-0"
        id="dropdown-custom-button"
      >
        <BsThreeDotsVertical />
      </Dropdown.Toggle>

      <Dropdown.Menu className="shadow-sm rounded-3">

{/*  view btn */}
        <Dropdown.Item onClick={()=>{setCurrentUser(user)
          setShowUserDetails(true)

        }} >
          <BsEye className="me-2 text-success" />
          View
        </Dropdown.Item>

        

 



{/* block btn */}
      <Dropdown.Item disabled={isLoading}  onClick={()=>{
        setSelectedUserId(user.id)
        setShowConfirmModal(true)
        setAlertMessage(user.isActivated ?"Are You Want To Block The User":"Are You Want To Unblock The User")
        setBtnText(user.isActivated ?"Block":"Unblock")
        setSuccessMsg(user.isActivated ?"User Blocked Successfully ✅":"User Unblocked Successfully 👌")
      }}>
        {user.isActivated ?<i className="fa-solid fa-ban me-1"></i> :<i className="fa-solid fa-lock-open me-1"></i>}
          {user.isActivated ? "Block" :"Unblock"}
        </Dropdown.Item>



      </Dropdown.Menu>
    </Dropdown>


  </td>
 </tr>):<NoData message="No Users Found"/>}
  </tbody>
</table>

{usersList.totalNumberOfPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPageNumber} onPageChange={setCurrentPage}/>}

    </div>
  )
}
