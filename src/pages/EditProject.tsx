import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditProject: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [active, setActive] = useState(false);


    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/project/' + id)
            .then(response => { setName(response.data.name); setDescription(response.data.description); setActive(response.data.active); })
            .catch(error => console.error('Error fetching project details:', error));
    }, []);


    const handleSubmit = () => {
        axios.post('http://127.0.0.1:5000/api/editProject', { id, name, description, active })
            .then(() => {
                setDescription('');
                setActive(false);
                alert('Project edit successful!');
                window.location.href = '/viewProject/' + id;

            })
            .catch(error => console.error('Error editting project:', error));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Edit Project</h1>
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
                    Update Project
                </button>
            </form>
        </div>
    );
};

export default EditProject;
