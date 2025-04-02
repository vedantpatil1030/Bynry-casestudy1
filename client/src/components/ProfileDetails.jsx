import React from 'react';
import MapComponent from './MapComponent';

const ProfileDetails = ({ profile }) => {
  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="profile-details">
      <h2>{profile.name}</h2>
      <div className="profile-info">
        <img 
          className="profile-image" 
          src={profile.photo.startsWith('http') 
            ? profile.photo 
            : `http://localhost:5000/uploads/${profile.photo}`
          } 
          alt={profile.name} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
          }}
        />
        <div className="profile-text">
          <div className="profile-detail-item">
            <span className="profile-detail-label">Description:</span>
            <p>{profile.description}</p>
          </div>
          <div className="profile-detail-item">
            <span className="profile-detail-label">Address:</span>
            <p>{profile.address}</p>
          </div>
          {profile.contactInfo && (
            <>
              {profile.contactInfo.email && (
                <div className="profile-detail-item">
                  <span className="profile-detail-label">Email:</span>
                  <p>{profile.contactInfo.email}</p>
                </div>
              )}
              {profile.contactInfo.phone && (
                <div className="profile-detail-item">
                  <span className="profile-detail-label">Phone:</span>
                  <p>{profile.contactInfo.phone}</p>
                </div>
              )}
            </>
          )}
          {profile.interests && profile.interests.length > 0 && (
            <div className="profile-detail-item">
              <span className="profile-detail-label">Interests:</span>
              <p>{profile.interests.join(', ')}</p>
            </div>
          )}
        </div>
      </div>

      <div className="map-container">
        <h3>Location</h3>
        <MapComponent 
          selectedProfile={profile}
          profiles={[profile]} 
        />
      </div>
    </div>
  );
};

export default ProfileDetails;