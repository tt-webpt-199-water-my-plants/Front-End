import React from 'react';
import Notifications from './Notifications';
import PlantsList from './PlantsList';
import Navigation from './Navigation';
import styled from 'styled-components';

const StyledPlants = styled.div`
    padding-bottom: 150px;
    width: 100%;
    max-width: 1000px;

    h2 {
        padding: 0 20px;
    }
`;


function Plants() {
    return (
        <StyledPlants>
            <Notifications />
            <h2>My Plants</h2>
            <PlantsList />
            <Navigation />
        </StyledPlants>
    )
}

export default Plants;