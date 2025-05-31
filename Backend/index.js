import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todorouter from './Router/todoRouter.js';
import userRouter from "./Router/userrouter.js"; 

const app = express();
app.use(express.json());
app.use(cors());

app.use("/todo", todorouter);
app.use("/user", userRouter);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

app.listen(8000, () => {
    console.log("Server started on port 8000");
});
