import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";

import {
    MdDashboard,
    MdOutlineTaskAlt,
    MdOutlineAssignment,
    MdLogout,
} from "react-icons/md";

import {
    FaUserPlus,
    FaSignInAlt,
} from "react-icons/fa";

function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = (e) => {
        e.preventDefault(); 
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user_data");

        toast.success("Logged out successfully", {
            position: "top-center",
            autoClose: 2000,
        });

        navigate("/login");
    };

    const isActive = (path) => location.pathname === path ? "active" : "";

    return (
        <header className="navbar-header">
            <nav className="navbar-container">

                {/* Top Section: Logo */}
                <div className="navbar-brand">
                    <Link to="/" className="navbar-logo">
                        <span className="logo-icon">📋</span>
                        <span className="logo-text">TaskFlow</span>
                    </Link>
                </div>

                {/* Middle Section: Navigation Links */}
                <div className="navbar-menu">
                    <Link to="/dashboard" className={`nav-link ${isActive("/dashboard")}`}>
                        <MdDashboard className="nav-icon" />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/todotask" className={`nav-link ${isActive("/todotask")}`}>
                        <MdOutlineTaskAlt className="nav-icon" />
                        <span>My Tasks</span>
                    </Link>

                    <Link to="/" className={`nav-link ${isActive("/")}`}>
                        <MdOutlineAssignment className="nav-icon" />
                        <span>Task Manager</span>
                    </Link>
                </div>

                {/* Bottom Section: Authentication & Profile Info */}
                <div className="navbar-actions">
                    {!user ? (
                        <div className="auth-button-group">
                            <Link to="/login" className="nav-btn btn-secondary">
                                <FaSignInAlt className="nav-icon" />
                                <span>Sign In</span>
                            </Link>
                            <Link to="/register" className="nav-btn btn-primary">
                                <FaUserPlus className="nav-icon" />
                                <span>Get Started</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="user-sidebar-profile-box">
                            {/* Profile Badge Link */}
                            <Link
                                to="/profile"
                                className={`profile-badge-link ${isActive("/profile")}`}
                            >
                                <div className="avatar-circle">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : "Y"}
                                </div>

                                <div className="user-details">
                                    <span className="user-name">{user.name || "User"}</span>
                                    {user?.email && <span className="user-email">{user.email}</span>}
                                </div>
                            </Link>

                            {/* Clean, Scannable Logout Option */}
                            <button
                                className="nav-btn btn-logout-sidebar"
                                onClick={handleLogout}
                                aria-label="Log out"
                            >
                                <MdLogout className="nav-icon" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>

            </nav>
        </header>
    );
}

export default Navbar;