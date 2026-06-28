/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  const API_URL = import.meta.env.VITE_API_URL || "https://todolist-89fe.onrender.com";

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      setIsLoading(true);
      try {
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          setCurrentUserId(payload.id);
        }

        const res = await axios.get(`${API_URL}/todo/getAlltodos`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setTodos(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching todos:", err);
        toast.error("Failed to load dashboard.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [API_URL]);

  // Pass currentPriority into the function parameters
  const updateStatus = async (todoId, currentStatus, currentPriority) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first.");
      return;
    }

    try {
      const res = await axios.put(
        `${API_URL}/todo/updatetodo?id=${todoId}`,
        { 
          status: currentStatus === "completed" ? "pending" : "completed",
          priority: currentPriority // Included here so backend retains the chosen priority
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success) {
        setTodos(prev =>
          prev.map(todo =>
            todo._id === todoId ? { ...todo, status: res.data.data.status, priority: res.data.data.priority } : todo
          )
        );
        toast.success("Task updated.");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Unable to update task.");
    }
  };

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.status === "completed").length;
  const pendingTasks = todos.filter((todo) => todo.status === "pending").length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = (todo.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : todo.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Welcome back, {user?.name || "Developer"} 👋
          </p>
          <span className="last-updated-tag">
            📅 Last Sync: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>📋 Total Tasks</h4>
          <h2>{totalTasks}</h2>
        </div>

        <div className="stat-card completed">
          <h4>✅ Completed</h4>
          <h2>{completedTasks}</h2>
        </div>

        <div className="stat-card pending">
          <h4>⌛ Pending</h4>
          <h2>{pendingTasks}</h2>
        </div>

        <div className="stat-card progress">
          <h4>📈 Completion Rate</h4>
          <h2>{completionRate}%</h2>
          <div className="progress-bar-wrapper">
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${Math.min(completionRate, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-controls-panel">
        <div className="search-box-wrapper">
          <input
            type="text"
            placeholder="🔍 Search tasks by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="dashboard-search-input"
          />
        </div>

        <div className="filter-buttons-group">
          <button
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All Tasks ({totalTasks})
          </button>
          <button
            className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending ({pendingTasks})
          </button>
          <button
            className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setStatusFilter('completed')}
          >
            Completed ({completedTasks})
          </button>
        </div>
      </div>

      <div className="dashboard-title">
        <h2>Workspace Overview <span className="task-count-badge">{filteredTodos.length} of {totalTasks} shown</span></h2>
      </div>

      {isLoading ? (
        <div className="todo-hub-loading-state">
          <p>Loading tasks...</p>
        </div>
      ) : (
        <div className="todo-hub-grid">
          {filteredTodos.length === 0 ? (
            <div className="todo-hub-empty-state">
              <div className="empty-state-icon">📂</div>
              <h3>No Tasks Found</h3>
              <p>We couldn't find any tasks matching your current view or filter configuration.</p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div className="todo-card" key={todo._id}>

                <div className="card-header">
                  <div className="card-title-area">
                    <h3>{todo.title}</h3>
                    <span className={`priority-badge ${(todo.priority || 'Medium').toLowerCase()}`}>
                      {todo.priority || "Medium"}
                    </span>
                  </div>
                  <span className={`badge ${todo.status === "completed" ? "completed" : "pending"}`}>
                    {todo.status}
                  </span>
                </div>

                <div className="todo-description">
                  {Array.isArray(todo.description) && todo.description.length > 0 ? (
                    <ul>
                      {todo.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                      ))}
                    </ul>
                  ) : typeof todo.description === "string" && todo.description.trim() !== "" ? (
                    <p className="todo-description-text">{todo.description}</p>
                  ) : (
                    <p className="no-desc-fallback">No description available.</p>
                  )}
                </div>
                
                {todo.createdAt && (
                  <p className="todo-date">
                    📅 Created: {new Date(todo.createdAt).toLocaleDateString()}
                  </p>
                )}
                
                <div className="card-footer">
                  <div className="todo-user">
                    Assigned to: 👤 <strong>{todo.user?.name || "Unknown"}</strong>
                  </div>

                  {todo.user?._id === currentUserId && (
                    <button
                      className={`status-btn ${todo.status === "completed" ? "completed" : "pending"}`}
                      // Pass todo.priority here as the third argument
                      onClick={() => updateStatus(todo._id, todo.status, todo.priority)}
                    >
                      {todo.status === "completed" ? "Mark Pending" : "Mark Complete"}
                    </button>
                  )}
                </div>

              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}

export default Dashboard;