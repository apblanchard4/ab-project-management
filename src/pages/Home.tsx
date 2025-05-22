import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-navy-700 text-white flex flex-col justify-center items-center p-4">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                AB's Time Tracking
            </h1>

            {/* View Projects Link */}
            <Link
                className="bg-navy-500 hover:bg-navy-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 border-2 border-white-700"
                to="/viewProjects"
            >
                View Projects
            </Link>


            {/* View Time Link */}
            <Link
                className="bg-navy-500 hover:bg-navy-600 text-white font-semibold my-4 py-2 px-7 rounded shadow-md transition duration-300 border-2 border-white-700"
                to="/viewTime"
            >
                View Time
            </Link>
        </div>
    );
};

export default Home;
