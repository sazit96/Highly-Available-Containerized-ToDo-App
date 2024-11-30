import React, { useState } from 'react';
import API from '../services/api';

const UpdateTask = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.name);

  const handleUpdate = () => {
    API.put(`/tasks/${task.id}`, { name: taskName })
      .then(() => {
        onTaskUpdated();
        setIsEditing(false);
      })
      .catch((error) => console.error('Error updating task:', error));
  };

  const handleDelete = () => {
    API.delete(`/tasks/${task.id}`)
      .then(() => onTaskDeleted())
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span>{task.name}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default UpdateTask;
