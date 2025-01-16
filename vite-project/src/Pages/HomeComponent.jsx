import React, { useState, useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    Background,
    MiniMap,
    Controls,
} from 'react-flow-renderer';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/HomePage.css';
import CreateUserModal from '../Components/CreateUserModal';

// Initial hobbies
const initialHobbies = ['Coding', 'Reading', 'Gaming', 'Painting', 'Cooking'];

const HomeComponent = () => {
    const [users, setUsers] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [hobbies, setHobbies] = useState(initialHobbies);
    const [newHobby, setNewHobby] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch users and initialize nodes
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hobbieuser`)
            .then((response) => {
                const fetchedUsers = response.data;
                setUsers(fetchedUsers);

                const initialNodes = fetchedUsers.map((user, index) => ({
                    id: user._id,
                    type: 'custom',
                    position: { x: 200 * (index % 3), y: 200 * Math.floor(index / 3) },
                    data: {
                        label: user.username,
                        hobbies: user.hobbies || [],
                    },
                }));
                setNodes(initialNodes);
            })
            .catch((error) => {
                toast.error('Error fetching users');
                console.error(error);
            });
    }, []);

    // Add a new hobby to the list
    const handleAddHobby = () => {
        if (!newHobby.trim()) {
            toast.error('Hobby cannot be empty');
            return;
        }

        if (hobbies.includes(newHobby.trim())) {
            toast.info('Hobby already exists');
            return;
        }

        setHobbies((prevHobbies) => [...prevHobbies, newHobby.trim()]);
        toast.success(`Hobby "${newHobby.trim()}" added`);
        setNewHobby('');
    };

    // Delete a hobby from the list
    const handleDeleteHobby = (hobbyToDelete) => {
        setHobbies((prevHobbies) => prevHobbies.filter((hobby) => hobby !== hobbyToDelete));
        toast.success(`Hobby "${hobbyToDelete}" removed`);
    };


    const handleUserCreated = (newUser) => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hobbieuser`)
            .then((response) => {
                const fetchedUsers = response.data;
                setUsers(fetchedUsers);

                const updatedNodes = fetchedUsers.map((user, index) => ({
                    id: user._id,
                    type: 'custom',
                    position: { x: 200 * (index % 3), y: 200 * Math.floor(index / 3) },
                    data: {
                        label: user.username,
                        hobbies: user.hobbies || [],
                    },
                }));
                setNodes(updatedNodes);
            })
            .catch((error) => {
                toast.error('Failed to fetch updated users');
                console.error(error);
            });
    };


    const handleDeleteUser = (userId) => {
        axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/api/hobbieuser/delete/${userId}`)
            .then(() => {
                toast.success('User deleted successfully');
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
                setNodes((prevNodes) => prevNodes.filter((node) => node.id !== userId));
            })
            .catch((error) => {
                toast.error('Failed to delete user');
                console.error(error);
            });
    };

    const handleDragStart = (event, hobby) => {
        event.dataTransfer.setData('hobby', hobby);
    };


    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, nodeId) => {
        event.preventDefault(); // Prevent default browser behavior
        const hobby = event.dataTransfer.getData('hobby');

        if (!hobby) {
            toast.error('Invalid hobby!');
            return;
        }

        const user = users.find((u) => u._id === nodeId);
        if (!user) {
            toast.error('User not found!');
            return;
        }

        if (user.hobbies.includes(hobby)) {
            toast.info('Hobby already added to this user');
            return;
        }

        const updatedHobbies = [...user.hobbies, hobby];

        // Update on backend
        axios
            .put(`${import.meta.env.VITE_BACKEND_URL}/api/hobbieuser/update/${nodeId}`, { hobbies: updatedHobbies })
            .then(() => {
                toast.success(`Hobby "${hobby}" added to ${user.username}`);

                // Update frontend state
                setUsers((prevUsers) =>
                    prevUsers.map((u) =>
                        u._id === nodeId ? { ...u, hobbies: updatedHobbies } : u
                    )
                );
                setNodes((prevNodes) =>
                    prevNodes.map((node) =>
                        node.id === nodeId
                            ? { ...node, data: { ...node.data, hobbies: updatedHobbies } }
                            : node
                    )
                );
            })
            .catch((error) => {
                toast.error('Failed to update user hobbies');
                console.error(error);
            });
    };


    const CustomNodeComponent = ({ data, id }) => {
        return (
            <div
                className="node"
                onDragOver={(e) => e.preventDefault()} // Allow drag events
                onDrop={(e) => handleDrop(e, id)} // Handle drop event
            >
                <h4>
                    {data.label}
                    <button
                        onClick={() => handleDeleteUser(id)}
                        className="delete-user-button"
                        title="Delete User"
                    >
                        ✖
                    </button>
                </h4>
                <ul>
                    {data.hobbies.map((hobby, index) => (
                        <li key={index}>{hobby}</li>
                    ))}
                </ul>
            </div>
        );
    };


    return (
        <div className="home-container">
            {/* Sidebar for hobbies */}
            <div className="hobbies-sidebar">
                <h3>Hobbies</h3>
                <input
                    type="text"
                    placeholder="Add a new hobby"
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    className="hobby-input"
                />
                <button onClick={handleAddHobby} className="add-hobby-button">
                    Add Hobby
                </button>
                <div className="hobbies-list">
                    {hobbies.map((hobby, index) => (
                        <div
                            key={index}
                            className="hobby-item"
                            draggable
                            onDragStart={(e) => handleDragStart(e, hobby)}
                        >
                            <span>{hobby}</span>
                            <button
                                onClick={() => handleDeleteHobby(hobby)}
                                className="delete-hobby-button"
                                title="Delete Hobby"
                            >
                                ✖
                            </button>
                        </div>
                    ))}
                </div>

                <button onClick={() => setIsModalOpen(true)} className="add-user-button">
                    Add New User
                </button>
            </div>

            {/* ReactFlow container */}
            <div className="reactflow-container">
                <ReactFlowProvider>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={{ custom: CustomNodeComponent }}
                        fitView
                    >
                        <Background />
                        <MiniMap />
                        <Controls />
                    </ReactFlow>
                </ReactFlowProvider>
            </div>

            {/* Create User Modal */}
            <CreateUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUserCreated={handleUserCreated}
            />
        </div>
    );
};

export default HomeComponent;