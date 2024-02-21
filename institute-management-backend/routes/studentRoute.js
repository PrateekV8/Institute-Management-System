import express from 'express';
import { Student } from '../models/studentModel.js';

const router = express.Router();

//Route to add a new Student
router.post('/', async (request, response) => {
    try {
        const {
            _id,
            studentName,
            fatherName,
            motherName,
            doB,
            phone,
            address
        } = request.body;

        if (!_id || !studentName || !fatherName || !motherName || !doB || !phone || !address) {
            return response.status(400).send({
                message: 'send all required fields'
            });
        }

        const newStudent = {
            _id,
            studentName,
            fatherName,
            motherName,
            doB,
            phone,
            address,
        };

        const student = await Student.create(newStudent);

        return response.status(201).send(student);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Get All Students from database
router.get('/', async (request, response) => {
    try{
        const students = await Student.find({});

        return response.status(200).json({
            count: students.length,
            data: students
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

//Route for Get One Student from database
router.get('/:studentId', async (request, response) => {
    try{
        const { studentId } = request.params;
        const student = await Student.findOne({ _id: studentId });

        if (!student) {
            return response.status(404).send({ message: 'Student not found' });
        }

        return response.status(200).json({student});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

//Route to Update a Student Data
router.put('/:studentId', async (request, response) => {
    try {
        const { studentId } = request.params;
        const {
            studentName,
            fatherName,
            motherName,
            doB,
            phone,
            address
        } = request.body;

        if (!studentId || !studentName || !fatherName || !motherName || !doB || !phone || !address) {
            return response.status(400).send({
                message: 'send all required fields'
            });
        }

        const result = await Student.findOneAndUpdate({ _id: studentId }, request.body);

        if (!result) {
            return response.status(404).json({ message: 'student not found' });
        }
        
        return response.status(200).json({ message: 'student updated' });

    } catch(error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route to delete student data
router.delete('/:studentId', async (request, response) => {
    try {
        const { studentId } = request.params;
        
        const result = await Student.findOneAndDelete({ _id: studentId });

        if (!result) {
            return response.status(404).json({ message: 'Student not found' });
        }
        
        return response.status(200).json({ message: 'Student deleted' });

    } catch(error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;