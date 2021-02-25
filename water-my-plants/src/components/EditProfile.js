import React, { useState } from 'react';
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