
import type { Project } from '../../../../Interfaces/Project.interface';

export default function ProjectDetails({
  currentProject,
  handleHideProjectCard,
}: {
  currentProject: Project;
  handleHideProjectCard: () => void;
}) {
  return (
    <section
      className="card-details position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center"
      style={{ zIndex: 99999, backgroundColor: '#42696180' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <article
        className="shadow-lg border-0 rounded-4 p-4 bg-white position-relative"
        style={{ maxWidth: '600px', width: '100%' }}
      >
        <button
          onClick={handleHideProjectCard}
          className="position-absolute top-0 end-0 btn btn-link text-danger fs-4"
          aria-label="Close project details"
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>

        <header className="text-center mb-4">
          <h2 id="project-title" className="text-primary">{currentProject.title}</h2>
        </header>

        <section aria-labelledby="description-label" className="mb-3">
          <h3 id="description-label" className="h6 text-muted">Description</h3>
          <p className="text-dark">{currentProject.description}</p>
        </section>

        <section aria-labelledby="dates-label">
          <h3 id="dates-label" className="h6 text-muted">Project Dates</h3>
          <ul className="list-unstyled mb-0">
            <li><strong>Created:</strong> {new Date(currentProject.creationDate!).toLocaleDateString()}</li>
            <li><strong>Updated:</strong> {new Date(currentProject.modificationDate!).toLocaleDateString()}</li>
          </ul>
        </section>
      </article>
    </section>
  );
}








