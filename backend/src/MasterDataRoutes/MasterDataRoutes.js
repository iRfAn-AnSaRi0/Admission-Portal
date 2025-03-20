import { Router } from "express";
import { GetState } from "../MasterDataController/MasterDataController.js";
import { GetCourse } from "../MasterDataController/MasterDataController.js";
import { GetCity } from "../MasterDataController/MasterDataController.js";

const dataroute = Router();

dataroute.route("/state").get(
    GetState
)
dataroute.route("/city/:stateId").get(
    GetCity
)
dataroute.route("/course").get(
    GetCourse
)

export { dataroute }