import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function InputArea({ onUpdate, isEditing, currentItem, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (isEditing && currentItem) {
      setTitle(currentItem.title || "");
      setDescription((currentItem.description || []).join(", "));
      setPriority(currentItem.priority || "Medium");
    }
  }, [isEditing, currentItem]);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const descArray = description
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    if (isEditing) {
      onUpdate({
        title,
        description: descArray,
        priority
      });
    } else {
      onAdd({
        title,
        description: descArray,
        priority
      });
    }

    setTitle("");
    setDescription("");
    setPriority("Medium");
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleTitleChange}
          type="text"
          value={title}
          placeholder="e.g. Complete React Assignment"
          required
        />

        <input
          onChange={handleDescriptionChange}
          type="text"
          value={description}
          placeholder="Describe your task..."
          required
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="Low">🟢 Low Priority</option>
          <option value="Medium">🟡 Medium Priority</option>
          <option value="High">🔴 High Priority</option>
        </select>

        <button className="create-task-btn">
          {isEditing ? (
            <>
              <AutorenewIcon />
              Update Task
            </>
          ) : (
            <>
              <AddIcon />
              Create Task
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default InputArea;