import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { StateName } from "../MasterDataModel/StateModel.js";
import { CityName } from "../MasterDataModel/CityModel.js";
import { CourseName } from "../MasterDataModel/CourseModel.js";


const GetState = AsyncHandler(async (req, res) => {
    const state = await StateName.find()

    if (!state) {
        return res.status(500).json(
            new ApiError(
                500,
                "Error fetching states"
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            state,
            "Fetch successfully"
        )
    )
})

const GetCity = AsyncHandler(async (req, res) => {
    const city = await CityName.find({ stateId: req.params.stateId })
    if (!city) {
        return res.status(500).json(
            new ApiError(
                500,
                "Error fetching city"
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            city,
            "Fetch successfully"
        )
    )
})


const GetCourse = AsyncHandler(async (req, res) => {
    const course = await CourseName.find()
    if (!course) {
        return res.status(500).json(
            new ApiError(
                500,
                "Error fetching course"
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            course,
            "Fetch successfully"
        )
    )
})


export { GetState, GetCity, GetCourse }