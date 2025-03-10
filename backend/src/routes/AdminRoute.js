import { Router } from "express";
import { AdminSignUp } from "../controller/AdminController.js";
import { AdminLogin } from "../controller/AdminController.js";
import { AdminLogout } from "../controller/AdminController.js";
import { ApplicationCheck } from "../controller/AdminController.js";
import { Authentication } from "../middleware/AuthMiddleware.js";


const adminrouter = Router()


adminrouter.route("/signup").post(
    AdminSignUp
)

adminrouter.route("/login").post(
    AdminLogin
)

adminrouter.route("/logout").post(
   Authentication, AdminLogout
)

// Not Tested APIs
adminrouter.route("/:id/appliaction").put(
    Authentication,  ApplicationCheck
)

export { adminrouter }