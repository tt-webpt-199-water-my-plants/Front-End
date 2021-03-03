import React from 'react';

const PlantForm = (props) => {
    const { handleSubmit, handleChange, state, imageUploader, uploadedImage } = props;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="newPlant form-group">
                    <input
                        value={state.nickname}
                        onChange={handleChange}
                        name="nickname"
                        id="nickname"
                        placeholder="Nickname"
                    />
                    <input
                        value={state.h20Frequency}
                        onChange={handleChange}
                        name="h20Frequency"
                        id="h20Frequency"
                        placeholder="H2O Frequency"
                    />
                    <input
                        value={state.speciesName}
                        onChange={handleChange}
                        name="speciesName"
                        id="speciesName"
                        placeholder="Species Name"
                    />
                    <div
                        className="preview-img"
                        onClick={() => imageUploader.current.click()}
                    >
                        <img ref={uploadedImage} alt="flower" />
                    </div>
                </div>
                <button>Submit Plant</button>
            </form>
        </div>
    )
}

export default PlantForm;