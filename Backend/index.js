import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todorouter from './Router/todoRouter.js';
import userRouter from "./Router/userRouter.js"; 

const app = express();
app.use(express.json());
app.use(cors());

app.use("/todo", todorouter);
app.use("/user", userRouter);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
