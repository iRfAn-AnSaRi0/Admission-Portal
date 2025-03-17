import { Router } from "express";
import { AdminSignUp } from "../controller/AdminController.js";
import { AdminLogin } from "../controller/AdminController.js";
import { AdminLogout } from "../controller/AdminController.js";
import { ApplicationCheck } from "../controller/AdminController.js";
import { Applications } from "../controller/AdminController.js";
import { Authentication } from "../middleware/AuthMiddleware.js";
import { GetApplication } from "../controller/AdminController.js";


const adminrouter = Router()


adminrouter.route("/signup").post(
    AdminSignUp
)

adminrouter.route("/login").post(
    AdminLogin
)

adminrouter.route("/logout").post(
//    Authentication,
    AdminLogout
)

adminrouter.route("/:id/application").put(
    //  Authentication,  
    ApplicationCheck
)
adminrouter.route("/application/:id").get(
    // Authentication,  
    GetApplication
)
adminrouter.route("/applications").get(
    // Authentication,
    Applications
)

export { adminrouter }