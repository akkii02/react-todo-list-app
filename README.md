# Todo Application

## Overview
The Todo Application is a simple and efficient task management tool that allows users to create, view, edit, and delete tasks. The app provides features for searching tasks and managing their statuses. It is built using React and Redux for state management.

## Features
- Create new tasks
- View all tasks with details
- Edit existing tasks
- Delete tasks
- Search functionality to filter tasks

## Technologies Used
- React
- Redux
- Firebase
- React Icon
- Font Awesome for icons
- CSS Modules for styling

## Usage

### Components
- **TodoNavbar**: Displays the navigation bar with task management options (create, search, refresh).
- **TodoList**: Displays the list of tasks with options to edit and delete.
- **TodoForm**: A modal for adding and editing tasks.
- **DeleteConfirmation**: A modal for confirming task deletion.

### Searching Tasks
- Use the search bar in the navbar to filter tasks by assigned user or description.

## Redux Store
The application utilizes Redux to manage the state of tasks. The following slices are included:
- `tasks`: Manages the list of tasks.
- `updateTasks`: Triggers updates to the task list.

## Services
The application fetches tasks from a database using the `fetchTasksFromDatabase` function, which is responsible for retrieving task data.

#images
![TodoHomepage](https://github.com/user-attachments/assets/90f659f3-651a-4984-9b1b-24b32d7499a7)
![CreateTodo](https://github.com/user-attachments/assets/8366d305-b93b-4894-8ef5-287ec4873556)
![UpdateTodo](https://github.com/user-attachments/assets/8540e9ff-6dc2-4546-a9b4-8f63c7655d31)

# Mobile View
![WhatsApp Image 2024-09-25 at 11 14 34_5c3601e5](https://github.com/user-attachments/assets/036ec411-a43a-4561-9e15-b02cc1e87458)
