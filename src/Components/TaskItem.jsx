import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Box,
} from "@mui/material";

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
      case "Open":
        return "primary";
      case "Pending":
        return "warning";
      case "Closed":
        return "success";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "info";
      case "Medium":
        return "warning";
      case "High":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card
      variant="elevation"
      sx={{
        marginBottom: 2,
        padding: 2,
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          {task.title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {task.description}
        </Typography>

        {/* Status & Priority Badges */}
        <Stack direction="row" justifyContent="center" spacing={1} sx={{ marginBottom: 2 }}>
          <Chip label={task.status} color={getStatusColor(task.status)} 
          sx={{ fontSize: "1rem", padding: "10px", height: "35px" }}/>
          <Chip label={task.priority} color={getPriorityColor(task.priority)} 
          sx={{ fontSize: "1rem", padding: "10px", height: "35px" }}/>
        </Stack>

        {/* Due Date */}
        <Typography sx={{ fontSize: 14, fontStyle: "italic" }}>
          📅 Due: {task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "Not set"}
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={() => onEdit(task)} sx={{ borderRadius: "20px" }}>
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleOpenDialog}
            sx={{ borderRadius: "20px", ml: 2 }}
          >
            Delete
          </Button>
        </Box>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the task <strong>"{task.title}"</strong>?
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
