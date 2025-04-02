const API_URL = 'http://localhost:5000/api';

// Helper function to handle fetch responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Get all profiles with optional search query
export const getProfiles = async (searchQuery = '') => {
  try {
    const url = searchQuery 
      ? `${API_URL}/profiles?search=${encodeURIComponent(searchQuery)}` 
      : `${API_URL}/profiles`;
    
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};

// Get a single profile by ID
export const getProfileById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/profiles/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// Create a new profile
export const createProfile = async (profileData) => {
  try {
    const response = await fetch(`${API_URL}/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
};

// Update an existing profile
export const updateProfile = async (id, profileData) => {
  try {
    const response = await fetch(`${API_URL}/profiles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Delete a profile
export const deleteProfile = async (id) => {
  try {
    const response = await fetch(`${API_URL}/profiles/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};

// Upload profile photo
export const uploadProfilePhoto = async (id, photoFile) => {
  try {
    const formData = new FormData();
    formData.append('photo', photoFile);
    
    const response = await fetch(`${API_URL}/profiles/${id}/photo`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};

// Geocode an address to get coordinates
export const geocodeAddress = async (address) => {
  try {
    // Using OpenStreetMap Nominatim API for geocoding
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
    throw new Error('Could not geocode address');
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
};