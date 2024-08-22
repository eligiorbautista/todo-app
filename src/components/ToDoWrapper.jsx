import React, { useState } from 'react'
import Task from './Task'
import TaskForm from './TaskForm'
import EditTaskModal from './EditTaskModal'
import Swal from 'sweetalert2'
import { toast } from 'sonner' 

const ToDoWrapper = () => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Create a Responsive Layout",
            content: "Develop a responsive layout for a web page using CSS Flexbox and Grid. Ensure it works well on both mobile and desktop devices.",
            created_at: "2024-08-22T12:00:00Z"
        },
        {
            id: 2,
            title: "Implement a Contact Form",
            content: "Build a contact form with basic validation using HTML, CSS, and JavaScript. Ensure it handles form submission and displays validation errors.",
            created_at: "2024-08-22T12:30:00Z"
        },
        {
            id: 3,
            title: "Integrate an API",
            content: "Fetch data from a public API (e.g., a weather or news API) and display it on a web page. Handle API errors and loading states.",
            created_at: "2024-08-22T13:00:00Z"
        },
        {
            id: 4,
            title: "Optimize Website Performance",
            content: "Analyze and optimize the performance of a web page. Implement basic performance improvements such as image optimization and code splitting.",
            created_at: "2024-08-22T13:30:00Z"
        }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [taskToEdit, setTaskToEdit] = useState(null);

    const handleAddTask = (newTask) => {
        setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
        toast.success('Task added successfully!');  
    }

    const handleUpdateTask = (updatedTask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        setTaskToEdit(null);  
        toast.success('Task updated successfully!'); 
    }

    const handleDeleteTask = async (taskId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000000',
            cancelButtonColor: '#4d4d4d',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            setTasks(tasks.filter(task => task.id !== taskId));
            toast.success('Task deleted successfully!');  
            Swal.fire({
                title: 'Deleted!',
                text: 'Your task has been deleted.',
                icon: 'success',
                confirmButtonColor: '#000000'
            });
        }
    }

    const handleDeleteAllTasks = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000000',
            cancelButtonColor: '#4d4d4d',
            confirmButtonText: 'Yes, delete all tasks.'
        });
        if (result.isConfirmed) {
            setTasks([]);
            toast.success('All tasks deleted successfully!');  
            Swal.fire({
                title: 'Deleted!',
                text: 'All tasks have been deleted.',
                icon: 'success',
                confirmButtonColor: '#000000'
            });
        }
    }

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen p-6">
            <header className="bg-black text-white py-4 mb-6 rounded shadow-md w-full max-w-2xl mx-auto">

                <h1 className="text-2xl font-bold text-center">ToDo App</h1>

            </header>

            {/* task form */}
            <TaskForm onAddTask={handleAddTask} onDeleteAll={handleDeleteAllTasks} />

            {/* search */}
            <input
                type="text"
                className="mb-4 p-2 border border-gray-400 rounded w-full max-w-md mx-auto"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* tasks container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        onDelete={handleDeleteTask}
                        onUpdate={() => setTaskToEdit(task)}
                    />
                ))}
            </div>

            {/* edit modal */}
            {taskToEdit && (
                <EditTaskModal
                    task={taskToEdit}
                    onSave={handleUpdateTask}
                    onClose={() => setTaskToEdit(null)}
                />
            )}
 
            <footer className="mt-10 bg-black text-white py-4 mt-auto rounded shadow-md text-center  w-full max-w-2xl mx-auto">
                <p className="text-sm">© 2024 Eli Bautista</p>
            </footer>
        </div>
    )
}

export default ToDoWrapper
