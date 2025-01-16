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

// Available hobbies
const hobbies = ['Coding', 'Reading', 'Gaming', 'Painting', 'Cooking'];

const HomeComponent = () => {
    const [users, setUsers] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

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
        const hobby = event.dataTransfer.getData('hobby');
        if (!hobby) return;

        const user = users.find((u) => u._id === nodeId);
        if (!user) return;

        if (user.hobbies.includes(hobby)) {
            toast.info('Hobby already added');
            return;
        }

        const updatedHobbies = [...user.hobbies, hobby];

        axios
            .put(`${import.meta.env.VITE_BACKEND_URL}/api/hobbieuser/update/${nodeId}`, { hobbies: updatedHobbies })
            .then(() => {
                toast.success(`Hobby "${hobby}" added to ${user.username}`);

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
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, id)}
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
                {hobbies.map((hobby, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, hobby)}
                        className="hobby-item"
                    >
                        {hobby}
                    </div>
                ))}
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