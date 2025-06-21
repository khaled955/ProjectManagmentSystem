import type { TaskFormProps } from "../../../../Interfaces/Tasks.interface"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { isAxiosError } from "axios"
import axiosInstance from "../../../../Services/AxiosInstance"
import { AUTHENTICATION_URL, PROJECTS_URL } from "../../../../Services/URL"
import type { AddTaskProps, User } from "../../../../Interfaces/Users.interface"
import type { Project } from "../../../../Interfaces/Project.interface"

export default function TaskForm({handleCreateNewTask,handleHideTaskForm,handleUpdateCurrentTask,taskFormtitle,currentTask}:TaskFormProps) {
const [usersList , setUsersList] = useState<User[] | []>([])
const [projectsList , setProjectsList] = useState<Project[]| []>([])

const {formState:{isSubmitting,errors},register ,handleSubmit} = useForm<AddTaskProps>({mode:"onChange",defaultValues:{
title:currentTask?.title || "",
description:currentTask?.description || "",
employeeId:currentTask?.employee.id.toString() ,
projectId:currentTask?.project.id.toString(), 

}})





// fetch all Projects
useEffect(()=>{

async function fetchProjects(){

  try {
    const {data} = await axiosInstance.get(PROJECTS_URL.GET_PROJECTS_FOR_TASKS_FORM(10,1))
    setProjectsList(data.data)
    
  } catch (error) {
     if(isAxiosError(error)){
      console.log(error)
     }
  }
}


fetchProjects()

},[])





// fetch all users
useEffect(()=>{

async function fetchUsers(){

  try {
    const {data} = await axiosInstance.get(AUTHENTICATION_URL.ALL_USERS_LIST_URL_FOR_TASK_FORM(100,1))
    setUsersList(data.data)
    
  } catch (error) {
     if(isAxiosError(error)){
      console.log(error)
     }
  }
}


fetchUsers()

},[])





const btnText = taskFormtitle.startsWith("Add") ? "Save":"Update Now"

  return (
   <section className=' position-fixed top-0 bottom-0 start-0 end-0 row justify-content-center align-items-center' style={{zIndex:99999 ,backgroundColor:"#42696180"}}>
<div className="bg-white rounded-2 position-relative col-md-6">
  <div className="close-btn position-absolute top-0 end-0">
<i onClick={handleHideTaskForm} className="fa-solid fa-circle-xmark fs-5"></i>
  </div>
   <header>
<button className={`${taskFormtitle.startsWith("Update")?"custom-btn":" btn btn-danger"}`} onClick={handleHideTaskForm}> <i className="fa-solid fa-circle-chevron-left"></i> View All Tasks</button>
<h3 className="border-1 border-bottom py-2 my-2" style={{width:"fit-content"}}>{taskFormtitle}</h3>
 </header>



{/*  input for title */}
<form className="py-3" onSubmit={handleSubmit( async (data)=>{




  if(taskFormtitle.startsWith("Add")) {
    await handleCreateNewTask(data)
  }else{

     await handleUpdateCurrentTask(data)

  }
})}>
<div className="title-input mb-3">
  <label htmlFor="title">Title</label>
  <input
  {...register("title",{required:"Title is Required",minLength:{
    value:5,
    message:"Title must be at least 5 characters long"
  }})}
  
  className="form-control" id="title" type="text" placeholder="Title" />
{errors.title && <p className="text-danger">{errors.title.message}</p>}


</div>

{/* input for description */}
<div className="description-input mb-3">
  <label htmlFor="description"> Description</label>
  <textarea
  {...register("description",{required:"Description is Required" , minLength:{
    value:10,
    message:"Description must be at least 10 characters long"
  }})}
  className="form-control" id="description" placeholder="Description"></textarea>
  {errors.description && <p className="text-danger">{errors.description.message}</p>}
</div>



<div className="row">
{/* input for users */}
<div className="users-input mb-3 col-md-6">
  <label htmlFor="employee"> Users</label>
  <select className="form-control" id="employee"
  {...register("employeeId",{required:"Select The User"})}
  
  
  >
    <option value=""> Select Employee</option>


{usersList.length > 0 ? usersList.sort((a:User,b:User)=> a.userName.localeCompare(b.userName)).map((user:User)=>{
  return <option value={user.id} key={user.id}>{user.userName}</option>
}):""}

  </select>
  {errors.employeeId && <p className="text-danger">{errors.employeeId.message}</p>}
</div>



{/* input for projects */}
<div className="project-input mb-3 col-md-6">
  <label htmlFor="projects"> Projects</label>
  <select className="form-control" id="projects"
  {...register("projectId",{required:"Select The Project"})}
  
  
  >
    <option value=""> Select Project</option>


{projectsList.length > 0 ? projectsList.map((project:Project)=>{
  return <option value={project.id} key={project.id}>{project.title}</option>
}):""}

  </select>
  {errors.projectId && <p className="text-danger">{errors.projectId.message}</p>}
</div>





</div>









 <div className=" w-100 text-center">
<button
  disabled={isSubmitting}
  type="submit"
  className={`${taskFormtitle.startsWith("Update") ? "custom-btn" : "btn btn-danger"} w-75 text-center d-inline-block`}
>
  {isSubmitting ? (
    <i className="fa-solid fa-spinner fa-spin text-white fs-5"></i>
  ) : (
    btnText
  )}
</button>
 </div>

</form>







</div>
   </section>
  )
}
