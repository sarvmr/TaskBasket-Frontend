import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function TaskItem({ task }) {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body1">{task.description}</Typography>
      </CardContent>
    </Card>
  );
}

export default TaskItem;
