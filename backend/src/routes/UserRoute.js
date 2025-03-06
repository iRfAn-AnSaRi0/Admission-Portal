import { Router } from "express";
import { SignUp } from "../controller/UserController.js"
import { Login } from "../controller/UserController.js";
import { GetUser } from "../controller/UserController.js";
import { Logout } from "../controller/UserController.js";
import { RefreshTheToken } from "../controller/UserController.js";
import { Authentication } from "../middleware/AuthMiddleware.js";


const router = Router();

router.route("/signup").post(
    SignUp
)

router.route("/login").post(
    Login
)

router.route("/profile").get(
    Authentication, GetUser
)

router.route("/logout").post(
    Authentication, Logout
)

router.route("/refreshtoken").post(
    RefreshTheToken
)

export { router }