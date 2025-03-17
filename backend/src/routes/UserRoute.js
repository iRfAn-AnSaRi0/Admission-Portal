import { Router } from "express";
import { SignUp } from "../controller/UserController.js"
import { Login } from "../controller/UserController.js";
import { GetUser } from "../controller/UserController.js";
import { Logout } from "../controller/UserController.js";
import { RefreshTheToken } from "../controller/UserController.js";
import { UserAuthentication } from "../middleware/AuthMiddleware.js";


const userrouter = Router();

userrouter.route("/signup").post(
    SignUp
)

userrouter.route("/login").post(
    Login
)

userrouter.route("/profile").get(
    UserAuthentication, GetUser
)

userrouter.route("/logout").post(
    UserAuthentication, Logout
)

userrouter.route("/refreshtoken").post(
    RefreshTheToken
)

export { userrouter }