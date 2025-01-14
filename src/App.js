import './App.css';
import Header from './Components/Header';
import TaskList from './Components/TaskList';

function App() {
  return (
    <div className="App">
        <Header />
        <TaskList />
        {/* Other components go here */}
    </div>
  );
}

export default App;
