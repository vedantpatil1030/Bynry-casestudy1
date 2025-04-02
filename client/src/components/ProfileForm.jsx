import React, { useState, useEffect } from 'react';
import { createProfile, updateProfile, geocodeAddress, uploadProfilePhoto } from '../services/api';
import { useProfiles } from '../context/ProfileContext';

const ProfileForm = ({ profileToEdit, onSuccess }) => {
  const { loadProfiles } = useProfiles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    contactInfo: {
      email: '',
      phone: ''
    },
    interests: ''
  });
  
  
  useEffect(() => {
    if (profileToEdit) {
      setFormData({
        name: profileToEdit.name || '',
        description: profileToEdit.description || '',
        address: profileToEdit.address || '',
        contactInfo: {
          email: profileToEdit.contactInfo?.email || '',
          phone: profileToEdit.contactInfo?.phone || ''
        },
        interests: profileToEdit.interests ? profileToEdit.interests.join(', ') : ''
      });
      
      
      if (profileToEdit.photo && !profileToEdit.photo.includes('default')) {
        setPhotoPreview(`http://localhost:5000/uploads/${profileToEdit.photo}`);
      }
    }
  }, [profileToEdit]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      
      const interestsArray = formData.interests
        ? formData.interests.split(',').map(interest => interest.trim())
        : [];
      
      
      const location = await geocodeAddress(formData.address);
      
      const profileData = {
        ...formData,
        interests: interestsArray,
        location
      };
      
      let savedProfile;
      
      if (profileToEdit) {
        
        savedProfile = await updateProfile(profileToEdit._id, profileData);
      } else {
        
        savedProfile = await createProfile(profileData);
      }
      
      
      if (photoFile) {
        await uploadProfilePhoto(savedProfile._id, photoFile);
      }
      
      
      await loadProfiles();
      
      if (onSuccess) {
        onSuccess(savedProfile);
      }
      
      
      if (!profileToEdit) {
        setFormData({
          name: '',
          description: '',
          address: '',
          contactInfo: {
            email: '',
            phone: ''
          },
          interests: ''
        });
        setPhotoFile(null);
        setPhotoPreview('');
      }
    } catch (err) {
      setError(err.message || 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="name" className="form-label">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description" className="form-label">Description *</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          required
        ></textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="address" className="form-label">Address *</label>
        <input
          type="text"
          id="address"
          name="address"
          className="form-control"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="Enter a full address for accurate map location"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="contactInfo.email" className="form-label">Email</label>
        <input
          type="email"
          id="contactInfo.email"
          name="contactInfo.email"
          className="form-control"
          value={formData.contactInfo.email}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="contactInfo.phone" className="form-label">Phone</label>
        <input
          type="tel"
          id="contactInfo.phone"
          name="contactInfo.phone"
          className="form-control"
          value={formData.contactInfo.phone}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="interests" className="form-label">Interests</label>
        <input
          type="text"
          id="interests"
          name="interests"
          className="form-control"
          value={formData.interests}
          onChange={handleChange}
          placeholder="Comma-separated list of interests"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="photo" className="form-label">Profile Photo</label>
        <input
          type="file"
          id="photo"
          name="photo"
          className="form-control"
          onChange={handlePhotoChange}
          accept="image/*"
        />
        {photoPreview && (
          <div className="photo-preview">
            <img 
              src={photoPreview} 
              alt="Preview" 
              style={{ maxWidth: '200px', marginTop: '10px' }} 
            />
          </div>
        )}
      </div>
      
      <button 
        type="submit" 
        className="btn btn-primary" 
        disabled={loading}
      >
        {loading ? 'Saving...' : profileToEdit ? 'Update Profile' : 'Create Profile'}
      </button>
    </form>
  );
};

export default ProfileForm;