import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


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
    <div>
      <h2 className='text-light'>Task Manager </h2>
      <form onSubmit={handleAddTask} className='task-field'>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.length === 0 ? ( <p className='text-light'>No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id}>
              <div>
                <input type="checkbox" checked={task.completed} onChange={() => ToggleComplete(task.id, task.completed)} />
                <span>{task.title}</span>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default Task