import React from 'react';
import UpdateTask from './UpdateTask';

const TaskList = ({ tasks, onTaskDeleted, onTaskUpdated }) => {
  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <UpdateTask
              task={task}
              onTaskDeleted={onTaskDeleted}
              onTaskUpdated={onTaskUpdated}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
