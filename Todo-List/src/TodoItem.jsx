import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';


function ToDoItem({ id, text, onDelete, onEdit }) {


  return (
    <li className="todo-item">
      <span className="todo-text">{text}</span>
      <div className="button-group">
        <button onClick={() => onDelete(id)}>
          <DeleteIcon />
        </button>
        <button onClick={() => onEdit(id, text)}>
          <EditIcon />
        </button>
      </div>
    </li>
  );
}

export default ToDoItem;
