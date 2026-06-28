import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function TodoItem({
  id,
  title,
  description,
  priority,
  createdAt,
  onDelete,
  onEdit,
}) {
  return (
    <li className="todo-item">
      <div className="todo-header">
        <span className="todo-title">{title}</span>
        {createdAt && (
          <span className="todo-date">
            📅 {new Date(createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        )}
      </div>

      {priority && (
        <span className={`priority-badge ${priority.toLowerCase()}`}>
          {priority}
        </span>
      )}

      {description && description.length > 0 ? (
        <ul className="todo-description">
          {description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
      ) : (
        <span
          style={{
            flex: 1,
            color: "#94a3b8",
            fontSize: "0.9rem",
            fontStyle: "italic",
          }}
        >
          No description details
        </span>
      )}

      <div className="button-group">
        <button onClick={() => onDelete(id)} title="Delete Task">
          <DeleteIcon fontSize="small" />
        </button>

        <button
          onClick={() => onEdit(id, title, description, priority)}
          title="Edit Task"
        >
          <EditIcon fontSize="small" />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;