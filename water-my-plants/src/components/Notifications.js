import React from 'react';
import styled from 'styled-components';

const StyledNotifications = styled.div`
    display: flex;
    align-items: center;
    background: #f0e2e2;
    margin: 0 20px 30px;
    border-radius: 10px;
    padding: 10px;
    font-weight: bold;
    color: #d39797;

    img {
        width: 30px;
        margin-right: 10px;
    }
`;

const Notifications = () => {
    return ( 
        <StyledNotifications>
            <img src="/notification-icon.png" />
            <p>Time to water your plants!</p>
        </StyledNotifications>
     );
}
 
export default Notifications;