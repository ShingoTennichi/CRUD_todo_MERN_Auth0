import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const Auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const Auth0ClientId= process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
    <Auth0Provider
        domain={ Auth0Domain }
        clientId={ Auth0ClientId }
        redirectUri={ window.location.origin }
    >
        <App />
    </Auth0Provider>
    ,
    document.getElementById('root')
);
