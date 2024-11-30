import React, { useState } from 'react';
import TaskList from './components/TasklList';
import AddTask from './components/AddTask';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleTaskAdded = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="App">
      <h1>To-Do Application</h1>
      <AddTask onTaskAdded={handleTaskAdded} />
      <TaskList refresh={refresh} />
    </div>
  );
};

export default App;
