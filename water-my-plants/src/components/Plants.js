import React from 'react';
import Notifications from './Notifications';
import PlantsList from './PlantsList';
import Navigation from './Navigation';


function Plants() {
    return (
        <div>
            <Notifications />
            <h2>My Plants</h2>
            <PlantsList />
            <Navigation />
        </div>
    )
}

export default Plants;