import { Router } from "express";
import { UserAuthentication } from "../middleware/AuthMiddleware.js";
import { Application } from "../controller/ApplicationController.js";
import { ApplicationUpdate } from "../controller/ApplicationController.js";
import { Upload } from "../middleware/MulterMiddleware.js";

const applicationrouter = Router()

applicationrouter.route("/apply").post(
    UserAuthentication, 
    Upload.single("result"), 
    Application
)


applicationrouter.route("/update/application/:id").put(
    UserAuthentication, 
    ApplicationUpdate
)

export { applicationrouter }