import React from 'react'
import './App.css';

const Home = () => {
  return (
      <div className='container'>
        <h3> student management system</h3>
        <div className='input'><input type='search'/>
        <link to ="/create" className='btn green'> Add Record </link>
        </div>
        <table className='table'>
         <thead>
          <tr>
            <th>Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
            <th>Location</th>
            <th>Update</th>
            <th>Delete</th>
            </tr>
          </thead> 
          <tbody>
            <td> 1</td>
            <td>Surya</td>
            <td>Prasanth</td>
            <td>22</td>
            <td>Madurai</td>
            <td> <button className='btn green ' >Update</button></td>
            <td> <button className='btn red'>Delete</button></td>
          </tbody>
          </table>
    </div>
  )
}

export default Home
