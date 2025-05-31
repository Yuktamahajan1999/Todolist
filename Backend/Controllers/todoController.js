import Todo from "../Model/todomodal.js";
import User from "../Model/UserModel.js";

// Get all todos
export const getAllTodos = async (req, res) => {
    try {
        console.log("Fetching todos...");
        const data = await Todo.find().populate("user", "name");
        console.log("Todos fetched:", data);
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ success: false, message: "Failed to fetch todos", error: error.message });
    }
};

// Get todo by user
export const getUserTodos = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(400).json({ success: false, message: "User not authenticated" });
        }

        const userId = req.user.id;
        const todos = await Todo.find({ user: userId });

        res.status(200).json({ success: true, data: todos });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch user todos", error: error.message });
    }
};

// Add new todo
export const addTodo = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required." });
        }
        if (!description || !Array.isArray(description) || description.length === 0) {
            return res.status(400).json({ success: false, message: "Description array is required." });
        }

        const newTodo = await Todo.create({ title, description, status, user: req.user.id });
        res.status(201).json({ success: true, message: "Todo created successfully", data: newTodo });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error while creating todo", error });
    }
};



// Update todo
export const updateTodo = async (req, res) => {
    try {
        const id = req.query.id;
        const data = req.body;

        const updatedData = await Todo.findByIdAndUpdate(id, data, { new: true });
        if (!updatedData) {
            return res.status(404).json({ success: false, message: "Todo Not Found" });
        }

        res.status(200).json({ success: true, message: "Todo updated", data: updatedData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating todo", error });
    }
};

// Delete todo
export const deleteTodo = async (req, res) => {
    try {
        const id = req.query.id;

        if (!id) {
            return res.status(400).json({ success: false, message: "Todo ID is required in query" });
        }

        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ success: false, message: "Todo Not Found" });
        }

        res.status(200).json({ success: true, message: "Todo Deleted Successfully", data: deletedTodo });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting todo", error });
    }
};

