import React from 'react';
import ProfileCard from './ProfileCard';
import LoadingSpinner from './LoadingSpinner';
import { useProfiles } from '../context/ProfileContext';

const ProfileList = () => {
  const { profiles, loading, error } = useProfiles();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (profiles.length === 0) {
    return <div className="no-profiles">No profiles found. Try a different search.</div>;
  }

  return (
    <div className="profiles-container">
      {profiles.map((profile) => (
        <ProfileCard key={profile._id} profile={profile} />
      ))}
    </div>
  );
};

export default ProfileList;