import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"

const adminSchema = new Schema({
    adminname: {
        type: String,
        required: true
    },
    adminemail: {
        type: String,
        required: true
    },
    adminpassword: {
        type: String,
        required: true
    }
}, { timestamps: true })

adminSchema.pre("save", async function (next){
    if(!this.isModified("adminpassword")) return next();
    this.adminpassword = await bcrypt.hash(this.adminpassword, 10)
    next()
})

export const AdminDetails = mongoose.model("AdminDetails", adminSchema)