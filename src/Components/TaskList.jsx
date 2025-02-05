import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import LogoutButton from "./LogoutButton";
import Header from "./Header";
import {
  Container,
  Stack,
  TextField,
  MenuItem,
  Fab,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchTasks } from "../Services/apiService";
import { getToken } from "../Services/authService";
import { useNavigate } from "react-router-dom";
import HeaderImage from "../Images/Basket-Header.jpeg";

const API_URL = "http://localhost:5080/api/task";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
      return;
    }

    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        navigate("/login");
      }
    };
    loadTasks();
  }, [navigate]);

  const handleSortChange = (e) => {
    const criteria = e.target.value;
    setSortCriteria(criteria);

    const sortedTasks = [...tasks].sort((a, b) => {
      if (criteria === "status") {
        const statusOrder = { Closed: 3, Pending: 2, Open: 1 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      if (criteria === "priority") {
        const priorityOrder = { Low: 3, Medium: 2, High: 1 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (criteria === "dueDate") return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
      return 0;
    });

    setTasks(sortedTasks);
  };

  const handleAddTask = async (newTask) => {
    try {
      const token = getToken();
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) throw new Error("Failed to add task");

      const createdTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete task");

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) throw new Error("Failed to update task");

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        paddingTop: 4,
        backgroundColor: "#f8f8f8",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: { xs: "auto", md: "auto" },
        }}
      >
        <img
          src={HeaderImage}
          alt="Task Basket Illustration"
          style={{
            width: "100%",
            height: "80%",
            objectFit: "cover", // Prevents distortion
            borderRadius: "30px",
            padding: "20px",
          }}

        />
      </Box>
      <Header />

      {/* Sorting & Actions */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 , padding: "10px"}}>
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

        <LogoutButton />
      </Stack>

      {/* Task Items */}
      <Stack spacing={2}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} onEdit={handleEditTask} />
        ))}
      </Stack>

      {/* Floating Add Task Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setIsDialogOpen(true)}
        sx={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#6a0dad",
          "&:hover": { backgroundColor: "#4a078c" },
        }}
      >
        <AddIcon />
      </Fab>

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
