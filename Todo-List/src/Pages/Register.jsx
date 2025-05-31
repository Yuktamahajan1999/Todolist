// components/Register.jsx
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/user/register", formData);
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
                style: { marginBottom: "150px"},
            });
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
