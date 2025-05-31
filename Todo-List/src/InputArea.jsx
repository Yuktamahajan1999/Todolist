import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function InputArea({ onUpdate, isEditing, currentItem, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isEditing && currentItem) {
      setTitle(currentItem.title || "");
      setDescription((currentItem.description || []).join(", "));
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
    const descArray = description.split(",").map(s => s.trim()).filter(Boolean);
    if (isEditing) {
      onUpdate(title, descArray);
    } else {
      onAdd(title, descArray);
    }
    setTitle("");
    setDescription("");
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleTitleChange}
          type="text"
          value={title}
          placeholder="Enter your task title"
          required
        />
        <input
          onChange={handleDescriptionChange}
          type="text"
          value={description}
          placeholder="Enter task details"
          required
        />
        <button type="submit">
          {isEditing ? (
            <span className="icon-wrapper"><AutorenewIcon /></span>
          ) : (
            <span className="icon-wrapper"><AddIcon /></span>
          )}
        </button>
      </form>
    </div>
  );
}

export default InputArea;