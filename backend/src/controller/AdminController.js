import { AdminDetails } from "../model/AdminModel.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { StudentDetails } from "../model/Enrollment.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import mongoose from "mongoose";

const GenerateJWTToken = async (admin) => {
    const AccessToken = jwt.sign(
        { id: admin.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )

    return { AccessToken }
}


const AdminSignUp = AsyncHandler(async (req, res) => {
    const { adminname, adminemail, adminpassword } = req.body

    if (!adminname || !adminemail || !adminpassword) {
        throw new ApiError(400, "All fields are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(adminemail)) {
        throw new ApiError(400, "Invalid email format.");
    }

    const adminExists = await AdminDetails.findOne({ adminemail });
    if (adminExists) {
        return res.status(400).json(
            new ApiError(
                400,
                "Admin Already Exists"
            )

        )
    }

    const admincreate = await AdminDetails.create({
        adminname,
        adminemail,
        adminpassword
    })

    if (admincreate) {
        return res.status(200).json(
            new ApiResponse(
                200,
                "Register Successfully"
            )
        )
    } else {
        return res.status(500).json(
            new ApiError(
                500,
                "Internal Server Error"
            )
        )
    }

})


const AdminLogin = AsyncHandler(async (req, res) => {
    const { adminemail, adminpassword } = req.body;

    const admin = await AdminDetails.findOne({ adminemail });

    if (!admin) {
        return res.status(400).json(
            new ApiError(
                400,
                "Invalid email"
            )
        )
    }


    const passwordcheck = await bcrypt.compare(adminpassword, admin.adminpassword)

    if (!passwordcheck) {
        return res.status(400).json(
            new ApiError(
                400,
                "Invalid password"
            )
        )
    }

    const { AccessToken } = await GenerateJWTToken(admin);

    const option = {
        httpOnly: true,
        // secure : true 
    }

    return res.status(200)
        .cookie("AccessToken", AccessToken, option)
        .json(
            new ApiResponse(
                200,
                {
                    AccessToken,
                    admin: {
                        id: admin._id,
                        adminname: admin.adminname,
                        adminemail: admin.adminemail
                    }
                },
                "Login Successfully"
            )
        )
})

const AdminLogout = AsyncHandler(async (_, res) => {
    const Option = {
        httpOnly: true,
        // secure: true
    }

    return res.status(200)
        .clearCookie("AccessToken", Option)
        .json(
            new ApiResponse(
                200,
                "Logout Successfully"
            )
        )
})

const ApplicationCheck = AsyncHandler(async (req, res) => {
    const appliactionId = await StudentDetails.findById(req.params.id)

    const { remark, status } = req.body

    if (!["Accepted", "Rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    if (!appliactionId) {
        throw new ApiError(400, "Invalid Appliaction ID")
    }

    const updatedStatus = await StudentDetails.findByIdAndUpdate(
        appliactionId,
        { status, remark },
        { new: true }
    );

    if (!updatedStatus) {
        return res.status(500).json(
            new ApiError(
                500,
                "Server Error"
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            "Successfully Update Status"
        )
    )

})


export { AdminSignUp, AdminLogin, AdminLogout, ApplicationCheck }