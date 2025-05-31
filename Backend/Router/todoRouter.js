import express from "express";
import { getAllTodos, addTodo, deleteTodo, updateTodo, getUserTodos } from "../Controllers/todoController.js";
import checkLogin from "../Middlewares/CheckLogin.js";

let todoRouter = express.Router();

todoRouter.get("/getAlltodos", checkLogin, getAllTodos);
todoRouter.get("/mytodos", checkLogin, getUserTodos);

todoRouter.post("/addtodo", checkLogin, addTodo);

todoRouter.put('/updatetodo', checkLogin, updateTodo);
todoRouter.delete('/deletetodo', checkLogin, deleteTodo);

export default todoRouter;

