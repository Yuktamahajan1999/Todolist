import express from 'express';
import { getAlluser, registerUser, loginUser, deleteUser, updateUser } from '../Controllers/UserController.js';
import ValidationMiddleware from '../Middlewares/validation.js';
import checkLogin from '../Middlewares/CheckLogin.js';

const userRouter = express.Router();

userRouter.get('/', checkLogin,  getAlluser);
userRouter.post('/register', ValidationMiddleware, registerUser);
userRouter.post('/login', loginUser);
userRouter.put('/update', checkLogin, updateUser);
userRouter.delete('/delete', checkLogin,  deleteUser);

export default userRouter;