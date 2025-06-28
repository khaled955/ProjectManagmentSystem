
import { useDraggable } from "@dnd-kit/core";
import type { TaskPropForDrag } from "../../../../Interfaces/Tasks.interface";
import {motion} from "framer-motion"
export default function TaskCardForDrag({ task }: { task: TaskPropForDrag }) {
  /* dnd-kit hook */
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id.toString(), // make id a string for consistency
      data:{
        status:task.status  // set previus status to check with new status
      },
    });

// live transform while dragging */


  const style = transform
  ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
       
      }
 : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="custom-task-card p-3 rounded-4 mb-3 shadow-sm"
      draggable = {true}
      layout={true}
      layoutId={task.id.toString()}
        key={task.id}
      style={style}
>
    
      <p className="m-0 fw-semibold text-white text-center overflow-hidden">
        {task.description}
      </p>
    </motion.div>
  );
}


