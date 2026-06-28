import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "https://todolist-89fe.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user_data",
        JSON.stringify({
          user: res.data.user,
        })
      );

      setUser(res.data.user);

      setUser(res.data.user);

      toast.success('Login successful!', { position: "top-center", autoClose: 1000 });

      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="login-header">
        <h2>Welcome Back 👋</h2>
        <p>Sign in to manage your tasks efficiently.</p>
      </div>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit" className="login-btn">
          Sign In
        </button>
      </form>
      <div className="auth-footer">
        Don't have an account?
        <span onClick={() => navigate("/register")}>Create Account</span>
      </div>
    </div>
  );
}

export default Login;
