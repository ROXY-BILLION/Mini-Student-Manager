const Student = require("../models/Student");

const createStudent = async (req, res) => {
    try {
        const { name, email, course, age } = req.body;
        const student = await Student.create({ name, email, course, age });
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({
            message: "failed to created student"
        });
    }
};
const getStudents = async (req,res)=>{
    try{
        const student = await Student.find();
        res.status(200).json(student);
    }catch(error){
        res.status(500).json({
            message: "failed to get student"
        })
    }
};
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, course, age } = req.body;
        const student = await Student.findByIdAndUpdate(id, { name, email, course, age }, { new: true });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({
            message: "failed to update student"
        });
    }
};
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "failed to delete student"
        });
    }
};

module.exports = { createStudent, getStudents, updateStudent, deleteStudent };