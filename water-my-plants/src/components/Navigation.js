import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return ( 
        <div>
            <nav>
                <Link to="/plants">
                    <img src="/home-icon.png" />
                    <span>Home</span>
                </Link>
                <Link to="/plants/add">
                    <img src="/add-button.png" />
                </Link>
                <Link to="/profile">
                    <img src="/profile-icon.png" />
                    <span>Profile</span>
                </Link>
            </nav>
        </div>
     );
}
 
export default Navigation;