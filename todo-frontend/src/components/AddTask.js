import React, { useState } from 'react';
import API from '../services/api';

const AddTask = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/tasks', { name: taskName })
      .then(() => {
        setTaskName('');
        onTaskAdded(); // Notify parent to refresh tasks
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
