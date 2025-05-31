import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

function ToDoItem({ id, title, description, onDelete, onEdit }) {
  return (
    <li className="todo-item">
      <span className="todo-title">{title}</span>
      {description && description.length > 0 && (
        <ul className="todo-description">
          {description.map((desc, idx) => (
            <li key={idx}>{desc}</li>
          ))}
        </ul>
      )}
      <div className="button-group">
        <button onClick={() => onDelete(id)}>
          <DeleteIcon />
        </button>
        <button onClick={() => onEdit(id, title, description)}>
          <EditIcon />
        </button>
      </div>
    </li>
  );
}

export default ToDoItem;
