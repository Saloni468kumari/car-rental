import express from "express";
import { protect } from "../middleware/auth.js";

import {
    getCars,
    getUserData,
    loginUser,
    registerUser,
    googleLogin
} from "../controllers/userController.js";

const userRouter = express.Router();


userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.post("/google-login", googleLogin);

userRouter.get('/data', protect, getUserData);

userRouter.get('/cars', getCars);

export default userRouter;
