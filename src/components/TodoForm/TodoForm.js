import React, { useEffect, useState } from "react";
import ReusableModal from "../Modal/ReusableModal";
import styles from "./TodoForm.module.css";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { storeTaskInDatabase, updateTaskInDatabase } from "../../Services/TaskService";
import { setUpdateTasks } from "../../Store/todoSlice";
import { update } from "firebase/database";

const TodoForm = ({ isOpen, onClose, taskToEdit, onFormSubmit }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        id: uuidv4(),
        assignedTo: "",
        status: "",
        dueDate: "",
        priority: "",
        description: "",
    });

    useEffect(() => {
        if (taskToEdit) {
            setFormData(taskToEdit); // Pre-fill the form with task details if editing
        }
    }, [taskToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // If taskToEdit is not null, we're editing an existing task
            if (taskToEdit) {
                // Update the existing task
                await updateTaskInDatabase(formData); // Ensure you call the update function here
            } else {
                // Assign a new unique ID for a new task
                const newTask = { ...formData, id: uuidv4() };
                await storeTaskInDatabase(newTask); // Store the new task with a unique ID
            }
    
            dispatch(setUpdateTasks(true)); // Trigger update in the task list
            onFormSubmit && onFormSubmit(formData); // Call the form submit handler if it exists
        } catch (error) {
            console.error("Error storing task in Firebase:", error);
        }
    
        // Close modal and reset form data
        onClose();
        resetForm();
    };
    

    const resetForm = () => {
        setFormData({
            id: uuidv4(),
            assignedTo: "",
            status: "",
            dueDate: "",
            priority: "",
            description: "",
        });
    };

    return (
        <ReusableModal isOpen={isOpen} onClose={onClose}>
            <div className={styles.todoFormContainer}>
                <h1 className={styles.heading}>{taskToEdit ? "Edit Task" : "New Task"}</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {/* Form Fields */}
                    <div className={styles.formMainContainer}>
                        <div className={styles.formContainer}>
                            <div className={styles.formGroup}>
                               <span className={styles.required}>* <label className={styles.label}>Assigned To</label></span>
                                <select
                                    className={styles.input}
                                    name="assignedTo"
                                    value={formData.assignedTo}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select User</option>
                                    {/* User options */}
                                    {Array.from({ length: 6 }, (_, index) => (
                                        <option key={index} value={`User ${index + 1}`}>User {index + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                            <span className={styles.required}>*  <label className={styles.label}>Status</label></span>
                                <select
                                    className={styles.input}
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select Status</option>
                                    {["Not Started", "In Progress", "Completed"].map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={styles.formContainer}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Due Date</label>
                                <input
                                    className={styles.input}
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                            <span className={styles.required}>*   <label className={styles.label}>Priority</label> </span>
                                <select
                                    className={styles.input}
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select Priority</option>
                                    {["High", "Medium", "Low"].map(priority => (
                                        <option key={priority} value={priority}>{priority}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={styles.formContainer}>
                            <div className={styles.formGroupDes}>
                                <label className={styles.label}>Description</label>
                                <textarea
                                    className={styles.textarea}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.buttonGroup}>
                            <button type="button" onClick={onClose} className={styles.cancelButton}>
                                Cancel
                            </button>
                            <button type="submit" className={styles.saveButton}>
                                {taskToEdit ? "Update Task" : "Save Task"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </ReusableModal>
    );
};

export default TodoForm;
