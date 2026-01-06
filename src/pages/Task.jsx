import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDescription, setEditingDescription] = useState('');



const token=localStorage.getItem('access_token');

if (!token) {
  window.location.href = '/';
}



    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tasks/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };


    useEffect(() => {
    fetchTasks();
  }, []);



  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/tasks/', {
        title,
        description
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };



  const ToggleComplete = async (taskId, completed) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
        completed: !completed
      }, {headers: {
          Authorization: `Bearer ${token}`
        }});
      fetchTasks();
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
    setEditingDescription(task.description);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle('');
    setEditingDescription('');
  };

  const saveEdits = async (taskId) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
        title: editingTitle,
        description: editingDescription
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      cancelEditing();
      fetchTasks();
    } catch (error) {
      console.error("Error saving edits:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className='container mt-5  d-flex justify-content-center'>

      <div className='card p-4 bg-dark text-light shadow' style={{width: "100%", maxWidth: "600px"}}>
              <h2 className='text-center mb-4 fw-bold'>Task Manager </h2>


        <form onSubmit={handleAddTask} className='mb-4' >

          <div className='mb-3'>
            <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required className='form-control'/>
            </div>

          <div className='mb-3'>
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className='form-control' />
          </div>
          <button type="submit" className='btn w-100 bg-primary'>Add Task</button>
        </form>
  
        <ul className='list-unstyled '>
          {tasks.length === 0 ? ( <p className='text-center text-secondary'>No tasks available.</p>
          ) : (
            tasks.map((task) => (
              <li key={task.id} className='p-3 mb-3 rounded d-flex justify-content-between align-items-center' style={{background: '#222'}} >

                <>
                  <input className="form-control mb-2" 
                   value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} />


                  <input className="form-control mb-2" 
                   value={editingDescription} onChange={(e) => setEditingDescription(e.target.value)} />

                   <div>
                    <button onClick={() => saveEdit(task.id)} className='btn btn-warning btn-sm '>Save</button>

                    <button onClick={cancelEditing} className='btn btn-warning btn-sm'>Cancel</button>

                   </div>
                
                </>
                <div className='d-flex align-items-center gap-2'>
                  <input type="checkbox" checked={task.completed} onChange={() => ToggleComplete(task.id, task.completed)} />
                  <span className={task.completed ? "text-decoration-line-through text-success" : ""}>
                    {task.title}
                    </span>

                  <button onClick={() => startEditing(task)} className='btn btn-warning btn-sm'>Edit</button>

                  <button onClick={() => handleDeleteTask(task.id)} className='btn btn-danger btn-sm'>Delete</button>
                </div>
                <hr />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default Task