import mongoose, { Schema } from "mongoose";

const citySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StateName',
        required: true
    }
});

export const CityName = mongoose.model("CityName", citySchema)
