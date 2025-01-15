import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import { Container, Typography, Button, Stack } from '@mui/material';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:5080/api/task');
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

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
    setEditingTask(task); // Pass the task to be edited
    setIsDialogOpen(true); // Open the AddTaskForm as an edit form
  };

  const handleUpdateTask = async (updatedTask) => {
    await fetch(`http://localhost:5080/api/task/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    setEditingTask(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Tasks
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6">Tasks</Typography>
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
