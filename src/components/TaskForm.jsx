import React, { useState } from 'react';

const TaskForm = ({ onAddTask, onDeleteAll }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && content) {
            onAddTask({ title, content, created_at: new Date().toISOString() });
            setTitle('');
            setContent('');
        }
    }

    return (
        <div className="mb-6">
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title"
                    className="mb-2 p-2 border border-gray-400  rounded w-full"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Task content"
                    className="mb-2 p-2 border border-gray-400  border border-gray-400 -gray-400 rounded w-full"
                />
                <div className="flex space-x-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-black text-white rounded"
                    >
                        Add Task
                    </button>
                    <button
                        onClick={onDeleteAll}
                        className="px-4 py-2 bg-black text-white rounded"
                    >
                        Delete All Tasks
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
