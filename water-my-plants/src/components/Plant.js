import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledPlant = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 2px solid #efefef;

    img {
        width: 100px;
        height: auto;
        margin-right: 20px;
    }

    .plant-content {
        flex: 1 1 auto;
    }

    button {
        background: none;
        border: 2px solid #ccc;
        color: #ccc;
        font-weight: bold;
        font-size: 1.05rem;
        border-radius: 50px;
        width: 30px;
        height: 30px;

        &:hover {
            cursor: pointer;
        }
    }

    .nickname {
        color: #000;
        font-size: 1.1rem;
        font-weight: 500;
    }

    .species {
        color: #999;
    }

    .watering-frequency {
        color: #999;
    }
`;

const Plant = (props) => {
    const { plant } = props;
    const plantImage = (plant.image === 'null' || !plant.image) ? '/plant-thumbnail.png' : plant.image;
    return ( 
        <Link to={`/plants/${plant.id}/edit`}>
            <StyledPlant>
                <img src={plantImage} />
                <div className="plant-content">
                    <p className="nickname">{plant.nickname} <span className="species">({plant.speciesName})</span></p>
                    <p className="watering-frequency">Watering Frequency: {plant.h20Frequency} days</p>
                </div>
                <button>x</button>
            </StyledPlant>
        </Link>
     );
}
 
export default Plant;