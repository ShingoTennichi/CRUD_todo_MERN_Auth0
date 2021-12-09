import React from 'react';
import './Header.css';

function Header() {

    return (
        <>
            <div className="header-wrapper">
                <div className="header-container">
                    <div className="header-space"></div>
                    <h1 className="header-title">MERN Project</h1>
                    <h3 className="header-title">CRUD ToDo List </h3>
                </div>
            </div>
        </>
    )
}

export default Header
