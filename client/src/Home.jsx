import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate(); // For programmatically navigating

  // Fetching students data from backend (Express + MySQL)
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:5000/')
      .then(response => {
        setStudents(response.data); // Set students data from backend
      })
      .catch(error => console.error('Error fetching students:', error));
  };

  // Deleting a student
  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`)
      .then(() => {
        setStudents(students.filter(student => student.id !== id)); // Update state after deleting
      })
      .catch(error => console.error('Error deleting student:', error));
  };

  // Navigating to the UpdateRecord page with the student ID
  const handleUpdate = (id) => {
    navigate(`/update/${id}`); // Redirect to update page with the student ID
  };

  return (
    <>
      <div className='container'>
        <h3>Student Management System</h3>
        <div className='input'>
          <input type='search' placeholder='SEARCH' />
          <Link to="/AddRecord" className='btn green'>Add Record</Link>
        </div>

        <table className='table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
              <th>Date of Birth (DOB)</th> {/* New column for DOB */}
              <th>Location</th>
              {students.length > 0 && (
                <>
                  <th>Update</th>
                  <th>Delete</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.firstname}</td>
                  <td>{student.lastname}</td>
                  <td>{student.age}</td>
                  <td>{student.dob}</td> {/* Display DOB here */}
                  <td>{student.location}</td>
                  <td>
                    <button
                      className='btn green'
                      onClick={() => handleUpdate(student.id)}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn red'
                      onClick={() => deleteStudent(student.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
