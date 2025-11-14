import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
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