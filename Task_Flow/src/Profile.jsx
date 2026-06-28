import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { MdEmail, MdDoneAll, MdListAlt, MdHourglassEmpty, MdLogout } from 'react-icons/md';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  // Local state to keep track of real task statistics
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const API_URL = import.meta.env.VITE_API_URL || "https://todolist-89fe.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user's tasks to calculate live summary numbers
      axios.get(`${API_URL}/todo/getAlltodos`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(res => {
        if (res.data && res.data.data) {
          const tasks = res.data.data;
          const completed = tasks.filter(t => t.status === "completed").length;
          setStats({
            total: tasks.length,
            completed: completed,
            pending: tasks.length - completed
          });
        }
      })
      .catch(err => console.error("Error loading profile stats:", err));
    }
  }, [API_URL]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const getAvatarLetter = () => {
    return user?.name ? user.name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="simple-profile-container">
      <div className="profile-main-card">
        
        {/* User Info Section */}
        <div className="profile-user-section">
          <div className="profile-circle-avatar">
            {getAvatarLetter()}
          </div>
          <h2>{user?.name || "Task Manager User"}</h2>
          <div className="profile-user-email">
            <MdEmail className="email-icon" />
            <span>{user?.email || "No email provided"}</span>
          </div>
        </div>

        <hr className="profile-divider" />

        {/* Task Summary Metrics Section */}
        <div className="profile-stats-section">
          <h3>Your Task Progress</h3>
          
          <div className="profile-stat-row">
            <div className="stat-label-group">
              <MdListAlt className="stat-icon total" />
              <span>Total Tasks Created</span>
            </div>
            <span className="stat-number">{stats.total}</span>
          </div>

          <div className="profile-stat-row">
            <div className="stat-label-group">
              <MdDoneAll className="stat-icon completed" />
              <span>Completed Tasks</span>
            </div>
            <span className="stat-number text-success">{stats.completed}</span>
          </div>

          <div className="profile-stat-row">
            <div className="stat-label-group">
              <MdHourglassEmpty className="stat-icon pending" />
              <span>Pending Review</span>
            </div>
            <span className="stat-number text-pending">{stats.pending}</span>
          </div>
        </div>

        {/* Simple Logout Trigger */}
        <button className="profile-simple-logout-btn" onClick={handleLogout}>
          <MdLogout /> Log Out
        </button>

      </div>
    </div>
  );
}

export default Profile;