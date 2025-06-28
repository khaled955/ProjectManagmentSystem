
import { useForm } from "react-hook-form";
import type { AddProjectProps, ProjectFormProps } from "../../../../Interfaces/Project.interface";

export default function ProjectForm({
  projectFormtitle,
  handleHideProjectForm,
  currentProject,
  handleCreateNewProject,
  handleUpdateCurrentProject,
}: ProjectFormProps) {
  const {
    formState: { isSubmitting, errors },
    register,
    handleSubmit,
  } = useForm<AddProjectProps>({
    mode: "onChange",
    defaultValues: {
      title: currentProject?.title || "",
      description: currentProject?.description || "",
    },
  });

  const btnText = projectFormtitle.startsWith("Add") ? "Save" : "Update Now";

  return (
    <main
      className="position-fixed top-0 bottom-0 start-0 end-0 row justify-content-center align-items-center"
      style={{ zIndex: 99999, backgroundColor: "#42696180" }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="project-form-title"
    >
      <section className="bg-white rounded-2 position-relative col-md-6 p-3" role="form">
        <button
          onClick={handleHideProjectForm}
          aria-label="Close project form"
          className="close-btn position-absolute top-0 end-0 btn btn-link"
        >
          <i className="fa-solid fa-circle-xmark fs-5" aria-hidden="true"></i>
        </button>

        <header>
          <button
            className={`${projectFormtitle.startsWith("Update") ? "custom-btn" : "btn btn-danger"}`}
            onClick={handleHideProjectForm}
            aria-label="Back to all projects"
          >
            <i className="fa-solid fa-circle-chevron-left" aria-hidden="true"></i> View All Projects
          </button>
          <h3
            className="border-1 border-bottom py-2 my-2"
            id="project-form-title"
            style={{ width: "fit-content" }}
          >
            {projectFormtitle}
          </h3>
        </header>

        <form
          className="py-3"
          onSubmit={handleSubmit(async (data) => {
            if (projectFormtitle.startsWith("Add")) await handleCreateNewProject(data);
            else await handleUpdateCurrentProject(data);
          })}
        >
          <div className="title-input mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              {...register("title", {
                required: "Title is Required",
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters long",
                },
              })}
              className="form-control"
              id="title"
              type="text"
              placeholder="Title"
              aria-invalid={!!errors.title}
              aria-describedby="title-error"
            />
            {errors.title && (
              <p id="title-error" className="text-danger">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="description-input mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is Required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters long",
                },
              })}
              className="form-control"
              id="description"
              placeholder="Description"
              aria-invalid={!!errors.description}
              aria-describedby="description-error"
            ></textarea>
            {errors.description && (
              <p id="description-error" className="text-danger">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="w-100 text-center">
            <button
              disabled={isSubmitting}
              type="submit"
              className={`${
                projectFormtitle.startsWith("Update") ? "custom-btn" : "btn btn-danger"
              } w-75 text-center d-inline-block`}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <i className="fa-solid fa-spinner fa-spin text-white fs-5" aria-hidden="true"></i>
              ) : (
                btnText
              )}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}









