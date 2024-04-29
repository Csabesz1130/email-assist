import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskDescription, setEditingTaskDescription] = useState('');
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

  const handleEditTask = (taskId, taskDescription) => {
    setEditingTaskId(taskId);
    setEditingTaskDescription(taskDescription);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskDescription('');
  };

  const createTask = async () => {
    if (!newTask.trim()) return;

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
    if (!editingTaskDescription.trim()) return;

    setLoading(true);
    try {
      const response = await axios.put(`/api/tasks/${editingTaskId}`, { description: editingTaskDescription });
      const updatedTasks = tasks.map((task) => (task._id === editingTaskId ? response.data : task));
      setTasks(updatedTasks);
      setEditingTaskId(null);
      setEditingTaskDescription('');
      setError('');
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task');
    } finally {
      setLoading(false); //jh
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
              {editingTaskId === task._id ? (
                <div className="edit-task">
                  <input
                    type="text"
                    value={editingTaskDescription}
                    onChange={(e) => setEditingTaskDescription(e.target.value)}
                    className="edit-task-input"
                  />
                  <button onClick={updateTask} className="save-button">Save</button>
                  <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
                </div>
              ) : (
                <div className="task-details">
                  <span className="task-description">{task.description}</span>
                  <div className="task-actions">
                    <button onClick={() => handleEditTask(task._id, task.description)} className="edit-button">Edit</button>
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
