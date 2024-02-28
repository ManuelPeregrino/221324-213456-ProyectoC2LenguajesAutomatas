import "../assets/css/login.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

  const handleLogin = () => {
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*.{}]).{7,}$/;

    if (username.trim() === '') {
      setError('Username is required.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError('Invalid password. Must be at least 7 characters long with at least one number and one special character.');
      return;
    }

    console.log('Login successful!');
    navigate('/dashboard');
  };

  return (
    <div className="login-div">
      <h2>Login</h2>
      <div className="input-div">
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="input-div">
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
