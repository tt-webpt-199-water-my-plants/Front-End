import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';

const initialForm = {
    username: "",
    password: "",
    phoneNumber: ""
}

function EditProfile() {
    const [form, setForm] = useState(initialForm);

    const update = (name, value) => {
        setForm({...form, [name]: value});
    }

    const submit = () => {
        // use axios to post put/update data for the current user
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        update(name, value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        submit();
    }

    useEffect(() => {
        // get user data and update form state with user's username, password, and phone number
    }, []);

    return (
        <div>
            <h2>Edit Profile</h2>
            <UserForm 
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                buttonText="Submit"
            />
        </div>
    )
}

export default EditProfile;