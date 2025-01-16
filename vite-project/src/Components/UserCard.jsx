import React from 'react';

const UserCard = ({ node }) => {
    return (
        <div style={{
            backgroundColor: '#ffffff',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
        }}>
            <h4 style={{ marginBottom: '10px', color: '#333', fontSize: '18px' }}>
                {node.data.label}
            </h4>
            <p style={{
                color: '#555',
                fontSize: '14px',
                margin: 0,
            }}>
                <strong>Hobbies:</strong> {node.data.hobbies?.length > 0 ? node.data.hobbies.join(', ') : 'None'}
            </p>
        </div>
    );
};

export default UserCard;
