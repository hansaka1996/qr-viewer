import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ItemView from './ItemView';
import Home from './Home';
import './App.css';

function App() {
  useEffect(() => {
    // Register service worker for PWA support
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').catch(() => {
          // Silently fail if service worker isn't available
        });
      });
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:itemId" element={<ItemView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

// 404 Not Found Component
function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🌳</div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>404</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '30px' }}>
        Page not found
      </p>
      <a
        href="/"
        style={{
          padding: '12px 30px',
          background: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = '#5568d3'}
        onMouseLeave={(e) => e.target.style.background = '#667eea'}
      >
        Go Home
      </a>
    </div>
  );
}

export default App;
