import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/login.css';
export const LoginForm = () => {

  const [username, setUsername] = useState('Demo login');
  const [password, setPassword] = useState('1234');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    alert("Hello User")
  };

  return (
    <form onSubmit={handleSubmit}>
        <h1>Login Page</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Link to="/upload">
      <button type="submit">Login</button>
      </Link>
    </form>
  );
};
