import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { Container, Typography } from '@mui/material';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5080/api/task')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Tasks
      </Typography>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Container>
  );
}

export default TaskList;
