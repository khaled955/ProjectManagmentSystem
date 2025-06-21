import { Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical, BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { AddProjectProps, PaginatedProjectResponse, Project } from '../../../../Interfaces/Project.interface';
import { PROJECTS_URL } from '../../../../Services/URL';
import axiosInstance from '../../../../Services/AxiosInstance';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import Loading from '../../../Shared/Components/Loading/Loading';
import NoData from '../../../Shared/Components/NoData/NoData';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import Pagination from '../../../Shared/Components/Pagination/Pagination';
import debounce from "lodash/debounce";
import ProjectForm from '../ProjectForm/ProjectForm';
import ConfirmModal from '../../../Shared/Components/ConfirmModal/ConfirmModal';



export default function ProjectList() {
const [projectList , setProjectList] = useState< PaginatedProjectResponse| null>(null)
const [showProjectDetails , setShowProjectDetails] = useState(false)
const [currentProject , setCurrentProject] = useState<Project | null>(null)
const [currentPage , setCurrentPage] = useState(1)
const [totalPageNumber , setTotalPageNumber] = useState(1)
const [isLoading , setIsLoading] = useState(false)
const [showDeletModal , setShowDeletModal] = useState(false)
const [seletedProjectId , setSelectedProjectId] = useState< number | null>(null)
const [searchQuery , setSearchQuery] = useState("")
const [showProjectForm , setShowProjectForm] = useState(false)
const [projectFormtitle , setProjectFormTitle] = useState("")




// fetch projects

const fetchProjects = useCallback( async function(){

  try {
    const options = {
      url:PROJECTS_URL.GET_ALL_PROJECTS(searchQuery,5,currentPage),
      method:"GET",

    }
    
    const {data } = await axiosInstance.request(options)
       setProjectList(data)
       setTotalPageNumber(data.totalNumberOfPages)


  } catch (error) {
    if(isAxiosError(error)) {
      toast.error(error.response?.data.message || " Some thing go wrong!")
    }
  }




},[currentPage,searchQuery])

useEffect(()=>{
fetchProjects()
},[currentPage,fetchProjects])

const deletProject = useCallback(  async function deleteProject(projectId:number){

     setIsLoading(true)
    const toastId = toast.loading("Deleting Underprocessing ....")

try {
  const options = {
    url: PROJECTS_URL.DELETE_PROJECT_BY_ID(projectId),
    method:"DELETE"
  }
  
 await axiosInstance.request(options)
toast.success("Deleting Project Successfully Done ✅")
fetchProjects()


} catch (error) {
  
  if(isAxiosError(error)){
    toast.error(error.response?.data.message || "Some thing go wrong!")
  }
}finally{
  toast.dismiss(toastId)
  setIsLoading(false)
  setShowDeletModal(false)
}


 },[fetchProjects])




// handleSerachInputBy Title

const debounceSearchByTitle= useMemo(()=>{

  return debounce(() =>{
    if(searchQuery){
      fetchProjects()
    }

  },300)
  


},[fetchProjects,searchQuery])


function handleSearchQuertByTitle(e:React.ChangeEvent<HTMLInputElement>){
setSearchQuery(e.target.value)
setCurrentPage(1)
debounceSearchByTitle()
}





// clean up search function

useEffect(()=>{


},[debounceSearchByTitle])



 const handleHideProjectForm = useCallback(function (){
  setShowProjectForm(false)
},[]
)






const handleCreateNewProject = useCallback( async (dataInfo:AddProjectProps)=>{

  const toastId = toast.loading("Waiting......")

try {
  
  const options = {
    url:PROJECTS_URL.CREATE_PROJECTS,
    method:"POST",
    data:dataInfo,
  }

 await axiosInstance.request(options)
toast.success("New Project Created Successfully")
 fetchProjects()
} catch (error) {
  if(isAxiosError(error))
    toast.error("Error creating project")
}finally{
  toast.dismiss(toastId)
  setTimeout(()=>{
    handleHideProjectForm()
  },1500)
}





},[handleHideProjectForm,fetchProjects])



const handleUpdateCurrentProject = useCallback( async (dataInfo:AddProjectProps)=>{

  if(!currentProject) return 

  // prevent callapi if no change happen
if(dataInfo.title === currentProject.title && dataInfo.description === currentProject.description){
  handleHideProjectForm()
  return
}



  const toastId = toast.loading("Waiting......")

try {
  
  const options = {
    url:PROJECTS_URL.UPDATE_PROJECT_BY_ID_BY_MANAGER(currentProject.id),
    method:"PUT",
    data:dataInfo,
  }

 await axiosInstance.request(options)
 fetchProjects()
toast.success("Project Updated Successfully 👌")

} catch (error) {
  if(isAxiosError(error))
    toast.error("Error creating project")
}finally{
  toast.dismiss(toastId)
  setTimeout(()=>{
    handleHideProjectForm()
  },1500)
}





},[handleHideProjectForm,currentProject,fetchProjects])















// handle functions 
function handleHideDeletModal(){
  setShowDeletModal(false)
}


function handleHideProjectCard(){
  setShowProjectDetails(false)
}







if(!projectList) return <Loading/>

  return (
    <div>
{showProjectDetails && currentProject && <ProjectDetails currentProject={currentProject} handleHideProjectCard={handleHideProjectCard}/>
}

{showDeletModal && seletedProjectId && <ConfirmModal onClose={handleHideDeletModal} selectedId={seletedProjectId} show={showDeletModal} isLoading={isLoading} onConfirm={deletProject}/>}

{showProjectForm && <ProjectForm handleCreateNewProject={handleCreateNewProject} handleUpdateCurrentProject={handleUpdateCurrentProject} projectFormtitle={projectFormtitle} handleHideProjectForm={handleHideProjectForm} currentProject={currentProject!}/>}


      <div className="project-header px-2 rounded-2 d-flex justify-content-between align-items-center flex-wrap gap-2">
       <h2>Projects</h2>
       <button onClick={()=>{
        
        setProjectFormTitle("Add a New Project")
        setCurrentProject(null)
        setShowProjectForm(true)
       }} className="custom-btn"> + Add New Project</button>
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
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Num Users</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Num Tasks</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Created Date</th>
      <th style={{backgroundColor:"#315951E5" ,color:"white"}}>Action</th>
    </tr>
  </thead>
  <tbody>
 {projectList.data.length > 0 ?projectList.data.map((project:Project)=> <tr key={project.id}>
  <td className='text-capitalize'>{project.title}</td>
  <td style={{backgroundColor:"#315951E5" ,color:"white",borderRadius:20}}>Public</td>
  <td>5</td>
  <td>15</td>
  <td>{new Date(project.creationDate).toLocaleTimeString()}</td>
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
        <Dropdown.Item onClick={()=>{setCurrentProject(project)
          setShowProjectDetails(true)

        }} >
          <BsEye className="me-2 text-success" />
          View
        </Dropdown.Item>

        

 

 {/* edit btn */}
        <Dropdown.Item onClick={()=>{
          setCurrentProject(project)
          setProjectFormTitle(`Update ${project.title}`)
          setShowProjectForm(true)
        }} >
          <BsPencil className="me-2 text-primary" />
          Edit
        </Dropdown.Item>

{/* delet btn */}
      <Dropdown.Item disabled={isLoading}  onClick={()=>{
        setSelectedProjectId(project.id)
        setShowDeletModal(true)
      }}>
          <BsTrash className="me-2 text-danger" />
          Delete
        </Dropdown.Item>



      </Dropdown.Menu>
    </Dropdown>


  </td>
 </tr>):<NoData/>}
  </tbody>
</table>

{projectList.totalNumberOfPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPageNumber} onPageChange={setCurrentPage}/>}

    </div>
  )
}
