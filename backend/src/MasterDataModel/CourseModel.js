import mongoose, {Schema} from "mongoose";
const courseSchema = new Schema({
    name:{
        type:String,
        required: true, 
        unique: true 
    }
})

export const CourseName = mongoose.model("CourseName", courseSchema)