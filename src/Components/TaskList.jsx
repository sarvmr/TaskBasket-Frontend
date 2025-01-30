import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import LogoutButton from './LogoutButton';
import { Container, Typography, Button, Stack, TextField, MenuItem } from '@mui/material';
import { fetchTasks } from '../Services/apiService';
import { getToken } from '../Services/authService';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5080/api/task';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/login'); // Redirect to login if no token is found
      return;
    }

    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        navigate('/login'); // Redirect if unauthorized
      }
    };
    loadTasks();
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
    try {
      const token = getToken();
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include JWT token
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const createdTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
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
        <LogoutButton />
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
