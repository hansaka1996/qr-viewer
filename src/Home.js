import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from the file in the public folder
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Item Collection</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.id} style={{ 
            background: '#f4f4f4', 
            margin: '10px 0', 
            padding: '15px', 
            borderRadius: '5px' 
          }}>
            <Link 
              to={`/item/${item.id}`} 
              style={{ textDecoration: 'none', color: '#333', fontSize: '1.2rem' }}
            >
              {item.sinhalaName} ({item.commonName})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;