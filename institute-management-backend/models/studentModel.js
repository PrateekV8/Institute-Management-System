import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        studentName: {
            type: String,
            required: true,
        },
        fatherName: {
            type: String,
            required: true,
        },
        motherName: {
            type: String,
            required: true,
        },
        doB: {
            type: Date,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

export const Student = mongoose.model('Student', studentSchema);