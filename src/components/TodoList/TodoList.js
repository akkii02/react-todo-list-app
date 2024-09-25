import React, { useState, useEffect } from "react";
import styles from "./TodoList.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import TodoForm from "../TodoForm/TodoForm"; 
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation"; 
import { deleteTaskFromDatabase, fetchTasksFromDatabase, updateTaskInDatabase } from "../../Services/TaskService";
import { setUpdateTasks } from "../../Store/todoSlice";

const TodoList = () => {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [editTask, setEditTask] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
    const [taskToDelete, setTaskToDelete] = useState(null); 
    const [tasks, setTasks] = useState([]); // State to store fetched tasks
    const update = useSelector((state) => state.todo.updateTasks);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch tasks when the component mounts or update changes
        fetchTasksFromDatabase(setTasks);
    }, [update]);

    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

    const handleEditClick = (task) => {
        console.log("edit",task)
        setEditTask(task);
        setIsEditModalOpen(true);
        setDropdownOpen(null);
    };

    const handleDelete = (task) => {
        setTaskToDelete(task); // Set task object for confirmation
        setIsDeleteModalOpen(true); 
        setDropdownOpen(null);
    };

    const confirmDelete = (taskKey) => {
        if (taskKey) {
            deleteTaskFromDatabase(taskKey).then(() => {
                setTasks((prevTasks) => prevTasks.filter((task) => task.firebaseKey !== taskKey)); // Use Firebase key for filtering
                dispatch(setUpdateTasks(true));
            });
        }
        setIsDeleteModalOpen(false);
        setTaskToDelete(null);
    };

    const handleFormSubmit = async(updatedTask) => {
        // Handle task update (not implemented in this snippet)
        try{
            await updateTaskInDatabase(updatedTask)
        }catch(error){
            console.error("Task is Not Update",error)
        }
        setIsEditModalOpen(false);
        setEditTask(null);
    };

    return (
        <div className={styles.mainContainer}>
            <table>
                <thead>
                    <tr>
                        <th className={styles.check}>
                            <input type="checkbox" />
                        </th>
                        <th>Assigned To</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Comments</th>
                        <th className={styles.btns}></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task.id || index}>
                            <td className={styles.check}>
                                <input type="checkbox" />
                            </td>
                            <td>{task.assignedTo}</td>
                            <td>{task.status}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.priority}</td>
                            <td>{task.description}</td>
                            <td className={styles.btns}>
                                <button 
                                    className={styles.dropdownButton} 
                                    onClick={() => toggleDropdown(index)}
                                >
                                    <FontAwesomeIcon icon={faCaretDown} style={{ color: "#66686b" }} />
                                </button>
                                {dropdownOpen === index && (
                                    <div className={styles.dropdownContent}>
                                        <button onClick={() => handleEditClick(task)}>Edit</button>
                                        <button onClick={() => handleDelete(task)}>Delete</button> {/* Pass the whole task object */}
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditModalOpen && (
                <TodoForm 
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)} 
                    taskToEdit={editTask}
                    onFormSubmit={handleFormSubmit}
                />
            )}

            {/* Render the DeleteConfirmation modal */}
            <DeleteConfirmation 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)} 
                onConfirm={confirmDelete} 
                task={taskToDelete} // Pass the task to be confirmed
            />
        </div>
    );
};

export default TodoList;
