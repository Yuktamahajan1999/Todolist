import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TodoTask() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL || "https://todolist-89fe.onrender.com";

  useEffect(() => {
    console.log("useEffect triggered with token:", token);

    if (!token) {
      console.warn("No token found, redirecting to login...");
      navigate("/login");
      return;
    }

    console.log("Fetching todos from:", `${API_URL}/todo/mytodos`);

    axios.get(`${API_URL}/todo/mytodos`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then((res) => {
        console.log("Todos response:", res.data);
        setTodos(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user todos:", err);
        setLoading(false);
      });
  }, [API_URL, token, navigate]);

  return (
    <div className="todo-list-container">
      <h2>📋 All Your To-Dos</h2>
      {loading ? (
        <p>Loading your tasks... ⏳</p>
      ) : todos.length === 0 ? (
        <p>No tasks yet. Time to get productive! 💪</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item-list">

              <div className="todo-main-info">
                <span className="todo-title">{todo.title}</span>

                {/* Dynamically display the real Priority badge */}
                <span className={`priority-badge ${(todo.priority || "Medium").toLowerCase()}`}>
                  {todo.priority || "Medium"}
                </span>
              </div>

              {/* Dynamically display the auto-created timestamp */}
              {todo.createdAt && (
                <p className="todo-date">
                  📅 Created: {new Date(todo.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </p>
              )}

              {Array.isArray(todo.description) && todo.description.length > 0 && (
                <ul className="todo-description">
                  {todo.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              )}

            </li>   
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoTask;
