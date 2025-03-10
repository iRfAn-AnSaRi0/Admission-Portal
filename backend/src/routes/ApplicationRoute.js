import { Router } from "express";
import { Authentication } from "../middleware/AuthMiddleware.js";
import { Application } from "../controller/ApplicationController.js";
import { ApplicationUpdate } from "../controller/ApplicationController.js";
import { Upload } from "../middleware/MulterMiddleware.js";

const applicationrouter = Router()

applicationrouter.route("/apply").post(
    //  Authentication , 
    Upload.fields([
        {
         name:"result",
         maxCount:1
        }
     ]),  
    Application
)

// Not Tested APIs
applicationrouter.route("/:id/update/application").put(
    //  Authentication , 
    ApplicationUpdate
)

export { applicationrouter }