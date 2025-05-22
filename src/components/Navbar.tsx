import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="bg-navy text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">

            <Link
                className="hover:text-navy-light transition-colors duration-300 font-bold"
                to="/"
            >AB
            </Link>

        </div>
        <ul className="flex space-x-6 text-sm md:text-base">
            <li>
                <Link
                    className="hover:text-navy-light transition-colors duration-300"
                    to="/viewProjects"
                >
                    Projects
                </Link>
            </li>
            <li>
                <Link
                    className="hover:text-navy-light transition-colors duration-300"
                    to="/viewTime"
                >
                    Time
                </Link>
            </li>
        </ul>
    </nav>
);

export default Navbar;
