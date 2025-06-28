
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
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { useAuth } from '../../../../Hooks/useAuth';



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
const [status , setStatus] = useState("")
const {isEmployee} = useAuth()
const navigate = useNavigate()

const fetchTasks = useCallback( async function(){

  try {
    const options = {
      url:TASKS_URL.GET_ALL_TASKS_FOR_MANAGER_FOR_FILTER(5,currentPage,searchQuery,status),
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




},[currentPage,searchQuery,status])




useEffect(() => {
  const runEffect = async () => {
    if (isEmployee) {
      navigate("/dashboard");
    } else {
      await fetchTasks();
    }
  };

  runEffect();
}, [currentPage, fetchTasks, isEmployee, navigate]);






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
  },100)
  


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




const handleCreateNewTask = useCallback( async function(dataInfo:AddTaskProps){



  const toastId = toast.loading("Waiting......")



  
try {
  
  const options = {
    url:TASKS_URL.CREATE_TASK_BY_MANAGER,
    method:"POST",
    data:dataInfo
  }

   await axiosInstance.request(options)
toast.success("New Task Created Successfully")
   await fetchTasks()
} catch (error) {
  if(isAxiosError(error))
    toast.error("Error creating project")
}finally{
  toast.dismiss(toastId)
  setTimeout(()=>{
    handleHideTaskForm()
  },1000)
}





},[fetchTasks,handleHideTaskForm])



const handleUpdateCurrentTask = useCallback( async (dataInfo:AddTaskProps)=>{



  if(!currentTask) return 

  // prevent callapi if no change happen
if( currentTask && currentTask.project.id && dataInfo.title === currentTask.title && dataInfo.description === currentTask.description && dataInfo.employeeId.toString() === currentTask.employee.id.toString()
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



const handleFilterByStatus = useCallback( function(e:React.ChangeEvent<HTMLSelectElement>){
 const value = e.target.value
setStatus(value)

},[])





if(!taskList) return <Loading/>

  return (

<>
  <Helmet>
    <title>Tasks List | Project Management</title>
    <meta name="description" content="Browse, filter, and manage tasks for your projects." />
  </Helmet>

  <main role="main" className="container">
    {showTaskDetails && currentTask && (
      <TasksDetails currentTask={currentTask} handleHideTaskCard={handleHideTaskCard} />
    )}

    {showConfirmModal && seletedTaskId && (
      <ConfirmModal
        onClose={handleHideConfirmModal}
        selectedId={seletedTaskId}
        show={showConfirmModal}
        isLoading={isLoading}
        onConfirm={deletTask}
      />
    )}

    {showTaskForm && (
      <TaskForm
        handleCreateNewTask={handleCreateNewTask}
        handleUpdateCurrentTask={handleUpdateCurrentTask}
        taskFormtitle={taskFormtitle}
        handleHideTaskForm={handleHideTaskForm}
        currentTask={currentTask!}
      />
    )}

    <header className="project-header px-2 rounded-2 d-flex justify-content-between align-items-center flex-wrap gap-2 mt-2">
      <h1>Tasks</h1>
      <button
        onClick={() => {
          setTaskFormTitle("Add a New Task");
          setCurrentTask(null);
          setShowTaskForm(true);
        }}
        className="custom-btn"
        aria-label="Add a new task"
      >
        + Add New Task
      </button>
    </header>

    <section className="filter-box row gap-3 justify-content-center align-items-center" aria-label="Task Filters">
      <div className="filter-name my-4 position-relative col-md-7">
        <label htmlFor="taskSearch" className="visually-hidden">
          Search Tasks by Title
        </label>
        <i className="fa-brands fa-searchengin position-absolute start-0 top-50 translate-middle-y ms-3" aria-hidden="true"></i>
        <input
          id="taskSearch"
          value={searchQuery}
          onChange={handleSearchQuertByTitle}
          className="form-control px-5"
          type="search"
          placeholder="Search By Title"
          aria-label="Search Tasks by Title"
        />
      </div>

      <div className="filter-status my-4 position-relative col-md-2">
        <label htmlFor="statusFilter" className="visually-hidden">
          Filter by Status
        </label>
        <select
          id="statusFilter"
          className="form-control"
          defaultValue={status}
          onChange={handleFilterByStatus}
          aria-label="Filter by task status"
        >
          <option disabled value=""> Filter By Status</option>
          <option value=""> All Status</option>
          <option value="ToDo">ToDo</option>
          <option value="InProgress">InProgress</option>
          <option value="Done"> Done</option>
        </select>
      </div>
    </section>

    <section aria-label="Task Table">
      <div className="table-responsive">
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">User</th>
              <th scope="col">Email</th>
              <th scope="col">Project</th>
              <th scope="col">Created Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {taskList.length > 0 ? (
              taskList.map((task) => (
                <tr key={task.id}>
                  <td className="text-capitalize">{task.title}</td>
                  <td style={{ backgroundColor: "#315951E5", color: "white", borderRadius: 20 }}>{task.status}</td>
                  <td>{task.employee.userName}</td>
                  <td>{task.employee.email}</td>
                  <td>{task.project.title}</td>
                  <td>{new Date(task.creationDate).toLocaleDateString()}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle as="button" className="btn btn-link p-0 border-0" id="dropdown-custom-button" aria-label="Task actions menu">
                        <BsThreeDotsVertical />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="shadow-sm rounded-3">
                        <Dropdown.Item onClick={() => { setCurrentTask(task); setShowTaskDetails(true); }}>
                          <BsEye className="me-2 text-success" /> View
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => { setCurrentTask(task); setTaskFormTitle(`Update ${task.title}`); setShowTaskForm(true); }}>
                          <BsPencil className="me-2 text-primary" /> Edit
                        </Dropdown.Item>
                        <Dropdown.Item disabled={isLoading} onClick={() => { setSelectedTaskId(task.id); setShowConfirmModal(true); }}>
                          <BsTrash className="me-2 text-danger" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className='text-center' colSpan={7}><NoData message="No Tasks Found" /></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>

    {totalPageNumber > 1 && (
      <nav aria-label="Task Pagination">
        <Pagination currentPage={currentPage} totalPages={totalPageNumber} onPageChange={setCurrentPage} />
      </nav>
    )}
  </main>
</>

  )
}
