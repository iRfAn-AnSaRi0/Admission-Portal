import { Router } from "express";
import { Authentication } from "../middleware/AuthMiddleware.js";
import { Application } from "../controller/ApplicationController.js";
import { ApplicationUpdate } from "../controller/ApplicationController.js";

const applicationrouter = Router()

applicationrouter.route("/apply").post(
    //  Authentication , 
    Application
)

// Not Tested APIs
applicationrouter.route("/:id/update/application").put(
    //  Authentication , 
    ApplicationUpdate
)

export { applicationrouter }