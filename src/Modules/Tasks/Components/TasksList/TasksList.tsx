
import { Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical, BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TASKS_URL } from '../../../../Services/URL';
import axiosInstance from '../../../../Services/AxiosInstance';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import Loading from '../../../Shared/Components/Loading/Loading';
import NoData from '../../../Shared/Components/NoData/NoData';
import Pagination from '../../../Shared/Components/Pagination/Pagination';
import debounce from "lodash/debounce";
import ConfirmModal from '../../../Shared/Components/ConfirmModal/ConfirmModal';
import TasksDetails from '../TaskDetails/TasksDetails';
import TaskForm from '../TaskForm/TaskForm';
import type { AddTaskProps } from '../../../../Interfaces/Users.interface';
import type { Task } from '../../../../Interfaces/Tasks.interface';



export default function TasksList() {
const [taskList , setTaskList] = useState<Task[] | null>(null)
const [showTaskDetails , setShowTaskDetails] = useState(false)
const [currentTask , setCurrentTask] = useState<Task | null>(null)
const [currentPage , setCurrentPage] = useState(1)
const [totalPageNumber , setTotalPageNumber] = useState(1)
const [isLoading , setIsLoading] = useState(false)
const [showConfirmModal , setShowConfirmModal] = useState(false)
const [seletedTaskId , setSelectedTaskId] = useState< number | null>(null)
const [searchQuery , setSearchQuery] = useState("")
const [showTaskForm , setShowTaskForm] = useState(false)
const [taskFormtitle , setTaskFormTitle] = useState("")




const fetchTasks = useCallback( async function(){

  try {
    const options = {
      url:TASKS_URL.GET_ALL_MY_TASKS_FOR_MANAGER(10 , currentPage),
      method: 'GET',
    }
    

const {data } = await axiosInstance.request(options)
    
       setTaskList(data.data)
       setTotalPageNumber(data.totalNumberOfPages)




    

  } catch (error) {
    if(isAxiosError(error)) {
      toast.error(error.response?.data.message || " Some thing go wrong!")
    }
  }




},[currentPage])




useEffect(()=>{
fetchTasks()
},[currentPage,fetchTasks])







const deletTask = useCallback(  async function deleteProject(taskId:number){

     setIsLoading(true)
    const toastId = toast.loading("Deleting Underprocessing ....")

try {
  const options = {
    url: TASKS_URL.DELETE_TASK_BY_ID(taskId),
    method:"DELETE"
  }
  
 await axiosInstance.request(options)
toast.success("Deleting Task Successfully Done ✅")
fetchTasks()


} catch (error) {
  
  if(isAxiosError(error)){
    toast.error(error.response?.data.message || "Some thing go wrong!")
  }
}finally{
  toast.dismiss(toastId)
  setIsLoading(false)
  setShowConfirmModal(false)
}


 },[fetchTasks])




// handleSerachInputBy Title

const debounceSearchByTitle= useMemo(()=>{

  return debounce(() =>{
    if(searchQuery){
      fetchTasks()
    }
  },300)
  


},[fetchTasks,searchQuery])


function handleSearchQuertByTitle(e:React.ChangeEvent<HTMLInputElement>){
setSearchQuery(e.target.value)
setCurrentPage(1)
debounceSearchByTitle()
}





// clean up search function

useEffect(()=>{


},[debounceSearchByTitle])



const handleHideTaskForm = useCallback(function (){

   setShowTaskForm(false)
},[]
)





 const handleHideTaskCard = useCallback(function(){
  setShowTaskDetails(false)
},[]) 




const handleCreateNewTask = useCallback( async (dataInfo:AddTaskProps)=>{



  const toastId = toast.loading("Waiting......")



  
try {
  
  const options = {
    url:TASKS_URL.CREATE_TASK_BY_MANAGER,
    method:"POST",
    data:dataInfo
  }

  const {data} = await axiosInstance.request(options)
  console.log(data)
toast.success("New Task Created Successfully")
handleHideTaskForm()
setCurrentPage(1)
   await fetchTasks()
} catch (error) {
  if(isAxiosError(error))
    toast.error("Error creating project")
}finally{
  toast.dismiss(toastId)
  setTimeout(()=>{
    handleHideTaskCard()
  },1500)
}





},[handleHideTaskCard,fetchTasks,handleHideTaskForm])



const handleUpdateCurrentTask = useCallback( async (dataInfo:AddTaskProps)=>{



  if(!currentTask) return 

  // prevent callapi if no change happen
if(dataInfo.title === currentTask.title && dataInfo.description === currentTask.description && dataInfo.employeeId.toString() === currentTask.employee.id.toString()
&& dataInfo.projectId.toString() === currentTask.project.id.toString()

){
  handleHideTaskForm()
  return
}



  const toastId = toast.loading("Waiting......")

try {
  
  const options = {
    url:TASKS_URL.UPDATE_TASK_BY_MANAGER(currentTask.id),
    method:"PUT",
    data:dataInfo,
  }

 await axiosInstance.request(options)
 fetchTasks()
toast.success("Task Updated Successfully 👌")

} catch (error) {
  if(isAxiosError(error))
    toast.error("Error creating Task")
}finally{
  toast.dismiss(toastId)
  setTimeout(()=>{
    handleHideTaskForm()
  },1500)
}





},[currentTask,fetchTasks,handleHideTaskForm])















// handle functions 
function handleHideConfirmModal(){
  setShowConfirmModal(false)
}









if(!taskList) return <Loading/>

  return (
    <div>
{showTaskDetails && currentTask && <TasksDetails currentTask={currentTask} handleHideTaskCard={handleHideTaskCard}/>
}

{showConfirmModal && seletedTaskId && <ConfirmModal onClose={handleHideConfirmModal} selectedId={seletedTaskId} show={showConfirmModal} isLoading={isLoading} onConfirm={deletTask}/>}

{showTaskForm && <TaskForm handleCreateNewTask={handleCreateNewTask} handleUpdateCurrentTask={handleUpdateCurrentTask} taskFormtitle={taskFormtitle} handleHideTaskForm={handleHideTaskForm} currentTask={currentTask!}/>}


      <div className="project-header px-2 rounded-2 d-flex justify-content-between align-items-center flex-wrap gap-2">
       <h2>Tasks</h2>
       <button onClick={()=>{
        
        setTaskFormTitle("Add a New Task")
        setCurrentTask(null)
        setShowTaskForm(true)
       }} className="custom-btn"> + Add New Task</button>
      </div>

<div className="filter-box my-4 position-relative">
  <i className="fa-brands fa-searchengin position-absolute start-0 top-50 translate-middle-y ms-3"></i>
  <input value={searchQuery} onChange={handleSearchQuertByTitle} className="form-control px-5" type="search"  placeholder="Search By Title"/>
</div>
{/*  table to display projects */}

<table className="table table-responsive text-center">
  <thead>
    <tr  >
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Title</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Status</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>User</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Email</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Project</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Created Date</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Action</th>
    </tr>
  </thead>
  <tbody>
 {taskList.length > 0 ?taskList.map((task:Task)=> <tr key={task.id}>


  <td className='text-capitalize'>{task.title}</td>
  <td style={{backgroundColor:"#315951E5" ,color:"white",borderRadius:20}}>{task.status}</td>
  <td>{task.employee.userName}</td>
  <td>{task.employee.email}</td>
  <td>{task.project.title}</td>
  <td>{new Date(task.creationDate).toLocaleTimeString()}</td>
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
        <Dropdown.Item onClick={()=>{setCurrentTask(task)
          setShowTaskDetails(true)

        }} >
          <BsEye className="me-2 text-success" />
          View
        </Dropdown.Item>

        

 

 {/* edit btn */}
        <Dropdown.Item onClick={()=>{
          setCurrentTask(task)
          setTaskFormTitle(`Update ${task.title}`)
          setShowTaskForm(true)
        }} >
          <BsPencil className="me-2 text-primary" />
          Edit
        </Dropdown.Item>

{/* delet btn */}
      <Dropdown.Item disabled={isLoading}  onClick={()=>{
        setSelectedTaskId(task.id)
        setShowConfirmModal(true)
      }}>
          <BsTrash className="me-2 text-danger" />
          Delete
        </Dropdown.Item>



      </Dropdown.Menu>
    </Dropdown>


  </td>
 </tr>):<NoData message='No Tasks Found'/>}
  </tbody>
</table>

{totalPageNumber > 1 && <Pagination currentPage={currentPage} totalPages={totalPageNumber} onPageChange={setCurrentPage}/>}

    </div>
  )
}
