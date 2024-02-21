import express from 'express';
import { Course } from "../models/courseModel.js";

const router = express.Router();

//Route to add a new Course
router.post('/', async (request, response) => {
    try {
        const {
            _id,
            name,
            duration,
            fees
        } = request.body;

        if (!_id || !name || !duration || !fees) {
            return response.status(400).send({
                message: 'send all required fields'
            });
        }

        const newCourse = {
            _id,
            name,
            duration,
            fees,
        };

        const course = await Course.create(newCourse);

        return response.status(201).send(course);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Get All Courses from database
router.get('/', async (request, response) => {
    try{
        const courses = await Course.find({});

        return response.status(200).json({
            count: courses.length,
            data: courses
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

//Route for Get One Course from database
router.get('/:courseId', async (request, response) => {
    try{
        const { courseId } = request.params;
        const course = await Course.findOne({ _id: courseId });

        if (!course) {
            return response.status(404).send({ message: 'Course not found' });
        }

        return response.status(200).json({course});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

//Route to Update Course
router.put('/:courseId', async (request, response) => {
    try {
        const { courseId } = request.params;
        const {
            name,
            duration,
            fees
        } = request.body;

        if (!courseId || !name || !duration || !fees) {
            return response.status(400).send({
                message: 'Send all required fields'
            });
        }

        const result = await Course.findOneAndUpdate({ _id: courseId }, { name, duration, fees });

        if (!result) {
            return response.status(404).json({ message: 'Course not found' });
        }
        
        return response.status(200).json({ message: 'Course updated' });

    } catch(error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route to Delete Course
router.delete('/:courseId', async (request, response) => {
    try {
        const { courseId } = request.params;
        
        const result = await Course.findOneAndDelete({ _id: courseId });

        if (!result) {
            return response.status(404).json({ message: 'Course not found' });
        }
        
        return response.status(200).json({ message: 'Course deleted' });

    } catch(error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;