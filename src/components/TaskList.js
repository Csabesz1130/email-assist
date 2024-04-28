import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/tasks', { description: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
      setError('');
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/tasks/${editTaskId}`, { description: editTaskDescription });
      const updatedTasks = tasks.map((task) => (task._id === editTaskId ? response.data : task));
      setTasks(updatedTasks);
      setEditTaskId(null);
      setEditTaskDescription('');
      setError('');
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
      setError('');
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              {editTaskId === task._id ? (
                <div className="edit-task">
                  <input
                    type="text"
                    value={editTaskDescription}
                    onChange={(e) => setEditTaskDescription(e.target.value)}
                    className="edit-task-input"
                  />
                  <button onClick={updateTask} className="save-button">Save</button>
                </div>
              ) : (
                <div className="task-details">
                  <span className="task-description">{task.description}</span>
                  <div className="task-actions">
                    <button onClick={() => setEditTaskId(task._id)} className="edit-button">Edit</button>
                    <button onClick={() => deleteTask(task._id)} className="delete-button">Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="add-task-input"
        />
        <button onClick={createTask} className="add-task-button">Create Task</button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TaskList;