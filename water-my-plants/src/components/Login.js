import React, { useState } from 'react'
import LoginForm from './LoginForm'

const initialLogIn = {
  username: '',
  password: ''
}

export default function LogIn() {
  const [logInData, setLogInData] = useState(initialLogIn)

  const inputChange = (name, value) => {
    setLogInData({...logInData, [name]: value})
  }

  const formSubmit = () => {
      // login function
  }


  return (
    <div className='wrapper'>
      <LoginForm 
        value={logInData}
        change={inputChange}
        submit={formSubmit}
      />
    </div>
  )
}