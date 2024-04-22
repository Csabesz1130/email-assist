import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleCreateTask = async (task) => {
    try {
      const response = await axios.post('/api/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (task) => {
    try {
      const response = await axios.put(`/api/tasks/${task._id}`, task);
      const updatedTasks = tasks.map((t) => (t._id === task._id ? response.data : t));
      setTasks(updatedTasks);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div>
      {/* Render the list of tasks */}
      {/* Implement task creation, update, and deletion UI */}
    </div>
  );
};

export default TaskList;