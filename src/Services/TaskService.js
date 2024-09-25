import { getDatabase, ref, set, onValue, remove} from "firebase/database";
import { app } from './firebase'; // Ensure you import the initialized Firebase app


// Initialize Realtime Database instance
const database = getDatabase(app);


// Function to store task in Realtime Database
// Function to store task in Realtime Database using task.id as the key
export const storeTaskInDatabase = (task) => {
    const tasksRef = ref(database, `tasks/${task.id}`); // Use task.id as the key in the Firebase database
    
    return set(tasksRef, task) // Set the task with the provided id
        .then(() => {
            console.log('Task stored successfully');
        })
        .catch((error) => {
            console.error('Error storing task in Firebase:', error);
        });
};

export const fetchTasksFromDatabase = (callback) => {
    const tasksRef = ref(database, 'tasks');
    
    // Listen for value changes
    onValue(tasksRef, (snapshot) => {
        const tasks = [];
        snapshot.forEach((childSnapshot) => {
            const task = childSnapshot.val();
            tasks.push({ firebaseKey: childSnapshot.key, ...task }); // Include the task ID
        });
        
        callback(tasks); // Return the fetched tasks through the callback
    });
};

// Function to update task in Realtime Database
export const updateTaskInDatabase = (task) => {
    const taskRef = ref(database, `tasks/${task.id}`); // Reference the task by task.id

    return set(taskRef, task) // Use set() to update the task with the new data
        .then(() => {
            console.log('Task updated successfully');
        })
        .catch((error) => {
            console.error('Error updating task in Firebase:', error);
        });
};


export const deleteTaskFromDatabase = async (taskKey) => {
    const taskRef = ref(database, `tasks/${taskKey}`); // Reference by Firebase key
    try {
        await remove(taskRef); // Use remove for Realtime Database
        console.log("Task deleted successfully");
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};

