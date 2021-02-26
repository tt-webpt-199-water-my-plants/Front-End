import React, { useState } from 'react'
import AddPlantForm from './AddPlantForm'

const initialPlantInfo = {
  nickname: '',
  species: '',
  waterFrequency: ''
}

export default function AddPlants() {
  const [plantData, setPlantData] = useState(initialPlantInfo)

  const inputChange = (name, value) => {
    setPlantData({...plantData, [name]: value})
  }

  const formSubmit = () => {
      // login function
  }


  return (
    <div className='wrapper'>
      <AddPlantForm 
        plantData={plantData}
        inputChange={inputChange}
        formSubmit={formSubmit}
      />
    </div>
  )
}