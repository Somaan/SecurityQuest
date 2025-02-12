import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '2rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{ 
        fontSize: '2rem',
        marginBottom: '1rem'
      }}>
        Oops, something went wrong!
      </h1>
      <p style={{ 
        fontSize: '1rem',
        marginBottom: '2rem',
        color: '#666'
      }}>
        Tarnished, your page seizes to exist
      </p>
      <button 
        onClick={() => navigate('/')}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#1a1a1a',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
