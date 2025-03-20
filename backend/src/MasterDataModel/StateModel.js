import mongoose, { Schema } from "mongoose"

const stateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

export const StateName = mongoose.model("StateName", stateSchema)

