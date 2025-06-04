import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRouter from './Router/todoRouter.js';
import userRouter from "./Router/userRouter.js";

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://todolist-lriy.vercel.app",
  "https://todolist-lriy-git-main-yukta-mahajans-projects.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use("/todo", todoRouter);
app.use("/user", userRouter);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});