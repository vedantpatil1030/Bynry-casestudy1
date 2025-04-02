import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '../context/ProfileContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();

  const handleViewSummary = () => {
    navigate(`/profile/${profile._id}`);
  };

  return (
    <div className="profile-card-detailed">
      <div className="profile-image-section">
        <img
          src={profile.photo.startsWith('http') 
            ? profile.photo 
            : `http://localhost:5000/uploads/${profile.photo}`
          }
          alt={profile.name}
          className="profile-image-detailed"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
      </div>
      <div className="profile-content-section">
        <h2 className="profile-name">{profile.name}</h2>
        <p className="profile-description">{profile.description}</p>
        
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <span className="detail-text">{profile.address}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📧</span>
            <span className="detail-text">{profile.contactInfo.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📞</span>
            <span className="detail-text">{profile.contactInfo.phone}</span>
          </div>
        </div>

        <div className="profile-tags">
          {profile.interests.map((interest, index) => (
            <span key={index} className="interest-tag">
              {interest}
            </span>
          ))}
        </div>

        <button 
          className="view-details-btn" 
          onClick={handleViewSummary}
        >
          View Full Profile
        </button>
      </div>
    </div>
  );
};

const ProfilesListPage = () => {
  const { profiles, loading, error } = useProfiles();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="profiles-list-page">
      <div className="profiles-header">
        <h1>Our Profiles</h1>
        <p className="profiles-subtitle">Discover and connect with amazing people</p>
      </div>
      
      {profiles.length === 0 ? (
        <div className="no-profiles-container">
          <div className="no-profiles-content">
            <div className="no-profiles-icon">📭</div>
            <h2>No Profiles Found</h2>
            <p>There are currently no profiles available.</p>
            <p className="no-profiles-subtitle">Check back later or try adjusting your search criteria.</p>
          </div>
        </div>
      ) : (
        <div className="profiles-container">
          {profiles.map((profile) => (
            <ProfileCard key={profile._id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilesListPage;