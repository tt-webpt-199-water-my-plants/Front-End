import React from 'react';

const Plant = (props) => {
    const { plant } = props;
    const plantImage = (plant.image === 'null' || !plant.image) ? '/plant-thumbnail.png' : plant.image;
    return ( 
        <div>
            <img src={plantImage} />
            <div className="plant-content">
                <p>{plant.nickname} <span>{plant.speciesName}</span></p>
                <p>Watering Frequency: {plant.h20Frequency} days</p>
            </div>
            <button>x</button>
        </div>
     );
}
 
export default Plant;