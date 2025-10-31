import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

function ItemView() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [relatedItems, setRelatedItems] = useState([]);
  const detailsRef = useRef(null);
  const [animateCards, setAnimateCards] = useState(false);

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
    transition: 'opacity 0.5s ease-in-out',
    cursor: 'zoom-in'
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
    color: '#001a35ff',
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

  const lightboxStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.95)',
    display: isImageExpanded ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    cursor: 'zoom-out',
    animation: isImageExpanded ? 'fadeIn 0.3s ease' : 'none'
  };

  const lightboxImageStyle = {
    maxWidth: '90%',
    maxHeight: '90%',
    objectFit: 'contain',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
  };

  const breadcrumbStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
    fontSize: '0.9rem',
    color: '#666'
  };

  const breadcrumbLinkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    transition: 'color 0.2s'
  };

  const actionBarStyle = {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  };

  const actionButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 18px',
    background: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    color: '#495057',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    position: 'relative'
  };

  const favoriteActiveStyle = {
    ...actionButtonStyle,
    background: '#fff3cd',
    borderColor: '#ffc107',
    color: '#856404'
  };

  const tooltipStyle = {
    position: 'absolute',
    top: '-35px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#28a745',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    whiteSpace: 'nowrap',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease'
  };

  const badgeContainerStyle = {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  };

  const badgeStyle = {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const relatedSectionStyle = {
    marginTop: '50px',
    paddingTop: '40px',
    borderTop: '2px solid #f0f0f0'
  };

  const relatedGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  };

  const relatedCardStyle = {
    background: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #e9ecef',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit'
  };

  const relatedImageStyle = {
    width: '100%',
    height: '150px',
    objectFit: 'cover'
  };

  const relatedContentStyle = {
    padding: '15px'
  };

  const skeletonStyle = {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '8px'
  };

  const cardAnimationStyle = {
    opacity: animateCards ? 1 : 0,
    transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.5s ease'
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
        
        // Find related items (same family or type)
        if (foundItem) {
          const related = data
            .filter(i => 
              i.id !== itemId && 
              (i.family === foundItem.family || i.type === foundItem.type)
            )
            .slice(0, 3);
          setRelatedItems(related);
          
          // Check if item is favorited
          const favorites = JSON.parse(localStorage.getItem('favoritePlants') || '[]');
          setIsFavorite(favorites.includes(itemId));
        }
        
        setLoading(false);
        setTimeout(() => setAnimateCards(true), 100);
      })
      .catch(err => {
        console.error("Error fetching item:", err);
        setLoading(false);
      });
  }, [itemId]);

  const handleShare = async () => {
    const url = window.location.href;
    const title = `${item.sinhalaName} - ${item.commonName}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    });
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoritePlants') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== itemId);
    } else {
      newFavorites = [...favorites, itemId];
    }
    
    localStorage.setItem('favoritePlants', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const getBadges = () => {
    const badges = [];
    if (item.edibility === 'Edible') {
      badges.push({ text: 'Edible', color: '#28a745', bg: '#d4edda' });
    }
    if (item.uses && item.uses.toLowerCase().includes('medicinal')) {
      badges.push({ text: 'Medicinal', color: '#17a2b8', bg: '#d1ecf1' });
    }
    if (item.ecologicalImportance && item.ecologicalImportance !== '–') {
      badges.push({ text: 'Ecological', color: '#6f42c1', bg: '#e2d9f3' });
    }
    return badges;
  };

  const SkeletonLoader = () => (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ ...responsiveImageContainerStyle, ...skeletonStyle }}></div>
        <div style={responsiveContentStyle}>
          <div style={{ ...skeletonStyle, height: '40px', width: '70%', marginBottom: '10px' }}></div>
          <div style={{ ...skeletonStyle, height: '30px', width: '50%', marginBottom: '30px' }}></div>
          <div style={{ ...skeletonStyle, height: '100px', marginBottom: '20px' }}></div>
          <div style={responsiveDetailsGridStyle}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ ...skeletonStyle, height: '80px' }}></div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!item) {
    return (
      <div style={loadingStyle}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔍</div>
          <div style={{ color: '#dc3545', marginBottom: '10px', fontSize: '1.3rem', fontWeight: '600' }}>
            Plant not found
          </div>
          <div style={{ color: '#666', marginBottom: '20px' }}>
            The plant you're looking for doesn't exist in our database.
          </div>
          <Link to="/" style={{ ...backLinkStyle, display: 'inline-flex' }}>
            ← Browse All Plants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Breadcrumb */}
      <div style={breadcrumbStyle}>
        <Link to="/" style={breadcrumbLinkStyle}>Home</Link>
        <span>›</span>
        <span>{item.type || 'Plants'}</span>
        <span>›</span>
        <span style={{ color: '#333', fontWeight: '500' }}>{item.commonName}</span>
      </div>

      <div style={{ ...cardStyle, ...cardAnimationStyle }}>
        <div style={responsiveImageContainerStyle}>
          <img 
            src={`${process.env.PUBLIC_URL}/${item.imageUrl}`} 
            alt={item.commonName} 
            style={imageStyle}
            onLoad={() => setImageLoaded(true)}
            onClick={() => setIsImageExpanded(true)}
          />
        </div>
        
        <div style={responsiveContentStyle}>
          <div style={headerStyle}>
            <h1 style={responsiveTitleStyle}>{item.sinhalaName}</h1>
            <h2 style={responsiveCommonNameStyle}>{item.commonName}</h2>
          </div>

          {/* Action Bar */}
          <div style={actionBarStyle}>
            <button 
              style={isFavorite ? favoriteActiveStyle : actionButtonStyle}
              onClick={toggleFavorite}
              onMouseEnter={(e) => !isMobile && (e.currentTarget.style.background = isFavorite ? '#ffe69c' : '#e9ecef')}
              onMouseLeave={(e) => !isMobile && (e.currentTarget.style.background = isFavorite ? '#fff3cd' : '#f8f9fa')}
            >
              <span>{isFavorite ? '★' : '☆'}</span>
              <span>{isFavorite ? 'Saved' : 'Save'}</span>
            </button>
            
            <button 
              style={actionButtonStyle}
              onClick={handleShare}
              onMouseEnter={(e) => !isMobile && (e.currentTarget.style.background = '#e9ecef')}
              onMouseLeave={(e) => !isMobile && (e.currentTarget.style.background = '#f8f9fa')}
            >
              <span>📤</span>
              <span>Share</span>
              {showShareTooltip && <div style={tooltipStyle}>Link copied!</div>}
            </button>

            <button 
              style={actionButtonStyle}
              onClick={() => window.print()}
              onMouseEnter={(e) => !isMobile && (e.currentTarget.style.background = '#e9ecef')}
              onMouseLeave={(e) => !isMobile && (e.currentTarget.style.background = '#f8f9fa')}
            >
              <span>🖨️</span>
              <span>Print</span>
            </button>
          </div>

          {/* Badges */}
          {getBadges().length > 0 && (
            <div style={badgeContainerStyle}>
              {getBadges().map((badge, idx) => (
                <span 
                  key={idx} 
                  style={{
                    ...badgeStyle,
                    color: badge.color,
                    background: badge.bg,
                    border: `1px solid ${badge.color}`
                  }}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          )}

          {item.uses && item.uses.trim() !== '–' && item.uses.trim() !== '_' && (
            <div style={responsiveUsesCardStyle}>
              <div style={labelStyle}>💡 Uses & Benefits</div>
              <p style={usesTextStyle}>{item.uses}</p>
            </div>
          )}

          <div style={{ marginBottom: '30px' }} ref={detailsRef}>
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

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <div style={relatedSectionStyle}>
              <div style={sectionTitleStyle}>Related Plants</div>
              <div style={relatedGridStyle}>
                {relatedItems.map((related) => (
                  <Link
                    key={related.id}
                    to={`/item/${related.id}`}
                    style={relatedCardStyle}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    <img 
                      src={`${process.env.PUBLIC_URL}/${related.imageUrl}`}
                      alt={related.commonName}
                      style={relatedImageStyle}
                    />
                    <div style={relatedContentStyle}>
                      <div style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                        {related.sinhalaName}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>
                        {related.commonName}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <BackLink />
        </div>
      </div>

      {/* Lightbox for image zoom */}
      {isImageExpanded && (
        <div style={lightboxStyle} onClick={() => setIsImageExpanded(false)}>
          <img 
            src={`${process.env.PUBLIC_URL}/${item.imageUrl}`}
            alt={item.commonName}
            style={lightboxImageStyle}
          />
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ItemView;



