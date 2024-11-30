import React, { useState, useEffect } from 'react';
import API from '../services/api';
import UpdateTask from './UpdateTask';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    API.get('/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <UpdateTask
              task={task}
              onTaskUpdated={fetchTasks}
              onTaskDeleted={fetchTasks}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
