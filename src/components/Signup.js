import React, { useState} from 'react'
import {useNavigate} from 'react-router-dom';

const Signup = (props)  => {

  const {showAlert}= props

  const [credentials, setCredentials] = useState({email: "", password: "", name:"", cpassword:""});
    let navigate = useNavigate();
  const handleSubmit = async (event) => {
  event.preventDefault();

  // 1. Destructure all 4 variables from credentials first
  const { name, email, password, cpassword } = credentials;
  
  // 2. Now you can safely use cpassword here
  if (password !== cpassword) {
    alert("Passwords do not match!");
    return;
  }
  
  try {
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // We only send name, email, and password to the backend
      body: JSON.stringify({ name, email, password }) 
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Error Response:", errorText);
      alert("Something went wrong on the server.");
      return;
    }

    const json = await response.json();
    if (json.success){
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert("Account created successfully!!", "success")
    } else {
      props.showAlert("Invalid credentials!!", "danger");
    }
  } catch (error) {
    console.error("Network or parsing error:", error);
    alert("Could not connect to the server.");
  }
};
    const onChange=(event)=>{
      setCredentials({...credentials, [event.target.name]: event.target.value});
    }


  return (
      <div className='mt-2'>
      <h2 className='my-3'>Create an account to use Roommanagment</h2>
      <form onSubmit={handleSubmit}>
  <div className="my-3">
    <label htmlFor="email" className="form-label">Name</label>
    <input type="text" className="form-control" value={credentials.name} name="name" id="name" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} name="email" onChange={onChange}  id="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} name="password" onChange={onChange} required minLength={5} id="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" value={credentials.cpassword} name="cpassword" onChange={onChange} required minLength={5} id="cpassword"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
