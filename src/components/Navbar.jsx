import React, { use } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const navigate= useNavigate();
  const token=localStorage.getItem('access_token');

  const handleLogout=()=>{
    localStorage.removeItem('access_token');
    navigate('/');
  }

  let navItem = []

  if(token){
    navItem.push(
      <Link to="/" className='text-white mx-2' key="login">Login</Link>
      <Link to="/register" className='text-white mx-2' key="register">Sign Up</Link>
    ) 
  }else{
    navItem.push(
      <Link onClick={handleLogout} className='text-white mx-2' key="logout">Logout</Link>
      <Link to="/register" className='text-white mx-2' key="register">Sign Up</Link>
    )
  }

  return (
<nav className=' nav'>
    <h3>Task Manager</h3>
    <div className='navbar'>
        <Link to="/" className='text-white mx-2'>Login</Link>
        <Link to="/register" className='text-white mx-2'>Sign Up</Link>
        <Link to="/task" className='text-white mx-2'>Task</Link>
    </div>
</nav>  )
}

export default Navbar