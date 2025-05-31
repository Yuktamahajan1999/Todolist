import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import { toast } from "react-toastify";

function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        toast.success("Logged out successfully", {
            position: "top-center",
            autoClose: 2000,
        });
        navigate("/login");
    };

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <h2 className="logo">📝 To-Do App</h2>
                <div className="nav-links">
                    <Link to="/todohub">To-Do Hub</Link>
                    <Link to="/register">Register</Link>
                    {user ? (
                        <button className="nav-button logout-button" onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                    <Link to="/">To-Do List</Link>
                    <Link to="/todotask">To-Do Tasks List</Link>
                </div>
            </nav>
        </div>
    );
}
export default Navbar;
