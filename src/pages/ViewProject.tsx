import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

interface Project {
    id: string;
    name: string;
    description: string;
    active: boolean;
}

interface TimeEntry {
    id: string;
    startTime: Date;
    endTime: Date;
    description: string;
}

const ViewProject: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const projectId = id;
    const [project, setProject] = useState<Project>();
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
    const [totalHours, setTotalHours] = useState<string>('0.00');

    const navigate = useNavigate();

    const handleAddTimeEntry = () => {
        navigate(`/addTime/${projectId}`);
    };

    const handleProjectEdit = () => {
        navigate(`/editProject/${projectId}`);
    };

    const handleProjectDelete = () => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            axios.delete(`http://127.0.0.1:5000/api/deleteProject/${projectId}`)
                .then(() => {
                    alert('Project deleted successfully!');
                    navigate('/viewProjects');
                })
                .catch((error) => console.error('Error deleting project:', error));
        }
    };


    const handleTimeEntryEdit = (timeEntryId: string) => {
        //send both the time entry id and the project id to the editTime page
        navigate(`/editTime/${projectId}/${timeEntryId}`);
    };

    const handleTimeEntryDelete = (timeEntryId: string) => {
        if (window.confirm('Are you sure you want to delete this time entry?')) {
            axios.delete(`http://127.0.0.1:5000/api/deleteTimeEntry/${timeEntryId}`)
                .then(() => {
                    alert('Time entry deleted successfully!');
                    //refresh page for updated time entries
                    window.location.reload();
                })
                .catch((error) => console.error('Error deleting time entry:', error));
        }
    };

    const formatTime = (time: Date) => {
        return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const calculateHours = (startTime: Date, endTime: Date) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const diff = end.getTime() - start.getTime();
        const hours = diff / 1000 / 60 / 60;
        return hours.toFixed(2) + ' hours';
    };

    const calculateTotalHours = (timeEntries: TimeEntry[]) => {
        const totalHours = timeEntries.reduce((total, entry) => {
            const start = new Date(entry.startTime);
            const end = new Date(entry.endTime);
            const diff = end.getTime() - start.getTime();
            return total + diff / 1000 / 60 / 60;
        }, 0);
        return totalHours.toFixed(2) + ' hours';
    };

    useEffect(() => {
        if (id) {
            axios
                .get(`http://127.0.0.1:5000/api/project/${id}`)
                .then((response) => {
                    const projectData = response.data;
                    setProject(projectData);
                })
                .catch((error) => console.error('Error fetching project details:', error));
        }
    }, [id]);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:5000/api/timeEntries/${id}`)
            .then((response) => {
                setTimeEntries(response.data);
                setTotalHours(calculateTotalHours(response.data));
            })
            .catch((error) => console.error('Error fetching time entries:', error));
    }, [id]);

    // Group time entries by date
    const groupedEntries = timeEntries.reduce((groups: { [date: string]: TimeEntry[] }, entry) => {
        const date = new Date(entry.startTime).toLocaleDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(entry);
        return groups;
    }, {});

    return (
        <div>
            <div className='mb-8'>
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Project: {project?.name}</h1>
                    <div>
                        <button
                            className="bg-white text-blue-800 px-2 py-2 rounded mx-3"
                            onClick={() => projectId && handleProjectEdit()}
                        >
                            <FaEdit />
                        </button>
                        <button
                            className="bg-white text-blue-800 px-2 py-2 rounded"
                            onClick={() => projectId && handleProjectDelete()}
                        >
                            <FaTrashAlt />
                        </button>
                    </div>
                </div>
                <p>{project?.description}</p>
                <p>Active: {project?.active ? 'Yes' : 'No'}</p>
                <p>Total Hours: {totalHours}</p>
            </div>

            <div>
                <h2 className="text-2xl font-bold my-2">Time Entries</h2>
                {Object.entries(groupedEntries).map(([date, entries]) => (
                    <div key={date} className="my-2">
                        <h2 className="text-xl font-bold">{date}</h2>
                        <ul>
                            {entries.map((entry) => (
                                <li key={entry.id} className="border p-2 my-2">

                                    <div className="flex justify-between items-center">

                                        <h3 className="text-l">
                                            {formatTime(entry.startTime)} - {formatTime(entry.endTime)}
                                        </h3>
                                        <div>
                                            <button
                                                className="bg-white text-blue-800 px-1 py-1 rounded mx-2 text-sm"
                                                onClick={() => id && handleTimeEntryEdit(entry.id)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="bg-white text-blue-800 px-1 py-1 rounded text-sm"
                                                onClick={() => id && handleTimeEntryDelete(entry.id)}
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </div>
                                    <p>{entry.description}</p>
                                    <p>{calculateHours(entry.startTime, entry.endTime)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => projectId && handleAddTimeEntry()}
            >
                Add time entry
            </button>
        </div>
    );
};

export default ViewProject;
