import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', 
          {username, password}); 

        localStorage.setItem('access_token', response.data.access);
        navigate('/task');

      } catch (error) {
        alert('Login failed. Please check your credentials and try again.');
      }
    }

  return (
    <main className='log'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </main>
  )
}

export default Login