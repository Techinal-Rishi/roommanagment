import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import Alert from './Alert';

const Login = (props) => {

    const {showAlert}= props;

  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate();

  const handleSubmit= async (event)=>{
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        if(json.success){
          //Save the auth token and redirect 
          localStorage.setItem('token', json.authToken);
          props.showAlert("Account created successfully!!", "success")
          navigate('/');
          console.log(json)

        } else{
          alert("Invalid Credentials!!");
          props.showAlert("Invalid details!!", "danger");
        }
    }

    const onChange=(event)=>{
      setCredentials({...credentials, [event.target.name]: event.target.value});
    }

  return (
    <div className='mt-3'>
      <h2>Login to continue to Roommanagment</h2>
      <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary my-3">Submit</button>
</form>
    </div>
  )
}

export default Login
