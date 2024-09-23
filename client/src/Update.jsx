import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const UpdateRecord = () => {
    const { id } = useParams();  // Get the student's ID from the URL
    const navigate = useNavigate();

    // State to store student data
    const [student, setStudent] = useState({
        firstname: '',
        lastname: '',
        age: '',
        dob: '',  // New state field for DOB
        location: ''
    });

    const [error, setError] = useState(''); // State to handle errors
    const [loading, setLoading] = useState(false); // State to handle loading

    // Fetch the student details when the component loads
    useEffect(() => {
        axios.get(`http://localhost:5000/read/${id}`)
            .then(response => {
                const data = response.data[0]; // Get the student object from response
                setStudent({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    age: data.age,
                    dob: data.dob,  // Set the DOB fetched from backend
                    location: data.location
                });
            })
            .catch(error => setError('Error fetching student details.'));
    }, [id]);

    // Handles input changes
    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    // Handles form submission for updating student
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // PUT request to the backend to update the student
        axios.put(`http://localhost:5000/edit_user/${id}`, student)
            .then(response => {
                console.log('Student updated:', response.data);
                setLoading(false);
                navigate('/');  // Redirect to home page after successful update
            })
            .catch(error => {
                setError('Error updating the student.');
                setLoading(false);
            });
    };

    // Handles "Back" button click to navigate to the home page
    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className='formedit'>
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>} {/* Error message */}
                <label className='label'>Update FirstName:</label>
                <br />

                <input
                    type='text'
                    name='firstname'
                    value={student.firstname}
                    onChange={handleChange}
                    required
                />
                <br />
                <br />
                <label className='label'>Update LastName:</label>
                <br />
                <input
                    type='text'
                    name='lastname'
                    value={student.lastname}
                    onChange={handleChange}
                    required
                />
                <br />
                <br />
                <label className='label'>Update Age:</label>
                <br />
                <input
                    type='number'
                    name='age'
                    value={student.age}
                    onChange={handleChange}
                    min="1"
                    max="150"
                    required
                />
                <br />
                <br />
                <label className='label'>Update Date of Birth (DOB):</label> {/* New field for DOB */}
                <br />
                <input
                    type='date'
                    name='dob'
                    value={student.dob}
                    onChange={handleChange}
                    required
                />
                <br />
                <br />
                <label className='label'>Update Location:</label>
                <br />
                <input
                    type='text'
                    name='location'
                    value={student.location}
                    onChange={handleChange}
                    required
                />
                <br />
                <br />
                <input
                    type='submit'
                    className='btn1'
                    value={loading ? 'Updating...' : 'Update'}
                    disabled={loading}
                />
                <button type='button' className='btn2' onClick={handleBack}>Back</button>
            </form>
        </div>
    );
};

export default UpdateRecord;
