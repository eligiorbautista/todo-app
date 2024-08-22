import React, { useState } from 'react'
import { FaCalendar, FaEdit, FaTrash } from "react-icons/fa";

const Task = ({ task, onDelete, onUpdate }) => {
    const [completed, setCompleted] = useState(false);
    
    // Format Date
    const formattedDate = new Date(task.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div 
            className="p-4 bg-white border border-gray-400  rounded-md shadow cursor-pointer"
            onClick={() => setCompleted(!completed)}
        >
            <h5 
                className={`mb-2 text-lg font-bold ${completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
            >
                {task.title}
            </h5>
            <p 
                className={`mb-4 ${completed ? 'line-through text-gray-400' : 'text-gray-600'}`}
            >
                {task.content}
            </p>
            <div className="flex items-center mb-4 text-black-500">
                <FaCalendar className={`mr-2 h-4 w-4 ${completed ? 'text-gray-400' : 'text-black-600'}`}/>
                <span className={`${completed ? 'text-gray-400' : 'text-black-600'}`}>{formattedDate}</span>
            </div>
            <div className="flex justify-end">
                <button className={`mr-2 ${completed ? 'line-through text-gray-400' : 'text-black-600'}`} onClick={e => { e.stopPropagation(); onUpdate(); }}>
                    <FaEdit />
                </button>
                <button className={`mr-2 ${completed ? 'line-through text-gray-400' : 'text-black-600'}`} onClick={e => { e.stopPropagation(); onDelete(task.id); }}>
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}

export default Task
