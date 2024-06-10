import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Login.css'; // Import the CSS file

const Login = ({ handleSignIn }) => {
  const [email, setEmail] = useState('');
  const [motDePasse, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:163/api/users/login', { email, motDePasse });
      const { token, userName, role ,userId} = response.data; // Include role in the response
      Cookies.set('token', token); // Set token in cookies
      Cookies.set('userName', userName); // Set username in cookies
      Cookies.set('userRole', role);
      Cookies.set('userId', userId);
      handleSignIn(userName, token);
      
      // Set the default Authorization header for all Axios requests
      axios.defaults.headers.common['x-access-token'] = token;
      
      if (role === 'administrateur') {
        navigate('/admin'); // Redirect to the admin dashboard if role is administrateur
      } else {
        navigate('/dashboard'); // Redirect to the user dashboard otherwise
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response) {
        console.log('Error response:', error.response.data);
      }
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={motDePasse}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account?</p>
          <button onClick={() => navigate('/register')} className="register-button">Register</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
