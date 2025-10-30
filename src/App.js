import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ItemView from './ItemView'; // We will create this
import Home from './Home'; // We will create this

// A simple container style
const appStyles = {
  maxWidth: '700px',
  margin: '20px auto',
  padding: '0 15px',
  fontFamily: 'Arial, sans-serif'
};

function App() {
  return (
    <div style={appStyles}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:itemId" element={<ItemView />} />
      </Routes>
    </div>
  );
}

export default App;