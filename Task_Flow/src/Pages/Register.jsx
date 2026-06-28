// components/Register.jsx
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || "https://todolist-89fe.onrender.com";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/user/register`, formData);
            toast.success(response.data.msg || "Registration successful!", {
                position: "top-center",
                autoClose: 2000,
                style: { marginBottom: "150px" },
            });
            navigate("/login");
        } catch (error) {
            const errorMsg = error.response?.data?.msg || "Registration failed!";
            toast.error(errorMsg, {
                position: "top-center",
                autoClose: 2000,
                style: { marginBottom: "150px" },
            });
        }
    };

    return (
        <div className="auth-container">
            <div className="login-header">
                <h2>Create Your Account 🚀</h2>
                <p>Start managing your tasks with TaskFlow.</p>
            </div>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label>Full Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    onChange={handleChange}
                />

                <label>Email Address</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    onChange={handleChange}
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    required
                    onChange={handleChange}
                />
                <button type="submit">Create Account</button>
            </form>
            <div className="auth-footer">
                Already have an account?
                <span onClick={() => navigate("/login")}>
                    Sign In
                </span>
            </div>
        </div>
    );
}

export default Register;
