const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database setup
const db = new sqlite3.Database('./tasks.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )`
    );
  }
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Routes

// GET all tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// POST: Add a new task
app.post('/tasks', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ error: 'Task name is required' });
  }
  db.run('INSERT INTO tasks (name) VALUES (?)', [name], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(201).send({ id: this.lastID, name }); // Return the new task with the id
    }
  });
});

// PUT: Update a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ error: 'Task name is required' });
  }
  db.run('UPDATE tasks SET name = ? WHERE id = ?', [name, id], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send({ message: 'Task updated successfully' });
    }
  });
});

// DELETE: Remove a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send({ message: 'Task deleted successfully' });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
