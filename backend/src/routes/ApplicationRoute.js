import { Router } from "express";
import { Authentication } from "../middleware/AuthMiddleware.js";
import { Application } from "../controller/ApplicationController.js";
import { ApplicationUpdate } from "../controller/ApplicationController.js";
import { Upload } from "../middleware/MulterMiddleware.js";

const applicationrouter = Router()

applicationrouter.route("/apply").post(
    Authentication , 
    Upload.single("result"), 
    Application
)


applicationrouter.route("/update/application/:id").put(
    Authentication , 
    ApplicationUpdate
)

export { applicationrouter }