import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateUserModal = ({ isOpen, onClose, onUserCreated }) => {
    const [username, setUsername] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [age, setAge] = useState()

    const handleAddUser = async () => {
        if (!username.trim()) {
            toast.error('Username is required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/hobbieuser/addUser', {
                username,
                hobbies,
                age,
            });

            const newUser = response.data;
            toast.success('User created successfully!');
            onUserCreated(newUser); // Trigger the update in HomeComponent
            onClose();
            setUsername('');
            setAge('');
            setHobbies([]);
        } catch (error) {
            toast.error('Failed to create user');
            console.error(error);
        }
    };


    const handleHobbyChange = (event) => {
        const hobby = event.target.value;
        if (!hobbies.includes(hobby) && hobby.trim()) {
            setHobbies((prevHobbies) => [...prevHobbies, hobby]);
            event.target.value = ''; // Clear the input field
        }
    };

    const removeHobby = (hobbyToRemove) => {
        setHobbies((prevHobbies) =>
            prevHobbies.filter((hobby) => hobby !== hobbyToRemove)
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Create User Modal"
            ariaHideApp={false}
            className="create-user-modal"
            overlayClassName="modal-overlay"
        >
            <h2 className="modal-title">Create New User</h2>
            <div className="modal-content">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="input-field"
                />
                <label htmlFor="age">Age</label>
                <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter Age"
                    className="input-field"
                />

                <label htmlFor="hobby">Add Hobbies</label>
                <input
                    type="text"
                    id="hobby"
                    placeholder="Enter a hobby and press Enter"
                    onKeyDown={(e) => e.key === 'Enter' && handleHobbyChange(e)}
                    className="input-field"
                />

                <ul className="hobby-list">
                    {hobbies.map((hobby, index) => (
                        <li key={index} className="hobby-item">
                            {hobby}{' '}
                            <button
                                type="button"
                                onClick={() => removeHobby(hobby)}
                                className="remove-hobby-btn"
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="modal-actions">
                    <button className="add-user-btn" onClick={handleAddUser}>
                        Add User
                    </button>
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CreateUserModal;
