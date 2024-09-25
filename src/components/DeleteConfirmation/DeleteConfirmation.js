import React from 'react';
import ReusableModal from "../Modal/ReusableModal"; 
import styles from "./DeleteConfirmation.module.css"; 

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, task }) => {
    return (
        <ReusableModal isOpen={isOpen} onClose={onClose}>
            <div className={styles.modalContent}>
                <h3 className={styles.heading}>Delete</h3>
                <p> Do you want to delete Task assigned to {task?.assignedTo}?</p> {/* Added '?' to prevent errors */}
                <div className={styles.buttonContainer}>
                    <button onClick={onClose} className={styles.cancelButton}>
                        Cancel
                    </button>
                    <button 
                        onClick={() => onConfirm(task?.id)} // Pass task ID to the confirm function
                        className={styles.confirmButton}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </ReusableModal>
    );
};

export default DeleteConfirmation;
