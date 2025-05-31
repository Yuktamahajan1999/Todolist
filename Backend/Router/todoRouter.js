import express from "express";
import { getAllTodos, addTodo, deleteTodo, updateTodo, getUserTodos } from "../Controllers/todoController.js";
import checkLogin from "../Middlewares/CheckLogin.js";

let todorouter = express.Router();

todorouter.get("/getAlltodos", checkLogin, getAllTodos);
todorouter.get("/mytodos", checkLogin, getUserTodos);

todorouter.post("/addtodo", checkLogin, addTodo);

todorouter.put('/updatetodo', checkLogin, updateTodo);
todorouter.delete('/deletetodo', checkLogin, deleteTodo);

export default todorouter;

