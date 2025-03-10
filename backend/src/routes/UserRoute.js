import { Router } from "express";
import { SignUp } from "../controller/UserController.js"
import { Login } from "../controller/UserController.js";
import { GetUser } from "../controller/UserController.js";
import { Logout } from "../controller/UserController.js";
import { RefreshTheToken } from "../controller/UserController.js";
import { Authentication } from "../middleware/AuthMiddleware.js";


const userrouter = Router();

userrouter.route("/signup").post(
    SignUp
)

userrouter.route("/login").post(
    Login
)

userrouter.route("/profile").get(
    Authentication, GetUser
)

userrouter.route("/logout").post(
    Authentication, Logout
)

userrouter.route("/refreshtoken").post(
    RefreshTheToken
)

export { userrouter }