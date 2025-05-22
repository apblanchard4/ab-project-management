import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const EditTime: React.FC = () => {
    const navigate = useNavigate();
    const { projectId, timeEntryId } = useParams<{ projectId: string; timeEntryId: string }>();
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        // Get the local date and time components
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    const handleCancel = () => {
        navigate(`/viewProject/${projectId}`);
    }
    useEffect(() => {
        if (!timeEntryId) {
            alert('Invalid time entry ID');
            navigate(`/viewProject/${projectId}`);
        }
        axios.get('http://127.0.0.1:5000/api/timeEntry/' + timeEntryId).then(response => {
            setStartTime(formatDate(response.data.startTime));
            setEndTime(formatDate(response.data.endTime));
            setDescription(response.data.description)
        }).catch(error => console.error('Error fetching time entry:', error));
    }, []);

    const handleSubmit = () => {
        axios.post('http://127.0.0.1:5000/api/editTimesheet', { timeEntryId, startTime, endTime, description }).then(() => {
            setStartTime('');
            setEndTime('');
            setDescription('');
            alert('Time entry updated successfully!');
            window.location.href = '/viewProject/' + projectId;
        })
            .catch(error => console.error('Error editting the time entry:', error));
    };
    return (
        <div>
            <h1 className="text-2xl font-bold">Edit Time Entry</h1>
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
                <div>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleSubmit}

                    >
                        Edit Time Entry
                    </button>
                    <button
                        className="bg-gray-600 text-white px-4 mx-2 py-2 rounded"
                        onClick={() => handleCancel()}
                    > Cancel
                    </button>


                </div>

            </form>
        </div>
    );
};

export default EditTime;