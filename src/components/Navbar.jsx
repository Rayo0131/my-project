import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
<nav className='bg-dark p-3 text-light d-flex justify-content-between'>
    <h3>Task Manager</h3>
    <div>
        <Link to="/" className='text-white mx-2'>Login</Link>
        <Link to="/register" className='text-white mx-2'>Register</Link>
        <Link to="/task" className='text-white mx-2'>Task</Link>
    </div>
</nav>  )
}

export default Navbar