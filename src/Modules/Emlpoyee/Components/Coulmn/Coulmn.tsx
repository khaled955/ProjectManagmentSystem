
import { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import type { TaskPropForDrag } from "../../../../Interfaces/Tasks.interface";
import TaskCardForDrag from "../../../Emlpoyee/Components/TaskCardForDrag/TaskCardForDrag";
import {motion} from 'framer-motion'

export default function Coulmn({
  coulmnId,
  tasksList,
}: {
  coulmnId: "ToDo" | "InProgress" | "Done";
  tasksList: TaskPropForDrag[];
}) {
  const { setNodeRef } = useDroppable({ id: coulmnId });

  /* tasks that belong in this column */
  const tasks = useMemo(
    () => tasksList.filter((t) => t.status === coulmnId),
    [tasksList, coulmnId]
  );

  /* pulsing dot if the column has tasks */
  const hasTasks = tasks.length > 0;

  return (
    <motion.div className="col-md-3 p-0 mt-3"  layout={true} layoutId={coulmnId} key={coulmnId}>
      <div className="column-container rounded-4 h-100 shadow">
        <h5 className="text-white fw-bold d-flex justify-content-between align-items-center mb-3">
          {coulmnId}
          {hasTasks && <span className="pulse-dot" />}
        </h5>

        <div ref={setNodeRef}>
          {tasks.map((task) => (
            <TaskCardForDrag key={task.id} task={task} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}




