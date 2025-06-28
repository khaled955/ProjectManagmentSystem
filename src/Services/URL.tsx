

  export const baseURL = `https://upskilling-egypt.com:3003`;


// ****************** AUTH-URLS ********************

export const AUTHENTICATION_URL = {

    LOGIN:`${baseURL}/api/v1/Users/Login`,
    REGISTER:`${baseURL}/api/v1/Users/Register`,
    FORGOT_PASSWORD:`${baseURL}/api/v1/Users/Reset/Request`,
    RESET_PASSWORD:`${baseURL}/api/v1/Users/Reset`,
    CHANGE_PASSWORD:`${baseURL}/api/v1/Users/ChangePassword`,
    VERIFY_ACCOUNT:`${baseURL}/api/v1/Users/verify`,
    UPDATE_PROFILE:`${baseURL}/api/v1/Users/`,
    GET_USER_BY_ID:(id:number)=>`${baseURL}/api/v1/Users/${id}`,
    TOGGLE_USER_BY_ID:(id:number)=>`${baseURL}/api/v1/Users/${id}`,
    GET_USERS_BY_MANAGER:`${baseURL}/api/v1/Users/count`,
    GET_MANAGERS_ACCOUNTS:`${baseURL}/api/v1/Users/Manager`,
    GET_CURRENT_USER:`${baseURL}/api/v1/Users/currentUser`,
    GET_ALL_USERS:(pageSize:number,pageNumber:number,userName:string="",groups:number)=>`${baseURL}/api/v1/Users/?userName=${userName}&${groups&&`groups=${groups}&`}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
 ALL_USERS_LIST_URL_FOR_TASK_FORM: (pageSize:number,pageNumber:number)=>`${baseURL}/api/v1/Users/?groups=2&pageSize=${pageSize}&pageNumber=${pageNumber}`,
  GET_ACTIVE_INACTIVE_USERS:`${baseURL}/api/v1/Users/count`



}


// ****************** Project-URLS ********************

export const PROJECTS_URL = {
  GET_ALL_PROJECTS:(title:string="",pageSize:number,pageNumber:number)=>`${baseURL}/api/v1/Project/?title=${title}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
  CREATE_PROJECTS:`${baseURL}/api/v1/Project`,
  GET_PROJECT_BY_ID:(id:number)=>`${baseURL}/api/v1/Project/${id}`,
  UPDATE_PROJECT_BY_ID_BY_MANAGER:(id:number)=>`${baseURL}/api/v1/Project/${id}`,
DELETE_PROJECT_BY_ID:(id:number)=>`${baseURL}/api/v1/Project/${id}`,
GET_PROJECTS_FOR_MANAGER:(title:string="",pageSize:number,pageNumber:number)=>`${baseURL}/api/v1/Project/manager?title=${title}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
GET_PROJECTS_FOR_EMPLOYEE:(title:string="",pageSize:number,pageNumber:number)=>`${baseURL}/api/v1/Project/employee?title=${title}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
GET_PROJECTS_FOR_EMPLOYEE_FOR_DASHBOARD:(pageSize:number,pageNumber:number)=>`${baseURL}/api/v1/Project/employee?pageSize=${pageSize}&pageNumber=${pageNumber}`,

GET_PROJECTS_FOR_MANAGER_FOR_CREATE_TASKS:(pageSize:number)=>`${baseURL}/api/v1/Project/manager?pageSize=${pageSize}`,


}



// ****************** TASKS-URLS ********************



export  const TASKS_URL={
  CREATE_TASK_BY_MANAGER:`${baseURL}/api/v1/Task`,
  GET_ALL_ASSIGNED_TASKS:(pageSize:number,pageNumber:number)=>`${baseURL}/api/v1/Task?pageSize=${pageSize}&pageNumber=${pageNumber}}`,
  GET_ALL_MY_TASKS_FOR_MANAGER:(pageSize:number,pageNumber:number)=>`${baseURL}/api/v1/Task/manager?pageSize=${pageSize}&pageNumber=${pageNumber}`,
  GET_TASK_BY_ID:(id:number)=>`${baseURL}/api/v1/Task/${id}`,
  UPDATE_TASK_BY_MANAGER:(id:number)=>`${baseURL}/api/v1/Task/${id}`,
DELETE_TASK_BY_ID:(id:number)=>`${baseURL}/api/v1/Task/${id}`,
COUNT_TASKS_FOR_MANAGER_AND_EMPLOYEE:`${baseURL}/api/v1/Task/count`,
CHANGE_STATUS_OF_TASK_BY_EMPLOYEE:(id:number)=>`${baseURL}/api/v1/Task/${id}/change-status`,
GET_ALL_TASKS_IN_PROJECT:(id:number,title:string,pageSize:number,pageNumber:number)=>`https://upskilling-egypt.com:3003/api/v1/Task/project/${id}?title=${title}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
GET_ALL_MY_TASKS_FOR_MANAGER2:`${baseURL}/api/v1/Task/manager`,
GET_ALL_TASKS_FOR_MANAGER_FOR_FILTER:(pageSize:number,pageNumber:number,title:string,status:string)=>`${baseURL}/api/v1/Task/manager?${title&&`title=${title}&`}${status&&`status=${status}&`}pageSize=${pageSize}&pageNumber=${pageNumber}`,
GET_TASKS_COUNT:`${baseURL}/api/v1/Task/count`,
CHANGE_TASK_STATUS:(id:number)=>`${baseURL}/api/v1/Task/${id}/change-status`





}






