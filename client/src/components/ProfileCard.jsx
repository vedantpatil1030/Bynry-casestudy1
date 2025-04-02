import React from 'react';
import { Link } from 'react-router-dom';
import { useProfiles } from '../context/ProfileContext';

const ProfileCard = ({ profile }) => {
  const { setSelectedProfile } = useProfiles();

  const handleMapClick = () => {
    setSelectedProfile(profile);
    
    const mapElement = document.querySelector('.map-container');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="profile-card">
      <img 
        src={profile.photo.startsWith('http') 
          ? profile.photo 
          : `http://localhost:5000/uploads/${profile.photo}`
        } 
        alt={profile.name} 
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
        }}
      />
      <div className="profile-card-content">
        <h3 className="profile-name">{profile.name}</h3>
        <p className="profile-description">
          {profile.description.length > 100
            ? `${profile.description.slice(0, 100)}...`
            : profile.description}
        </p>
        <div className="profile-actions">
          <button onClick={handleMapClick} className="btn btn-primary">
            Show on Map
          </button>
          <Link to={`/profile/${profile._id}`} className="btn btn-success">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;