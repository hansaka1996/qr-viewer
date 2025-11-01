import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setFilteredItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = items;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.sinhalaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedType, items]);

  const getTypeStats = () => {
    const stats = {
      all: items.length,
      Native: items.filter(i => i.type === 'Native').length,
      Exotic: items.filter(i => i.type === 'Exotic').length,
      Endemic: items.filter(i => i.type === 'Endemic').length,
    };
    return stats;
  };

  const stats = getTypeStats();

  // Styles
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    color: 'white',
    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0 0 10px 0',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    opacity: '0.95',
    fontWeight: '400',
  };

  const searchContainerStyle = {
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const searchInputStyle = {
    width: '100%',
    padding: '16px 20px',
    fontSize: '1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  };

  const filterBarStyle = {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const filterButtonStyle = (type) => ({
    padding: '10px 20px',
    border: 'none',
    borderRadius: '25px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: selectedType === type ? '#667eea' : '#f5f5f5',
    color: selectedType === type ? 'white' : '#333',
    boxShadow: selectedType === type ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none',
  });

  const statsBarStyle = {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const statItemStyle = {
    background: '#f8f9fa',
    padding: '12px 20px',
    borderRadius: '10px',
    textAlign: 'center',
    minWidth: '100px',
    border: '1px solid #e9ecef',
  };

  const statNumberStyle = {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#667eea',
    display: 'block',
  };

  const statLabelStyle = {
    fontSize: '0.85rem',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px',
    marginTop: '30px',
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'block',
    position: 'relative',
  };

  const imageContainerStyle = {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    position: 'relative',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  };

  const cardContentStyle = {
    padding: '20px',
  };

  const sinhalaNameStyle = {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '5px',
  };

  const commonNameStyle = {
    fontSize: '1rem',
    color: '#666',
    fontStyle: 'italic',
    marginBottom: '10px',
  };

  const scientificNameStyle = {
    fontSize: '0.85rem',
    color: '#999',
    marginBottom: '12px',
  };

  const badgeStyle = (type) => {
    const colors = {
      Native: { bg: '#d4edda', color: '#155724', border: '#c3e6cb' },
      Exotic: { bg: '#fff3cd', color: '#856404', border: '#ffeaa7' },
      Endemic: { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' },
    };
    const style = colors[type] || { bg: '#e2e3e5', color: '#383d41', border: '#d6d8db' };
    return {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      background: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
    };
  };

  const loadingStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    fontSize: '1.2rem',
    color: '#666',
  };

  const noResultsStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#666',
  };


  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>🌳 Tree Information</h1>
          <p style={subtitleStyle}>Discover Sri Lankan Trees</p>
        </div>
        <div style={loadingStyle}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🌿</div>
          <div>Loading trees...</div>
        </div>
        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>🌳 Tree Information</h1>
        <p style={subtitleStyle}>Explore {items.length} Trees of Sri Lanka</p>
      </div>

      {/* Stats Bar */}
      <div style={statsBarStyle}>
        <div style={statItemStyle}>
          <span style={statNumberStyle}>{stats.all}</span>
          <span style={statLabelStyle}>Total Trees</span>
        </div>
        <div style={statItemStyle}>
          <span style={statNumberStyle}>{stats.Native}</span>
          <span style={statLabelStyle}>Native</span>
        </div>
        <div style={statItemStyle}>
          <span style={statNumberStyle}>{stats.Exotic}</span>
          <span style={statLabelStyle}>Exotic</span>
        </div>
        <div style={statItemStyle}>
          <span style={statNumberStyle}>{stats.Endemic}</span>
          <span style={statLabelStyle}>Endemic</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="🔍 Search by Sinhala name, common name, or scientific name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />
        
        <div style={filterBarStyle}>
          <button
            onClick={() => setSelectedType('all')}
            style={filterButtonStyle('all')}
            onMouseEnter={(e) => {
              if (selectedType !== 'all') e.target.style.background = '#e9ecef';
            }}
            onMouseLeave={(e) => {
              if (selectedType !== 'all') e.target.style.background = '#f5f5f5';
            }}
          >
            All ({stats.all})
          </button>
          <button
            onClick={() => setSelectedType('Native')}
            style={filterButtonStyle('Native')}
            onMouseEnter={(e) => {
              if (selectedType !== 'Native') e.target.style.background = '#e9ecef';
            }}
            onMouseLeave={(e) => {
              if (selectedType !== 'Native') e.target.style.background = '#f5f5f5';
            }}
          >
            Native ({stats.Native})
          </button>
          <button
            onClick={() => setSelectedType('Exotic')}
            style={filterButtonStyle('Exotic')}
            onMouseEnter={(e) => {
              if (selectedType !== 'Exotic') e.target.style.background = '#e9ecef';
            }}
            onMouseLeave={(e) => {
              if (selectedType !== 'Exotic') e.target.style.background = '#f5f5f5';
            }}
          >
            Exotic ({stats.Exotic})
          </button>
          <button
            onClick={() => setSelectedType('Endemic')}
            style={filterButtonStyle('Endemic')}
            onMouseEnter={(e) => {
              if (selectedType !== 'Endemic') e.target.style.background = '#e9ecef';
            }}
            onMouseLeave={(e) => {
              if (selectedType !== 'Endemic') e.target.style.background = '#f5f5f5';
            }}
          >
            Endemic ({stats.Endemic})
          </button>
        </div>
      </div>

      {/* Results Count */}
      {(searchTerm || selectedType !== 'all') && (
        <div style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
          Showing {filteredItems.length} of {items.length} trees
        </div>
      )}

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div style={noResultsStyle}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔍</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>
            No trees found
          </div>
          <div>Try adjusting your search or filters</div>
        </div>
      ) : (
        <div style={gridStyle}>
          {filteredItems.map(item => (
            <Link
              key={item.id}
              to={`/item/${item.id}`}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              <div style={imageContainerStyle}>
                <img
                  src={`${process.env.PUBLIC_URL}/${item.imageUrl}`}
                  alt={item.commonName}
                  style={imageStyle}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:3rem;">🌳</div>';
                  }}
                />
              </div>
              <div style={cardContentStyle}>
                <div style={sinhalaNameStyle}>{item.sinhalaName}</div>
                <div style={commonNameStyle}>{item.commonName}</div>
                <div style={scientificNameStyle}>{item.scientificName}</div>
                <span style={badgeStyle(item.type)}>{item.type}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem !important;
          }
          input {
            font-size: 16px !important;
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

export default Home;
