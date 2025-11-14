import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username_or_email, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login/', 
          {username_or_email, password}); 

        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        alert('Login successful!');
        navigate('/task');

      } catch (error) {
        console.error(error);
        alert('Login failed. Please check your credentials and try again.');
      }
    }

  return (
    <main className='log'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder='Username or Email' value={username_or_email} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </main>
  )
}

export default Login