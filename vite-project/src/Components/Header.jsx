import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Ensure toast is imported

import '../styles/Header.css';

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        setIsLoggedIn(!!authToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        toast.success('Logged Out!');
        navigate('/login');
    };


    return (
        <div className="spectacledcoder-navbar">
            <div className="brand">
                <h1>HobbyMap</h1>
            </div>
            <ul>
                <li><Link to="/">Home</Link><div className="rect"></div></li>
                <li><Link to="/">About</Link><div className="rect"></div></li>
                <li><Link to="/">Services</Link><div className="rect"></div></li>
                <li><Link to="/">Careers</Link><div className="rect"></div></li>
                {isLoggedIn ? (
                    <li onClick={handleLogout} className='logoutHeaderli'>Logout<div className="rect"></div></li>
                ) : (
                    <li><Link to="/login">Login</Link><div className="rect"></div></li>
                )}
            </ul>

            <div className="navbar-toggler" id="toggler">
                <div className="line1" id="ln1"></div>
                <div className="line2" id="ln2"></div>
            </div>
        </div>
    );
};

export default Header;
