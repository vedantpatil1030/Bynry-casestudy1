import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { useProfiles } from '../context/ProfileContext';
import { deleteProfile } from '../services/api';

const AdminDashboard = () => {
  const { profiles, loading, error, loadProfiles } = useProfiles();
  const [isCreating, setIsCreating] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setIsCreating(false);
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        setActionLoading(true);
        setActionError(null);
        await deleteProfile(id);
        await loadProfiles();
      } catch (err) {
        setActionError(`Failed to delete profile: ${err.message}`);
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleFormSuccess = () => {
    setIsCreating(false);
    setEditingProfile(null);
  };

  

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-title">
          <h1>Admin Dashboard</h1>
          <p className="admin-subtitle">Manage and organize profile data</p>
        </div>
        <div className="admin-actions">
          {isCreating || editingProfile ? (
            <button
              className="btn btn-warning"
              onClick={() => {
                setIsCreating(false);
                setEditingProfile(null);
              }}
            >
              Cancel
            </button>
          ) : (
            <button
              className="btn btn-success create-btn"
              onClick={() => setIsCreating(true)}
            >
              <span>+</span> Add New Profile
            </button>
          )}
          <Link to="/" className="btn btn-secondary">
            View Public Page
          </Link>
        </div>
      </div>

      {actionError && (
        <div className="error-message admin-error">
          <span>⚠️</span> {actionError}
        </div>
      )}

      {(isCreating || editingProfile) && (
        <div className="profile-form-container">
          <h2>{editingProfile ? `Edit Profile: ${editingProfile.name}` : 'Create New Profile'}</h2>
          <ProfileForm 
            profileToEdit={editingProfile} 
            onSuccess={handleFormSuccess} 
          />
        </div>
      )}

      <div className="profiles-section">
        <h2>Manage Profiles</h2>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : profiles.length === 0 ? (
          <div className="no-profiles">
            <p>No profiles found. Create a new profile to get started.</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Profile Image</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile._id}>
                    <td className="profile-image-cell">
                      <img
                        src={profile.photo.startsWith('http') 
                          ? profile.photo 
                          : `http://localhost:5000/uploads/${profile.photo}`}
                        alt={profile.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/50';
                        }}
                      />
                    </td>
                    <td>{profile.name}</td>
                    <td>{profile.address}</td>
                    <td>{profile.contactInfo.email}</td>
                    <td className="action-buttons">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(profile)}
                        disabled={actionLoading}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(profile._id, profile.name)}
                        disabled={actionLoading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;