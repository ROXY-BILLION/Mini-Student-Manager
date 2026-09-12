import { FiUser, FiMail, FiBookOpen, FiCalendar } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { useState,useEffect } from "react";
import axios from "axios";

import "./App.css";
const API_URL = import.meta.env.VITE_API_URL 


function App() {

  const [formData, setFormData] = useState({ name: "", email: "", course: "", age: "" })
  const [students, setStudents] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/students`);
        setStudents(response.data);
      } catch (error) {
        console.error("Failed to fetch students", error);
      }
    };

    fetchStudents();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData, [name]: value
    });
  }

  const handleAdd = async (event) => {
  event.preventDefault();

  try {
    if (editingStudentId) {
      // UPDATE STUDENT
      const response = await axios.put(
        `${API_URL}/api/students/${editingStudentId}`,
        formData
      );

      const updatedStudents = students.map((student) =>
        student._id === editingStudentId
          ? response.data
          : student
      );

      setStudents(updatedStudents);
      setEditingStudentId(null);

    } else {
      // ADD STUDENT
      const response = await axios.post(
        `${API_URL}/api/students`,
        formData
      );

      setStudents([...students, response.data]);
    }

    // Clear form
    setFormData({
      name: "",
      email: "",
      course: "",
      age: ""
    });

  } catch (error) {
    console.error("Failed to save student", error);
  }
};
  const handleEdit = (student) => {
    setEditingStudentId(student._id);
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
      age: student.age
    });
  };

const handleDelete = async (studentId) => {
  try {
    await axios.delete(`${API_URL}/api/students/${studentId}`);
    const updatedStudents = students.filter((student) => student._id !== studentId);
    setStudents(updatedStudents);
  } catch (error) {
    console.error("Failed to delete student", error);
  }
};
  
  return (
    <main>
      {/* Header */}
      <header className="page-header">
        <div className="brand">
          <div className="brand-icon">
            <FaGraduationCap />
          </div>

          <div>
            <h1>Mini Student Manager</h1>
            <p>Manage your students and courses.</p>
          </div>
        </div>
      </header>

      {/* Add Student */}
      <section className="form-section">
        <h2>Add Student</h2>

        <form onSubmit={handleAdd}>
          <div className="form-grid">
            <div className="input-wrapper">
              <FiUser />
              <input
                type="text"
                name="name"
                placeholder="Student name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <FiMail />
              <input
                type="email"
                name="email"
                placeholder="Student email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <FiBookOpen />
              <input
                type="text"
                name="course"
                placeholder="Course"
                value={formData.course}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <FiCalendar />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="add-button" type="submit">
          {editingStudentId ? "Update Student" : "Add Student"}
         </button>
        </form>
      </section>

      {/* Students */}
      <section className="students-section">
        <div className="section-heading">
          <h2>Students</h2>
          <span>{students.length} students</span>
        </div>

        <div className="students-list">
          {students.map((student) => (
            <div className="student-card" key={student._id}>
              <div className="student-info">
                <h3>{student.name}</h3>
                <p>Email: {student.email}</p>
                <p>Course: {student.course}</p>
                <p>Age: {student.age}</p>
                <button className="edit-button" onClick={() => handleEdit(student)}>
                  {editingStudentId === student._id ? "Cancel Edit" : "Edit"}
                </button>
                <button className="delete-button" onClick={() => handleDelete(student._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;