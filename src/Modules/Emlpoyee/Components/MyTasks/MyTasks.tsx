import useSound from "use-sound";
import { useCallback, useEffect, useState } from "react";
import { DndContext, type DragEndEvent, closestCorners } from "@dnd-kit/core";
import toast from "react-hot-toast";
import axiosInstance from "../../../../Services/AxiosInstance";
import { TASKS_URL } from "../../../../Services/URL";
import type {
  CoulmnPropsForDrag,
  TaskPropForDrag,
} from "../../../../Interfaces/Tasks.interface";
import type { Task } from "../../../../Interfaces/Project.interface";
import { isAxiosError } from "axios";
import { useAuth } from "../../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Coulmn from "../Coulmn/Coulmn";
import Loading from "../../../Shared/Components/Loading/Loading";
/* ---------------------------------- */
/* Columns config */
const columnList: CoulmnPropsForDrag[] = [
  { id: "ToDo", title: "ToDo" },
  { id: "InProgress", title: "InProgress" },
  { id: "Done", title: "Done" },
];

export default function MyTasks() {
  const [tasksList, setTasksList] = useState<TaskPropForDrag[] | null>(null);
  const [isSoundOn] = useState(true);
const {isEmployee} = useAuth()
const navigate = useNavigate()


 // Import sound effects
const [playAction, { sound: actionSound }] = useSound("/sounds/actiondone.mp3", { soundEnabled: isSoundOn });




const stopAllSounds = () => {
  actionSound?.stop();
};




  // Get tasks once
  const getAllTasks = useCallback(async () => {
    const { data } = await axiosInstance.get(TASKS_URL.GET_ALL_ASSIGNED_TASKS(20, 1));
    setTasksList(data.data);
   
  }, []);





  useEffect(() => {
    if(!isEmployee) {
       navigate("/dashboard")
       return ;
    }
    getAllTasks();
  }, [getAllTasks,isEmployee,navigate]);

  /* API call to change status */
  const changeStatus = useCallback(
    async (id: string, status: string) => {
      await axiosInstance.put(TASKS_URL.CHANGE_STATUS_OF_TASK_BY_EMPLOYEE(+id), {
        status,
      });
    },
    []
  );

  /* dnd-kit handler */
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id.toString();
    const prevStatus = active.data.current?.status
    const newStatus = over.id as Task["status"];

    
try {
  if(prevStatus === newStatus) return ;
  await changeStatus(taskId, newStatus);

  setTasksList((prev) =>
    prev!.map((t) =>
      t.id.toString() === taskId ? { ...t, status: newStatus } : t
    )
  );
  toast.success("Status updated");

  stopAllSounds();
  playAction();


} catch(error) {
  if(isAxiosError(error))  toast.error( error.response?.data.message || "Failed to update status");

}



   
  };



  if(!tasksList) return <Loading/>
  return (
    <div className="task-container">
      <h2 className="text-center mb-4 text-white">Task Board</h2>

      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <div className="row justify-content-center gap-3">
          {columnList.map((col) => (
            <Coulmn
              key={col.id}
              coulmnId={col.id}
              tasksList={tasksList}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
