import React from "react";
import Todo from "../assets/direct-hit.png";

import "./TaskColumn.css";
import TaskCard from "./TaskCard";

const TaskColumn = ({
  title,
  icon,
  tasks,
  status,
  handleDelete,
  handleEdit,
}) => {
  console.log(tasks);
  return (
    <section className="task_column">
      <h2 className="task_column_heading">
        <img className="task_column_icon" src={icon} alt="" /> {title}
      </h2>

      {tasks.map(
        (task, index) =>
          task.status === status && (
            <TaskCard
              key={task.id}
              taskId={task._id}
              title={task.task}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              index={index}
            />
          )
      )}
    </section>
  );
};

export default TaskColumn;
