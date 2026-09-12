const express = require("express");
const { createStudent, getStudents , updateStudent,deleteStudent} = require("../controllers/studentcontroller");


const router = express.Router();
router.post("/", createStudent);
router.get("/", getStudents);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
