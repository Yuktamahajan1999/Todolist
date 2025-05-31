import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ToDoHub = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:8000/todo/getAlltodos", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => {
        if (res.data && res.data.data) {
          setTodos(res.data.data);
        }
      })
      .catch(err => console.error("Error fetching todos:", err));
  }, []);

  return (
    <div className="todo-hub-container">
      <h1 className="todo-hub-title">📝 ToDo Hub - All Tasks</h1>

      <div className="todo-hub-grid">
        {todos.length === 0 ? (
          <p className="todo-hub-empty">No tasks found.</p>
        ) : (
          todos.map(todo => (
            <div className="todo-card" key={todo._id}>
              <h3>{todo.title}</h3>
              {Array.isArray(todo.description) && todo.description.length > 0 ? (
                <ul className="todo-description">
                  {todo.description.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="todo-description">No description</p>
              )}
              <p className="todo-user">👤 {todo.user && todo.user.name ? todo.user.name : "Unknown User"}</p>
              <p className={`status-text ${todo.status === "completed" ? 'completed' : 'pending'}`}>
                {todo.status === "completed" ? '✅ Completed' : '⌛ Pending'}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ToDoHub;
