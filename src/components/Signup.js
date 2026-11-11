import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = (props) => {
  const { showAlert } = props;
  const [credentials, setCredentials] = useState({ email: "", password: "", name: "", cpassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password, cpassword } = credentials;

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
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error Response:", errorText);
        alert("Something went wrong on the server.");
        return;
      }

      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        navigate('/');
        showAlert("Account created successfully!!", "success");
      } else {
        showAlert("Invalid credentials!!", "danger");
      }
    } catch (error) {
      console.error("Network or parsing error:", error);
      alert("Could not connect to the server.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-avatar-box">
            <i className="fa-solid fa-user-plus"></i>
          </div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Get started with RoomEase in minutes</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label-custom">
              <i className="fa-solid fa-user text-primary"></i> Full Name
            </label>
            <div className="input-icon-wrapper">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                className="form-control"
                value={credentials.name}
                name="name"
                id="name"
                placeholder="John Doe"
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label-custom">
              <i className="fa-solid fa-envelope text-primary"></i> Email Address
            </label>
            <div className="input-icon-wrapper">
              <i className="fa-solid fa-at"></i>
              <input
                type="email"
                className="form-control"
                value={credentials.email}
                name="email"
                id="email"
                placeholder="name@example.com"
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label-custom">
              <i className="fa-solid fa-lock text-primary"></i> Password
            </label>
            <div className="input-icon-wrapper">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                className="form-control"
                value={credentials.password}
                name="password"
                id="password"
                placeholder="Minimum 5 characters"
                onChange={onChange}
                required
                minLength={5}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="cpassword" className="form-label-custom">
              <i className="fa-solid fa-shield-halved text-primary"></i> Confirm Password
            </label>
            <div className="input-icon-wrapper">
              <i className="fa-solid fa-shield"></i>
              <input
                type="password"
                className="form-control"
                value={credentials.cpassword}
                name="cpassword"
                id="cpassword"
                placeholder="Re-enter your password"
                onChange={onChange}
                required
                minLength={5}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-gradient-submit w-100 justify-content-center py-2">
            <i className="fa-solid fa-user-check"></i> Register Account
          </button>

          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
