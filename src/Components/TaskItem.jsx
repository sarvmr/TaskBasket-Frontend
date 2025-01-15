import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5">{task.title}</Typography>
        <Typography color="text.secondary">{task.description}</Typography>
        <Typography>Status: {task.status}</Typography>
        <Typography>Priority: {task.priority}</Typography>
        <Typography>Due Date: {task.dueDate || 'Not set'}</Typography>
        <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onEdit(task)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
