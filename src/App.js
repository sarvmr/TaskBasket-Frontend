import './App.css';
import Header from './Components/Header';
import TaskList from './Components/TaskList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PrivateRoute from './Routes/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<TaskList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
