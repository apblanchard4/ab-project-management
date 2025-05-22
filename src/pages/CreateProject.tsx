import React, { useState } from 'react';
import axios from 'axios';

const CreateProject: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [active, setActive] = useState(false);

    const handleSubmit = () => {
        axios.post('http://127.0.0.1:5000/api/createProject', { name, description, active })
            .then(() => {
                setName('');
                setDescription('');
                setActive(false);
                alert('Project created successfully!');
                window.location.href = '/viewProjects';

            })
            .catch(error => console.error('Error creating project:', error));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Create Project</h1>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label className="block font-bold">Project Name</label>
                    <input
                        className="border p-2 w-full text-black"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block font-bold">Description</label>
                    <textarea
                        className="border p-2 w-full text-black"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='w-full flex'>
                    <label className="block font-bold mr-2">Active?</label>
                    <input
                        className="border p-2 text-black"
                        type="checkbox"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                    />
                </div>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={handleSubmit}
                >
                    Create Project
                </button>
            </form>
        </div>
    );
};

export default CreateProject;
