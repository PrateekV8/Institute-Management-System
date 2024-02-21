import mongoose from "mongoose";


const courseSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        fees: {
            type: Number,
            required: true,
        },
    }
);


export const Course = mongoose.model('Course', courseSchema);