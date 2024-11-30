import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TasklList';
import API from './services/api';
const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await API.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const onTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const onTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const onTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, name: updatedTask.name } : task
      )
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <h1>To-Do Application</h1>
      <AddTask onTaskAdded={onTaskAdded} />
      <TaskList
        tasks={tasks}
        onTaskDeleted={onTaskDeleted}
        onTaskUpdated={onTaskUpdated}
      />
    </div>
  );
};

export default App;
