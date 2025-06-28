import { useEffect, useState } from "react";
import Charts from "../../../Shared/Components/Charts/Charts";
import Header from "../../../Shared/Components/Header/Header";
import axiosInstance from "../../../../Services/AxiosInstance";
import { AUTHENTICATION_URL, PROJECTS_URL, TASKS_URL } from "../../../../Services/URL";
import { isAxiosError } from "axios";
import Loading from "../../../Shared/Components/Loading/Loading";
import { useAuth } from "../../../../Hooks/useAuth";

export default function Dashboard() {
const [tasksNumber , setTasksNumber] = useState(0)
const [projectsNumber,setProjectsNumber] = useState(0)
const [numberOfToDoTasks , setNumberOfToDoTasks] = useState(0)
const [numberOfProgressTasks , setNumberOfProgressTasks] = useState(0)
const [numberOfDoneTasks , setNumberOfDoneTasks] = useState(0)
const[numberOfActiveUsers , setNumberOfActiveUsers] = useState(0)
const[numberOfInActiveUsers , setNumberOfInActiveUsers] = useState(0)
const [isLoading , setIsLoading] = useState(false)
const {isEmployee} = useAuth()






useEffect(()=>{

async function fetchProjectsNumber(){

  try {
    setIsLoading(true)
     const {data} = await axiosInstance.get( !isEmployee? PROJECTS_URL.GET_PROJECTS_FOR_MANAGER("",1,1): PROJECTS_URL.GET_PROJECTS_FOR_EMPLOYEE_FOR_DASHBOARD(1,1))
     // set Projects Number
  setProjectsNumber(data.totalNumberOfRecords)

    
  } catch (error) {
    if(isAxiosError(error)){
      console.log(error)
    }
  }finally{
    setIsLoading(false)
  }



}


fetchProjectsNumber()

},[isEmployee])




// fetch tasks count to set toDo and inProgress  and Done tasks number



useEffect(()=>{

async function fetchTasksCount(){

  try {
    setIsLoading(true)
     const {data} = await axiosInstance.get(TASKS_URL.GET_TASKS_COUNT)
setNumberOfDoneTasks(data.done)
setNumberOfProgressTasks(data.inProgress)
setNumberOfToDoTasks(data.toDo)
setTasksNumber(data.toDo + data.inProgress + data.done)

  } catch (error) {
    if(isAxiosError(error)){
      console.log(error)
    }
  }finally{
    setIsLoading(false)
  }



}


fetchTasksCount()

},[])



// fetch Active and Inactive users



useEffect(()=>{

async function fetchActiveAndInActive(){
 if(isEmployee) return;
  try {
    setIsLoading(true)
     const {data} = await axiosInstance.get(AUTHENTICATION_URL.GET_ACTIVE_INACTIVE_USERS)

  setNumberOfActiveUsers(data.activatedEmployeeCount)
  setNumberOfInActiveUsers(data.deactivatedEmployeeCount)



  } catch (error) {
    if(isAxiosError(error)){
      console.log(error)
    }
  }finally{
    setIsLoading(false)
  }



}


fetchActiveAndInActive()

},[isEmployee])












if(isLoading) return <Loading/>

  return (
   <>

    <Header headerText="You can add project and assign tasks to your team"/>
    <Charts activeUsers={numberOfActiveUsers} done={numberOfDoneTasks} inProgress={numberOfProgressTasks} inactiveUsers={numberOfInActiveUsers} todo={numberOfToDoTasks} totalProjects={projectsNumber} tasksNumber={tasksNumber}/>
   </>
  )
}
