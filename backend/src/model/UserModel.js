import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import { type } from "os";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    appliactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentDetails"
    },
    refreshtoken: {
        type: String
    }

}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
})


export const UserDetails = mongoose.model("UserDetails", userSchema)