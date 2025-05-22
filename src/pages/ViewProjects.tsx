import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Project {
    id: string;
    name: string;
    description: string;
    active: boolean;
}

const ViewProjects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        //TODO UPDATE ENDPOINT
        axios.get('http://127.0.0.1:5000/api/projects')
            .then(response => { setProjects(response.data); setFilteredProjects(response.data) })
            .catch(error => console.error('Error fetching projects:', error));
    }, []);


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchTerm(query);

        const filtered = projects.filter(project =>
            project.name.toLowerCase().includes(query) ||
            (project.description && project.description.toLowerCase().includes(query))
        );
        setFilteredProjects(filtered);
    };

    const handleProjectClick = (id: string, name: string) => {
        navigate(`/viewProject/${id}`, { state: { name } });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Projects</h1>
                <button
                    className="bg-white text-blue-800 px-4 py-2 rounded"
                    onClick={() => window.location.href = '/createProject'}>
                    Create Project
                </button>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full p-2 border rounded text-black"
                />
            </div>
            <ul>
                {filteredProjects.map(project => (
                    <li key={project.id} className="border p-2 my-2" onClick={() => handleProjectClick(project.id, project.name)}>
                        <h2 className="text-xl">{project.name}</h2>
                        <p>{project.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewProjects;
