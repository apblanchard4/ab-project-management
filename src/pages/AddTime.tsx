import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddTime: React.FC = () => {
    const [startTime, setStartTime] = useState('');
    const { id } = useParams<{ id: string }>();
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        axios.post('http://127.0.0.1:5000/api/createTimesheet', { id, startTime, endTime, description }).then(() => {
            setStartTime('');
            setEndTime('');
            setDescription('');
            alert('Time added successfully!');
            window.location.href = '/viewProject/' + id;

        })
            .catch(error => console.error('Error creating project:', error));
    };
    return (
        <div>
            <h1 className="text-2xl font-bold">Add Time Entry</h1>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label className="block font-bold">Start Time</label>
                    <input
                        className="border p-2 w-full text-black"
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div> <div>
                    <label className="block font-bold">End Time</label>
                    <input
                        className="border p-2 w-full text-black"
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
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
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={handleSubmit}
                >
                    Add Time Entry
                </button>
            </form>
        </div>
    );
};

export default AddTime;