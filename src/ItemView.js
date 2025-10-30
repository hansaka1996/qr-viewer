import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ItemView() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    '@media (max-width: 768px)': {
      padding: '10px'
    }
  };

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
    overflow: 'hidden',
    transition: 'transform 0.2s ease',
  };

  const imageContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '400px',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: imageLoaded ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out'
  };

  const contentStyle = {
    padding: '40px',
  };

  const headerStyle = {
    marginBottom: '30px',
    paddingBottom: '25px',
    borderBottom: '2px solid #f0f0f0'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '8px',
    lineHeight: '1.2'
  };

  const commonNameStyle = {
    fontSize: '1.5rem',
    color: '#666',
    fontStyle: 'italic',
    fontWeight: '400'
  };

  const sectionTitleStyle = {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const detailsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  };

  const detailCardStyle = {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e9ecef',
    transition: 'all 0.3s ease',
    cursor: 'default'
  };

  const detailCardHoverStyle = {
    ...detailCardStyle,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    borderColor: '#007bff'
  };

  const labelStyle = {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#007bff',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px'
  };

  const valueStyle = {
    fontSize: '1rem',
    color: '#2c2c2c',
    lineHeight: '1.6',
    fontWeight: '500'
  };

  const usesCardStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '25px',
    borderRadius: '12px',
    color: '#ffffff',
    marginBottom: '30px'
  };

  const usesTextStyle = {
    fontSize: '1.05rem',
    lineHeight: '1.7',
    margin: '0'
  };

  const backLinkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: '#007bff',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    fontSize: '0.95rem'
  };

  const backLinkHoverStyle = {
    ...backLinkStyle,
    background: '#0056b3',
    transform: 'translateX(-4px)',
    boxShadow: '0 4px 12px rgba(0,123,255,0.3)'
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    fontSize: '1.2rem',
    color: '#666'
  };

  // Responsive adjustments
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const responsiveImageContainerStyle = {
    ...imageContainerStyle,
    height: isMobile ? '250px' : isTablet ? '300px' : '400px'
  };

  const responsiveContentStyle = {
    ...contentStyle,
    padding: isMobile ? '20px' : isTablet ? '30px' : '40px'
  };

  const responsiveTitleStyle = {
    ...titleStyle,
    fontSize: isMobile ? '1.8rem' : isTablet ? '2.2rem' : '2.5rem'
  };

  const responsiveCommonNameStyle = {
    ...commonNameStyle,
    fontSize: isMobile ? '1.1rem' : isTablet ? '1.3rem' : '1.5rem'
  };

  const responsiveDetailsGridStyle = {
    ...detailsGridStyle,
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: isMobile ? '15px' : '20px'
  };

  const responsiveDetailCardStyle = {
    ...detailCardStyle,
    padding: isMobile ? '15px' : '20px'
  };

  const responsiveUsesCardStyle = {
    ...usesCardStyle,
    padding: isMobile ? '20px' : '25px'
  };

  const responsiveBackLinkStyle = {
    ...backLinkStyle,
    padding: isMobile ? '10px 20px' : '12px 24px',
    fontSize: isMobile ? '0.9rem' : '0.95rem',
    width: isMobile ? '100%' : 'auto',
    justifyContent: isMobile ? 'center' : 'flex-start'
  };

  const DetailCard = ({ label, value, icon }) => {
    const [isHovered, setIsHovered] = useState(false);

    // --- THIS IS THE FIX ---
    if (!value || value.trim() === '–' || value.trim() === '_') {
      return null;
    }

    const cardStyle = isHovered && !isMobile ? detailCardHoverStyle : responsiveDetailCardStyle;

    return (
      <div 
        style={cardStyle}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={labelStyle}>{icon} {label}</div>
        <div style={valueStyle}>{value}</div>
      </div>
    );
  };

  const BackLink = () => {
    const [isHovered, setIsHovered] = useState(false);

    const linkStyle = isHovered && !isMobile ? backLinkHoverStyle : responsiveBackLinkStyle;

    return (
      <Link 
        to="/" 
        style={linkStyle}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span>←</span>
        <span>Back to Home</span>
      </Link>
    );
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then(res => res.json())
      .then(data => {
        const foundItem = data.find(i => i.id === itemId);
        setItem(foundItem);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching item:", err);
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div style={loadingStyle}>
        <div style={{ color: '#dc3545' }}>Item not found.</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={responsiveImageContainerStyle}>
          <img 
            src={`${process.env.PUBLIC_URL}/${item.imageUrl}`} 
            alt={item.commonName} 
            style={imageStyle}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        <div style={responsiveContentStyle}>
          <div style={headerStyle}>
            <h1 style={responsiveTitleStyle}>{item.sinhalaName}</h1>
            <h2 style={responsiveCommonNameStyle}>{item.commonName}</h2>
          </div>

          {/* --- THIS IS THE SECOND FIX --- */}
          {item.uses && item.uses.trim() !== '–' && item.uses.trim() !== '_' && (
            <div style={responsiveUsesCardStyle}>
              <div style={labelStyle}>💡 Uses & Benefits</div>
              <p style={usesTextStyle}>{item.uses}</p>
            </div>
          )}

          <div style={{ marginBottom: '30px' }}>
            <div style={sectionTitleStyle}>Details</div>
            <div style={responsiveDetailsGridStyle}>
              <DetailCard label="Scientific Name" value={item.scientificName} icon="🔬" />
              <DetailCard label="Family" value={item.family} icon="🌿" />
              <DetailCard label="Type" value={item.type} icon="🏷️" />
              <DetailCard label="Edibility" value={item.edibility} icon="🍴" />
              <DetailCard label="Edible Part" value={item.ediblePart} icon="🥗" />
              <DetailCard label="Ecological Importance" value={item.ecologicalImportance} icon="🌍" />
            </div>
          </div>

          <BackLink />
        </div>
      </div>
    </div>
  );
}

export default ItemView;