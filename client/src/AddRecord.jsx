import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddRecord = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState(''); 
  const [location, setLocation] = useState('');
  const navigate = useNavigate();  

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = {
      firstname,
      lastname,
      age: parseInt(age, 10), 
      dob,  
      location,
    };

    
    axios.post('http://localhost:5000/students', newStudent) 
      .then(response => {
        console.log('Student added:', response.data);
        
        navigate('/');
      })
      .catch(error => {
        console.error('Error adding the student:', error);
      });
  };

  
  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <div className='formedit'>
        <form onSubmit={handleSubmit}>
          <label className='label'>Enter Your FirstName:</label>
          <br />
          <br />
          <input
            type='text'
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <br />
          <br />
          <label className='label'>Enter Your LastName:</label>
          <br />
          <br />
          <input
            type='text'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <br />
          <br />
          <label className='label'>Enter Your Age:</label>
          <br />
          <br />
          <input
            type='text'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <br />
          <br />
          <label className='label'>Enter Your Date of Birth (DOB):</label> {/* New label for DOB */}
          <br />
          <br />
          <input
            type='date' // Date input type for DOB
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <br />
          <br />
          <label className='label'>Enter Your Location:</label>
          <br />
          <br />
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <br />
          <br />
          <input type='submit' className='btn1' value='Submit' />
          <button type='button' className='btn2' onClick={handleBack}>Back</button>
        </form>
      </div>
    </>
  );
};

export default AddRecord;
