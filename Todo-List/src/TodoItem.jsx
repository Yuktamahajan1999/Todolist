import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

function TodoItem({ id, title, description, onDelete, onEdit }) {
  return (
    <li className="todo-item">
      <span className="todo-title">{title}</span>
      <ul className="todo-description">
        {description.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </ul>
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

export default TodoItem;
