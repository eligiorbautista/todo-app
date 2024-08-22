import React, { useState } from 'react'

const EditTaskModal = ({ task, onSave, onClose }) => {
    const [title, setTitle] = useState(task.title);
    const [content, setContent] = useState(task.content);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...task, title, content });
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-lg font-bold mb-4">Edit Task</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="p-2 mb-2 border border-gray-400  rounded w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        className="p-2 mb-2 border border-gray-400 rounded w-full h-32" 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTaskModal
