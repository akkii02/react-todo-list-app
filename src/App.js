import logo from './logo.svg';
import './App.css';
import TodoNavbar from './components/TodoNavbar/TodoNavbar';
import TodoList from './components/TodoList/TodoList';
import { useState } from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import TodoFooter from './components/TodoFooter/TodoFooter';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNewTaskClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
  return (
    <>
    <TodoNavbar onNewTaskClick={handleNewTaskClick} />
    <TodoForm isOpen={isModalOpen} onClose={closeModal}/>
    <TodoList/>
    <TodoFooter/>
    </>
  );
}

export default App;
