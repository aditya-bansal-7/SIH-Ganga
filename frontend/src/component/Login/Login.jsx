import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Login successful');
      // Save the token to localStorage or use context for global state
      localStorage.setItem('token', data.token);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className='login-container'>
      <section className='login-sec'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="inputbox">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>
          <div className="inputbox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <div className="forget">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#">Forget Password</a>
          </div>
          <button type="submit">Log in</button>
          {message && <p>{message}</p>}
          <div className="register">
            <p>Don't have an account? <a href="/register">Register</a></p>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;