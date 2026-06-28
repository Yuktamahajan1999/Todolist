import React, { useState, useEffect, useContext } from "react";
import TodoItem from "./TodoItem";
import InputArea from "./InputArea";
import './App.css';
import { toast } from "react-toastify";
import { UserContext } from './UserContext';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TaskManager() {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext);
  const [currentItem, setCurrentItem] = useState({ id: null, title: '', description: [], priority: "Medium" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "https://todolist-89fe.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first.");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    setLoading(true);
    axios.get(`${API_URL}/todo/mytodos`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setItems(res.data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Failed to fetch todos:", e);
        toast.error("Failed to fetch todos.");
        setLoading(false);
      });
  }, [API_URL]);

  async function addItem({
    title,
    description: descriptionArray,
    status = "pending",
    priority = "Medium",
  }) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add tasks.");
      return;
    }

    if (!title || !descriptionArray.length) {
      toast.error("Title and at least one description item are required.");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/todo/addtodo`,
        { title, description: descriptionArray, status, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems((prevItems) => [...prevItems, res.data.data]);
      toast.success("Task added successfully!", { position: "top-center", autoClose: 1000 });
    } catch (err) {
      console.error("Failed to add task:", err);
      toast.error("Failed to add task. Please try again.", { position: "top-center", autoClose: 1000 });
    }
  }

  async function deleteItem(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to delete tasks.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/todo/deletetodo?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      toast.success("Task deleted successfully!", { position: "top-center", autoClose: 1000 });
    } catch (err) {
      console.error("Failed to delete task:", err);
      toast.error("Failed to delete task. Please try again.", { position: "top-center", autoClose: 1000 });
    }
  }

  function editItem(id, title, description, priority) {
    setIsEditing(true);
    setCurrentItem({ id, title, description, priority });
  }

  async function updateItem({ title, description: descriptionArray, priority }) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to update tasks.");
      return;
    }

    if (!title || !descriptionArray.length) {
      toast.error("Title and at least one description item are required.");
      return;
    }

    try {
      await axios.put(
        `${API_URL}/todo/updatetodo?id=${currentItem.id}`,
        { title, description: descriptionArray, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === currentItem.id ? { ...item, title, description: descriptionArray, priority } : item
        )
      );
      setIsEditing(false);
      setCurrentItem({ id: null, title: "", description: [], priority: "Medium" });
      toast.success("Task updated successfully!", { position: "top-center", autoClose: 1000 });
    } catch (err) {
      console.error("Failed to update task:", err);
      toast.error("Failed to update task. Please try again.", { position: "top-center", autoClose: 1000 });
    }
  }

  return (
    <div className="container">
      <h2 className="welcome-text">
        {user && user.name ? `Welcome ${user.name}` : 'Welcome to Daily Task Manager'}
      </h2>

      <div className="heading">
        <h1>Task Manager</h1>
        <p className="page-subtitle">
          Create, organize and manage your daily tasks efficiently.
        </p>
      </div>

      <InputArea
        onAdd={addItem}
        onUpdate={updateItem}
        isEditing={isEditing}
        currentItem={currentItem}
      />

      {loading ? (
        <p>Loading your tasks...</p>
      ) : (
        <ul>
          {items.map((todoItem) => (
            <TodoItem
              key={todoItem._id}
              id={todoItem._id}
              title={todoItem.title}
              description={todoItem.description}
              priority={todoItem.priority}
              createdAt={todoItem.createdAt}
              onDelete={deleteItem}
              onEdit={editItem}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskManager;