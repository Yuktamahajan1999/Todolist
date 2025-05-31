import React, { useState, useEffect, useContext } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import './App.css';
import { toast } from "react-toastify";
import { UserContext } from './UserContext';
import axios from "axios";

function TodoList() {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext);
  const [currentItem, setCurrentItem] = useState({ id: null, title: '', description: [] });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first.");
      return;
    }

    axios.get("http://localhost:8000/todo/mytodos", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        console.log("Fetched todos:", res.data.data);
        setItems(res.data.data);
      })
      .catch((e) => {
        console.error("Failed to fetch todos:", e);
        toast.error("Failed to fetch todos.");
      });
  }, []);

  // Add new todo
  async function addItem(title, descriptionArray) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add tasks.");
      return;
    }

    if (!title || !descriptionArray.length) {
      toast.error("Title and at least one description item are required.");
      return;
    }

    console.log("Adding todo:", { title, description: descriptionArray });
    try {
      const res = await axios.post(
        "http://localhost:8000/todo/addtodo",
        { title, description: descriptionArray, status: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Add response:", res.data);
      setItems((prevItems) => {
        const updated = [...prevItems, res.data.data];
        console.log("Updated items after add:", updated);
        return updated;
      });
      toast.success("Task added successfully!", { position: "top-center", autoClose: 1000 });
    } catch (err) {
      console.error("Failed to add task:", err);
      toast.error("Failed to add task. Please try again.", { position: "top-center", autoClose: 1000 });
    }
  }

  // Delete todo
  async function deleteItem(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to delete tasks.");
      return;
    }

    console.log("Deleting todo with id:", id);
    try {
      await axios.delete(`http://localhost:8000/todo/deletetodo?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems((prevItems) => {
        const updated = prevItems.filter((item) => item._id !== id);
        console.log("Updated items after delete:", updated);
        return updated;
      });
      toast.success("Task deleted successfully!", { position: "top-center", autoClose: 1000 });
    } catch (err) {
      console.error("Failed to delete task:", err);
      toast.error("Failed to delete task. Please try again.", { position: "top-center", autoClose: 1000 });
    }
  }

  function editItem(id, title, description) {
    console.log("Editing todo:", { id, title, description });
    setIsEditing(true);
    setCurrentItem({ id, title, description });
  }

  // Update todo
  async function updateItem(title, descriptionArray) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to update tasks.");
      return;
    }

    if (!title || !descriptionArray.length) {
      toast.error("Title and at least one description item are required.");
      return;
    }

    console.log("Updating todo:", { id: currentItem.id, title, description: descriptionArray });
    try {
      await axios.put(
        `http://localhost:8000/todo/updatetodo?id=${currentItem.id}`,
        { title, description: descriptionArray },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setItems((prevItems) => {
        const updated = prevItems.map((item) =>
          item._id === currentItem.id ? { ...item, title, description: descriptionArray } : item
        );
        console.log("Updated items after update:", updated);
        return updated;
      });

      setIsEditing(false);
      setCurrentItem({ id: null, title: '', description: [] });
      toast.success("Task updated successfully!", { position: "top-center", autoClose: 1000 });
    } catch (err) {
      console.error("Failed to update task:", err);
      toast.error("Failed to update task. Please try again.", { position: "top-center", autoClose: 1000 });
    }
  }

  useEffect(() => {
    console.log("Current items state:", items);
  }, [items]);

  return (
    <div className="container">
      <h2 className="welcome-text">
        {user && user.name ? `Welcome ${user.name}` : 'Welcome to Daily Task Manager'}
      </h2>

      <div className="heading">
        <h1>To-Do List</h1>
      </div>

      <InputArea
        onAdd={addItem}
        onUpdate={updateItem}
        isEditing={isEditing}
        currentItem={currentItem}
      />

      <ul>
        {items.map((todoItem) => (
          <ToDoItem
            key={todoItem._id}
            id={todoItem._id}
            title={todoItem.title}
            description={todoItem.description}
            onDelete={deleteItem}
            onEdit={editItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;