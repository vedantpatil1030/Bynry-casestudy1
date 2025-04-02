import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProfileDetails from '../components/ProfileDetails';
import LoadingSpinner from '../components/LoadingSpinner';
import { useProfiles } from '../context/ProfileContext';

const ProfileDetailPage = () => {
  const { id } = useParams();
  const { selectedProfile, loadProfileById, loading, error } = useProfiles();

  useEffect(() => {
    // Load profile data
    loadProfileById(id);
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!selectedProfile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="profile-detail-page">
      <Link to="/" className="btn btn-primary">
        &larr; Back to Profiles
      </Link>
      <ProfileDetails profile={selectedProfile} />
    </div>
  );
};

export default ProfileDetailPage;