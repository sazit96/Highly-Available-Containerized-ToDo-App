const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Determine database path based on environment
const DB_PATH =
  process.env.NODE_ENV === 'production'
    ? '/app/tasks.json'
    : path.resolve(__dirname, 'tasks.json');

// Ensure database file exists
const initDatabase = async () => {
  try {
    if (!(await fs.exists(DB_PATH))) {
      await fs.writeJson(DB_PATH, { tasks: [] });
      console.log(`Created database file at ${DB_PATH}`);
    }
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

// Read tasks
const readTasks = async () => {
  try {
    const data = await fs.readJson(DB_PATH);
    return data.tasks;
  } catch (error) {
    console.error('Error reading tasks:', error);
    return [];
  }
};

// Write tasks
const writeTasks = async (tasks) => {
  try {
    await fs.writeJson(DB_PATH, { tasks });
  } catch (error) {
    console.error('Error writing tasks:', error);
  }
};

// Routes
app.get('/', (req, res) => {
  res.send('Todo Backend is running');
});

// GET all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch tasks' });
  }
});

// POST new task
app.post('/tasks', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Task name is required' });
    }

    const tasks = await readTasks();
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      name: name.trim(),
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Could not add task' });
  }
});

// PUT update task
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Task name is required' });
    }

    let tasks = await readTasks();
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], name: name.trim() };
    await writeTasks(tasks);

    res.json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Could not update task' });
  }
});

// DELETE task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let tasks = await readTasks();

    const initialLength = tasks.length;
    tasks = tasks.filter((t) => t.id !== parseInt(id));

    if (tasks.length === initialLength) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await writeTasks(tasks);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete task' });
  }
});

// Initialize and start server
const startServer = async () => {
  try {
    // Initialize database
    await initDatabase();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Run the server
startServer();

/*
const startServer = async () => {
  try {
    // Initialize database
    await initDatabase();

    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};
*/
