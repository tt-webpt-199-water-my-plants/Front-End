import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../components/UserForm';

const initialForm = {
    username: "",
    password: "",
    phoneNumber: ""
}

function Signup() {
    const [form, setForm] = useState(initialForm);

    const update = (name, value) => {
        setForm({...form, [name]: value});
    }

    const submit = () => {
        // use axios to post form data to create a new user
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        update(name, value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        submit();
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <UserForm 
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                buttonText="Sign Up"
            />
            <div>
                <p>Already have an account?</p>
                <p><Link to="/login">Log In</Link></p>
            </div>
        </div>
    )
}

export default Signup;