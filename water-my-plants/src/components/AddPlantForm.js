import React, { useState } from 'react'

export default function AddPlantForm(props) {
  const {
    plantData,
    inputChange,
    formSubmit
  } = props
  console.log(plantData)
  const [file, setFile] = useState('')

  const onUpload = evt => {
    setFile(evt.target.files[0])
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    formSubmit()
  }

  const onChange = (evt) => {
    const { name, value } = evt.target
    inputChange(name, value)
  }

  return (
    <div>
      <header>
        <h1>Add Plant</h1>
      </header>
      <section>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              value={plantData.nickname}
              onChange={onChange}
              name='nickname'
              type='text'
              placeholder='Nickname'
            />
          </div>

          <div className='form-group'>
            <input
              value={plantData.species}
              onChange={onChange}
              name='species'
              type='text'
              placeholder='Species'
            />
          </div>

          <div className='form-group'>
            <select
              value={plantData.waterFrequency}
              onChange={onChange}
              name='waterFrequency'
            >
              <option value=''>Watering Frequency</option>
              <option value='1-3Days'>1-3 Days</option>
              <option value='4-7Days'>4-7 Days</option>
              <option value='7-14Days'>7-14 Days</option>
              <option value='14-21Days'>14-21 Days</option>
              </select>
          </div>
          <div id='upload-box'>
            <p>Upload Photo</p>
            <input type='file' onChange={onUpload} placeholder='Upload Photo'/>
          </div>
        </form>
        <button>Submit</button>
      </section>
    </div>
  )
}