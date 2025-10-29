import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async(e) => {
      e.preventDefault();
      try {
       await axios.post('http://127.0.0.1:8000/api/register/', 
          {username, password}); 
        alert('Registration successful! Please log in.');
        navigate('/');

      } catch (error) {
        alert('Error occurred during registration.');
      }
    }

  return (
    <main>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </main>
  )
}

export default Register