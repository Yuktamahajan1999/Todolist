import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import TodoTask from "./TodoTask";
import Dashboard from "./Dashboard";
import Profile from "./Profile"; 
import { ToastContainer } from "react-toastify";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import TaskManager from "./My_Tasks";

function App() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user_data"));
    if (userdata && userdata.user) {
      setUser(userdata.user);
    }
  }, [setUser]);


  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<TaskManager />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/todotask" element={<TodoTask />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Added Route setup mapping configuration block */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>

      <ToastContainer />
    </Router>
  );
}

export default App;