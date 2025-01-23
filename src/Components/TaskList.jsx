import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import { Container, Typography, Button, Stack, TextField, MenuItem } from '@mui/material';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:5080/api/task');
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleSortChange = (e) => {
    const criteria = e.target.value;
    setSortCriteria(criteria);

    // Sort tasks based on selected criteria
    const sortedTasks = [...tasks].sort((a, b) => {
      if (criteria === 'status') {
        const statusOrder = { Closed: 3, Pending: 2, Open: 1 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      if (criteria === 'priority') {
        const priorityOrder = { Low: 3, Medium: 2, High: 1 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (criteria === 'dueDate') return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
      return 0;
    });

    setTasks(sortedTasks);
  };

  const handleAddTask = async (newTask) => {
    const response = await fetch('http://localhost:5080/api/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    const createdTask = await response.json();
    setTasks((prevTasks) => [...prevTasks, createdTask]);
  };

  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:5080/api/task/${id}`, {
      method: 'DELETE',
    });
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleUpdateTask = async (updatedTask) => {
    await fetch(`http://localhost:5080/api/task/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Tasks
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <TextField
          select
          label="Sort By"
          value={sortCriteria}
          onChange={handleSortChange}
          variant="outlined"
          sx={{ width: 200 }}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="status">Status</MenuItem>
          <MenuItem value="priority">Priority</MenuItem>
          <MenuItem value="dueDate">Due Date</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" onClick={() => setIsDialogOpen(true)}>
          Add Task
        </Button>
      </Stack>

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      ))}

      <AddTaskForm
        open={isDialogOpen}
        handleClose={() => {
          setIsDialogOpen(false);
          setEditingTask(null);
        }}
        handleAddTask={editingTask ? handleUpdateTask : handleAddTask}
        editingTask={editingTask}
      />
    </Container>
  );
};

export default TaskList;
