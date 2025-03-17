import { UserDetails } from "../model/UserModel.js";
import { AdminDetails } from "../model/AdminModel.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"


const UserAuthentication = AsyncHandler(async (req, _, next) => {

    try {
        const usertoken = req.cookies?.AccessToken || (authHeader && authHeader.startsWith("Bearer", "") ? authHeader.slice(7) : null)
        console.log(usertoken);

        if (!usertoken) {
            return res.status(401).json(
                new ApiError(401, "Unauthorized Access")
            )
        }

        const UserDecode = jwt.verify(usertoken, process.env.ACCESS_TOKEN_SECRET);
       

        const user = await UserDetails.findById(UserDecode.id)
       

        if (!user) {
            throw new ApiError(401, "Invalid User")
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Token")
    }
})

const AdminAuthentication = AsyncHandler(async (req, _, next) => {

    try {
          const admintoken = req.cookies?.Token || (authHeader && authHeader.startsWith("Bearer", "") ? authHeader.slice(7) : null)
          console.log(admintoken);

        if (!admintoken) {
            return res.status(401).json(
                new ApiError(401, "Unauthorized Access")
            )
        }
         const AdminDecode = jwt.verify(admintoken, process.env.ACCESS_TOKEN_SECRET);

         const admin = await AdminDetails.findById(AdminDecode.id)

        if (!admin) {
            throw new ApiError(401, "Invalid Admin")
        }
        req.user = admin;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Token")
    }
})


export { UserAuthentication, AdminAuthentication }