import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ToDoHub = () => {
  const [todos, setTodos] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "https://todolist-89fe.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(payload.id);
      } catch (err) {
        console.error("Error parsing token:", err);
      }

      axios.get(`${API_URL}/todo/getAlltodos`, {
        headers: { Authorization: "Bearer " + token }
      })
        .then(res => {
          if (res.data && res.data.data) {
            setTodos(res.data.data);
          }
        })
        .catch(err => console.error("Error fetching todos:", err));
    }
  }, [API_URL]);

  const updateStatus = async (todoId, currentStatus) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login required");

    try {
      const res = await axios.put(
        `${API_URL}/todo/updatetodo?id=${todoId}`,
        { status: currentStatus === "completed" ? "pending" : "completed" },
        { headers: { Authorization: "Bearer " + token } }
      );

      if (res.data.success) {
        setTodos(prev =>
          prev.map(todo =>
            todo._id === todoId ? { ...todo, status: res.data.data.status } : todo
          )
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Error updating status");
    }
  };

  return (
    <div className="todo-hub-container">
      <h1 className="todo-hub-title">📝 ToDo Hub - All Tasks</h1>

      <div className="todo-hub-grid">
        {todos.length === 0 ? (
          <p className="todo-hub-empty">No tasks found.</p>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} className="todo-card">
              <h3>{todo.title}</h3>

              {Array.isArray(todo.description) && todo.description.length > 0 ? (
                <ul className="todo-description">
                  {todo.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              ) : (
                <p className="todo-description">No description</p>
              )}

              <p className="todo-user">
                👤 {todo.user?.name || "Unknown User"}
              </p>

              <p className={`todo-status ${todo.status === "completed" ? 'done' : 'pending'}`}>
                {todo.status === "completed" ? '✅ Completed' : '⌛ Pending'}
              </p>

              {todo.user?._id === currentUserId && (
                <button
                  className={`status-btn ${todo.status === "completed" ? 'completed' : 'pending'}`}
                  onClick={() => updateStatus(todo._id, todo.status)}
                >
                  Mark as {todo.status === "completed" ? "Pending" : "Completed"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ToDoHub;
