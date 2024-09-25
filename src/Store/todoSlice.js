// src/Store/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        updateTasks: false,
        editTasks: false,
        deleteTasks: false,
    },
    reducers: {
        setUpdateTasks: (state, action) => {
            state.updateTasks = action.payload;
        },
        setEditTasks: (state, action) => {
            state.editTasks = action.payload;
        },
        setDeleteTasks: (state, action) => {
            state.deleteTasks = action.payload;
        },
        resetTaskFlags: (state) => {
            state.updateTasks = false;
            state.editTasks = false;
            state.deleteTasks = false;
        },
    },
});

// Export actions and reducer
export const { setUpdateTasks, setEditTasks, setDeleteTasks, resetTaskFlags } = todoSlice.actions;
export default todoSlice.reducer;
