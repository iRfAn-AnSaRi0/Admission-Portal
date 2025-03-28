import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { StudentDetails } from "../model/ApplicationModel.js";
import { UserDetails } from "../model/UserModel.js";
import { UploadFile } from "../utils/Cloudinary.js";
import mongoose from "mongoose";

const Application = AsyncHandler(async (req, res) => {
    const { name, email, phone, DOB, gender, state, city, address, course } = req.body;

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
    const formattedDOB = new Date(DOB).toISOString().split('T')[0];
    console.log("File received:", req.file);

    const fileLocalPath = req.file?.path;
    if (!fileLocalPath) {
        throw new ApiError(400, "Result file is required.");
    }

    const fileUpload = await UploadFile(fileLocalPath);
    if (!fileUpload) {
        throw new ApiError(400, "Result image is required")
    }

    const user = req.user.id

    const student = await StudentDetails.create({
        name,
        email,
        phone,
        DOB,
        gender,
        result: fileUpload.url,
        state,
        city,
        address,
        course
    });

    await UserDetails.findByIdAndUpdate(
        user,
        { $push: { appliactionId: student._id } },
        { new: true } 
    );
    console.log(student);


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

    const { name, email, phone, DOB, gender, state, city, address, course } = req.body;
    const ApplicationId = await StudentDetails.findById(req.params.id);

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

    const formattedDOB = new Date(DOB).toISOString().split('T')[0];

    let updatedResult = ApplicationId.result; // Retain existing image by default
    const fileLocalPath = req.file?.path;

    if (fileLocalPath) {
        const fileUpload = await UploadFile(fileLocalPath);

        if (!fileUpload) {
            throw new ApiError(400, "Result file upload failed.");
        }

        updatedResult = fileUpload.url;
    }



    ApplicationId.name = name || ApplicationId.name;
    ApplicationId.email = email || ApplicationId.email;
    ApplicationId.phone = phone || ApplicationId.phone;
    ApplicationId.DOB = DOB || ApplicationId.DOB;
    ApplicationId.gender = gender || ApplicationId.gender;
    ApplicationId.result = updatedResult
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