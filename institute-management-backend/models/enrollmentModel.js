import mongoose from "mongoose";

const enrollmentSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    student: {
        type: String, 
        ref: 'Student', 
        required: true
    },
    course: {
        type: String, 
        ref: 'Course', 
        required: true
    },
    committedFees: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        maxlength: 255
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);