import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
  const { showAlert } = props;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://roommanagment.onrender.com", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        showAlert("Logged in successfully!!", "success");
        navigate('/');
        console.log(json);
      } else {
        alert("Invalid Credentials!!");
        showAlert("Invalid details!!", "danger");
      }
    } catch (error) {
      console.error("Login request failed:", error);
      showAlert("Cannot connect to server. Please ensure backend is running.", "danger");
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
            <i className="fa-solid fa-lock"></i>
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Login to your RoomEase account</p>
        </div>

        <form onSubmit={handleSubmit}>
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
                onChange={onChange}
                id="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label-custom">
              <i className="fa-solid fa-key text-primary"></i> Password
            </label>
            <div className="input-icon-wrapper">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                className="form-control"
                value={credentials.password}
                onChange={onChange}
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-gradient-submit w-100 justify-content-center py-2">
            <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In
          </button>

          <p className="auth-footer-text">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
