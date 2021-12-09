import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty'
import './Navbar.css';

function Navbar() {
    const { loginWithRedirect } = useAuth0();
    const { logout} = useAuth0();
    const { user, isAuthenticated } = useAuth0();
    return (
        <>
            <nav className="navbar-container">
                <div className="navbar-contents">
                    <div className="navbar-item">
                        <Link to="/" className="icon">
                            To-Do
                        </Link>
                    </div>
                    <div className="navbar-item">
                        {!(isAuthenticated) && (
                        <button onClick={ () => loginWithRedirect() } className="signInUp">
                            Sign In
                        </button>)}
                        {(isAuthenticated) && (
                        <button onClick={ logout } className="signInUp">
                            Sign Out
                        </button>)}
                        {!(isAuthenticated) && (
                        <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })} className="signInUp">
                            Sign Up
                        </button>)}
                        {(isAuthenticated) && (
                        <h1 className="signInUp">
                            <i className="fas fa-universal-access"></i>
                            <JSONPretty data={user.name} display={{fontSize:5 + 'px'}} />
                                {/* {JSON.stringify(user.name, null, 2)} */}
                        </h1>)}
                        {(!isAuthenticated) && (
                        <h1 className="signInUp">
                            <i className="fas fa-universal-access"></i>
                            Guest
                        </h1>)}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

