import React from 'react';

function UserForm(props) {
    const {form, handleChange, handleSubmit, buttonText} = props;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="tel"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                    />
                </div>
                <button>{buttonText}</button>
            </form>
        </div>
    )
}

export default UserForm;