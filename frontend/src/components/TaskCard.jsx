import React, { useState } from "react";

import "./TaskCard.css";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/Edit.png";

const TaskCard = ({ title, handleDelete, taskId, index, handleEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(title);

  const handleSave = () => {
    handleEdit(index, editedTask);
    setIsEditing(false);
  };
  console.log(taskId);
  return (
    <article className="task_card">
      {isEditing ? (
        <input
          type="text"
          className="task_edit_input"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
        />
      ) : (
        <p className="task_text">{title}</p>
      )}

      <div className="task_card_bottom_line">
        {isEditing ? (
          <button className="task_save" onClick={handleSave}>
            Save
          </button>
        ) : (
          <div className="task_edit" onClick={() => setIsEditing(true)}>
            <img src={editIcon} className="edit_icon" alt="Edit" />
          </div>
        )}
        <div
          className="task_delete"
          onClick={() => handleDelete(index, taskId)}
        >
          <img src={deleteIcon} className="delete_icon" alt="Delete" />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
