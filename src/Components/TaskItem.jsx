import React from 'react';
import { useState } from 'react';
import { Card, CardContent, Typography, Button, Stack, Chip, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';

const TaskItem = ({ task, onDelete, onEdit }) => {
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleConfirmDelete = () => {
    onDelete(task.id);
    handleCloseDialog();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'primary';
      case 'Pending':
        return 'warning';
      case 'Closed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return 'info';
      case 'Medium':
        return 'warning';
      case 'High':
        return 'error';
      default:
        return 'default';
    }
  };
  
  return (
    <Card variant="outlined" sx={{ marginBottom: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h5">{task.title}</Typography>
        <Typography color="text.secondary">{task.description}</Typography>
        <Stack direction="row" justifyContent="center" spacing={1} sx={{ marginTop: 1, marginBottom: 2 }}>
          {/* Status Badge */}
          <Chip
            label={`Status: ${task.status}`}
            color={getStatusColor(task.status)}
            variant="outlined"
          />

          {/* Priority Badge */}
          <Chip
            label={`Priority: ${task.priority}`}
            color={getPriorityColor(task.priority)}
            variant="outlined"
          />
        </Stack>
        <Typography>Due Date: {task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : 'Not set'}</Typography>
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ marginTop: 2 }}>
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
            onClick={handleOpenDialog}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the task "{task.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TaskItem;
