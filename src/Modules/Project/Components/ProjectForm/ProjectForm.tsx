import { useForm } from "react-hook-form"
import type { AddProjectProps, ProjectFormProps } from "../../../../Interfaces/Project.interface"

export default function ProjectForm({projectFormtitle,handleHideProjectForm,currentProject,handleCreateNewProject,handleUpdateCurrentProject}:ProjectFormProps) {



const {formState:{isSubmitting,errors},register ,handleSubmit} = useForm<AddProjectProps>({mode:"onChange",defaultValues:{

title:currentProject?.title || "",
description:currentProject?.description || ""

}})

















const btnText = projectFormtitle.startsWith("Add") ? "Save":"Update Now"

  return (
   <section className=' position-fixed top-0 bottom-0 start-0 end-0 row justify-content-center align-items-center' style={{zIndex:99999 ,backgroundColor:"#42696180"}}>
<div className="bg-white rounded-2 position-relative col-md-6">
  <div className="close-btn position-absolute top-0 end-0">
<i onClick={handleHideProjectForm} className="fa-solid fa-circle-xmark fs-5"></i>
  </div>
   <header>
<button className={`${projectFormtitle.startsWith("Update")?"custom-btn":" btn btn-danger"}`} onClick={handleHideProjectForm}> <i className="fa-solid fa-circle-chevron-left"></i> View All Projects</button>
<h3 className="border-1 border-bottom py-2 my-2" style={{width:"fit-content"}}>{projectFormtitle}</h3>
 </header>

{/* form */}


{/*  input for title */}
<form className="py-3" onSubmit={handleSubmit( async (data)=>{
  if(projectFormtitle.startsWith("Add")) await handleCreateNewProject(data)
    else await handleUpdateCurrentProject(data)
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



 <div className=" w-100 text-center">
   {/* <button disabled={isSubmitting} type="submit" className={`${projectFormtitle.startsWith("Update")?"custom-btn":"btn btn-danger"} w-75 text-center d-inline-block`}> {isSubmitting?<i className="fa-solid fa-spinner fa-spin"></i>:projectFormtitle.startsWith("Update")?"Update Now":"Save"}</button> */}
<button
  disabled={isSubmitting}
  type="submit"
  className={`${projectFormtitle.startsWith("Update") ? "custom-btn" : "btn btn-danger"} w-75 text-center d-inline-block`}
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
