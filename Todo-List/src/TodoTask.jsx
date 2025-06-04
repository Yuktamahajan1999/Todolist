import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function TodoTask() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL || "https://todolist-89fe.onrender.com";
  if (!token) {
    navigate("/login");
  }


  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get(`${API_URL}/todo/mytodos`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then((res) => {
        setTodos(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user todos:", err);
        setLoading(false);
      });
  }, [API_URL]);


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
              <span className="todo-title">{todo.title}</span>
              {Array.isArray(todo.description) && (
                <ul>
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
