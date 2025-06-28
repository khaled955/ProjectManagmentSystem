import type { Task } from "../../../../Interfaces/Tasks.interface";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaCheck, FaCalendarAlt, FaProjectDiagram } from "react-icons/fa";
import { baseURL } from "../../../../Services/URL";
import avatar from "../../../../assets/images/th.jpeg"



export default function TasksDetails({currentTask,handleHideTaskCard}:{currentTask:Task,handleHideTaskCard:()=>void}) {


  useEffect(() => {
    const handleEscape = (e:KeyboardEvent) => {
      if (e.key === "Escape") handleHideTaskCard();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleHideTaskCard]);

  const employee = currentTask.employee;
  const project = currentTask.project;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 row justify-content-center align-items-center"
      style={{ zIndex:9999999 }}
    >
      <motion.div
        className="bg-white p-4 rounded-4 shadow-lg w-75 position-relative col-md-6"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
      >
        <button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={handleHideTaskCard}
        ></button>

        <div className="row">
          <div className="col-md-6 border-end">
            <h5 className="mb-3 text-primary">Employee Info</h5>
            <div className="d-flex align-items-center gap-3 mb-3">
              <img
                src={employee.imagePath ?`${baseURL}/${employee.imagePath}`: avatar}
                alt="Employee"
                className="rounded-circle"
                style={{ width: 80, height: 80, objectFit: "cover" }}
              />
              <div>
                <h6><FaUser className="me-2" />{employee.userName}</h6>
                <p className="mb-1"><FaEnvelope className="me-2" />{employee.email}</p>
                <p className="mb-1"><FaPhone className="me-2" />{employee.phoneNumber}</p>
                <p><FaGlobe className="me-2" />{employee.country}</p>
                <p><FaCalendarAlt className="me-2" />Created: {new Date(employee.creationDate).toLocaleDateString()}</p>
                <p><FaCheck className={`me-2 ${employee.isActivated ? "text-success" : "text-danger"}`} />
                  {employee.isActivated ? "Active" : "Inactive"}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h5 className="mb-3 text-primary">Project Info</h5>
            <p><FaProjectDiagram className="me-2" />Title: {project.title}</p>
            <p>Description: {project.description}</p>
            <p><FaCalendarAlt className="me-2" />Created: {new Date(project.creationDate!).toLocaleDateString()}</p>

            <h6 className="mt-4">Manager</h6>
            <p><FaUser className="me-2" />{project?.manager?.userName}</p>
            <p><FaEnvelope className="me-2" />{project?.manager?.email}</p>
            <p><FaPhone className="me-2" />{project?.manager?.phoneNumber}</p>
            <p><FaGlobe className="me-2" />{project?.manager?.country}</p>
          </div>
        </div>







      </motion.div>





    </div>
  );
}









