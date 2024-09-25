import React, { useEffect, useState } from "react";
import styles from './TodoNavbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { fetchTasksFromDatabase } from "../../Services/TaskService";

const TodoNavbar = ({onNewTaskClick}) => {
    // const records = useSelector((state) => state.todo.tasks);
    const update = useSelector((state)=>state.todo.updateTasks)
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        // Fetch tasks when the component mounts
        const fetchTasks = () => {
            fetchTasksFromDatabase(setTasks); // Fetch and update state with tasks
        };
        fetchTasks();
    }, [update]);
    const onRefreshTask = () => {
        window.location.reload()
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.nav}>
                <div className={styles.header}>
                    <div className={styles.heading}>
                        <div className={styles.listIcon}>
                            <FontAwesomeIcon icon={faListCheck} style={{ color: "#ffffff" }} /> 
                        </div>
                        <div className={styles.listTitle}>
                            <h3>Tasks</h3>
                            <h4>All Tasks</h4>
                        </div>
                    </div>
                    <div className={styles.record}>
                        <h6>{tasks.length} records</h6>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.btns}>
                        <button className={styles.btn} onClick={onNewTaskClick}>New Task</button>
                        <button className={styles.btn} onClick={onRefreshTask}>Refresh</button>
                    </div>
                    <div className={styles.searchBarContainer}>
                        <input
                            className={styles.searchInput}
                            type="search"
                            name="search"
                            placeholder="Search"
                            aria-label="Search tasks"
                        />
                        <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} aria-label="Search" />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TodoNavbar;
