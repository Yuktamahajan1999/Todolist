
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";
import Navbar from './Pages/Navbar'
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import TodoTask from "./TodoTask";
import { ToastContainer } from "react-toastify";
import ToDoHub from "./ToDoHub";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useEffect } from "react";
function App() {
  const {setUser} = useContext(UserContext)

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user_data"));
    if (userdata && userdata.user) {
      setUser(userdata.user);
    }
  }, [setUser]);
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todotask" element={<TodoTask />} />
        <Route path="/todohub" element={<ToDoHub />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

