import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { StudentDetails } from "../model/Enrollment.js";
import mongoose from "mongoose";



const Application = AsyncHandler(async (req, res) => {
    const { name, email, phone, DOB, gender, result12, state, city, address, course } = req.body;

    if (!name || !email || !phone || !DOB || !gender || !state || !city || !address || !course) {
        throw new ApiError(400, "All fields are required.");
    }

    if (!["Male", "Female", "Other"].includes(gender)) {
        throw new ApiError(400, "Invalid gender selection.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format.");
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        throw new ApiError(400, "Invalid phone number. Must be 10 digits.");
    }


    if (isNaN(new Date(DOB))) {
        throw new ApiError(400, "Invalid Date of Birth.");
    }


    const student = await StudentDetails.create({
        name,
        email,
        phone,
        DOB,
        gender,
        result12,
        state,
        city,
        address,
        course
    });


    if (student) {
        return res.status(200).json(
            new ApiResponse(
                200,
                "Successfully Enroll"
            )
        )
    } else {
        return res.status(500).json(
            new ApiError(
                500,
                "Server Error"
            )
        )
    }

})

const ApplicationUpdate = AsyncHandler(async (req, res) => {
    const ApplicationId = await StudentDetails.findById(req.params.id);

    const { name, email, phone, DOB, gender, result12, state, city, address, course } = req.body;

    if (!name || !email || !phone || !DOB || !gender || !state || !city || !address || !course) {
        throw new ApiError(400, "All fields are required.");
    }

    if (!["Male", "Female", "Other"].includes(gender)) {
        throw new ApiError(400, "Invalid gender selection.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format.");
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        throw new ApiError(400, "Invalid phone number. Must be 10 digits.");
    }


    if (isNaN(new Date(DOB))) {
        throw new ApiError(400, "Invalid Date of Birth.");
    }

    ApplicationId.name = name || ApplicationId.name;
    ApplicationId.email = email || ApplicationId.email;
    ApplicationId.phone = phone || ApplicationId.phone;
    ApplicationId.DOB = DOB || ApplicationId.DOB;
    ApplicationId.gender = gender || ApplicationId.gender;
    ApplicationId.result12 = result12 || ApplicationId.result12;
    ApplicationId.state = state || ApplicationId.state;
    ApplicationId.city = city || ApplicationId.city;
    ApplicationId.address = address || ApplicationId.address;
    ApplicationId.course = course || ApplicationId.course;

    const DetailsUpdate = await ApplicationId.save()

    if (!DetailsUpdate) {
        return res.status(500).json(
            new ApiError(
                500,
                {},
                "Server Error"
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { DetailsUpdate },
            "Application is updated successfully"
        )
    )


})

export { Application, ApplicationUpdate }