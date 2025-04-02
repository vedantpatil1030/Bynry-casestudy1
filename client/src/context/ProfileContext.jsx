import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getProfiles, getProfileById } from '../services/api';

const ProfileContext = createContext();

export const useProfiles = () => useContext(ProfileContext);

const continentBounds = {
  asia: { 
    minLat: -10, maxLat: 82, 
    minLng: 26, maxLng: 180 
  },
  europe: { 
    minLat: 36, maxLat: 71, 
    minLng: -31, maxLng: 40 
  },
  'north-america': { 
    minLat: 15, maxLat: 84, 
    minLng: -169, maxLng: -52 
  },
  'south-america': { 
    minLat: -56, maxLat: 12, 
    minLng: -81, maxLng: -34 
  },
  africa: { 
    minLat: -35, maxLat: 37, 
    minLng: -17, maxLng: 51 
  },
  australia: { 
    minLat: -47, maxLat: -10, 
    minLng: 113, maxLng: 179 
  },
  antarctica: { 
    minLat: -90, maxLat: -60, 
    minLng: -180, maxLng: 180 
  }
};

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getProfilesInContinent = (profiles, continent) => {
    const bounds = continentBounds[continent];
    if (!bounds) return profiles;

    return profiles.filter(profile => {
      const { lat, lng } = profile.location;
      return lat >= bounds.minLat && 
             lat <= bounds.maxLat && 
             lng >= bounds.minLng && 
             lng <= bounds.maxLng;
    });
  };

  const loadProfiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProfiles();
      
      let filteredData = [...data];

      // Filter by continent if selected
      if (searchQuery && ['asia', 'europe', 'north-america', 'south-america', 'africa', 'australia', 'antarctica'].includes(searchQuery)) {
        filteredData = getProfilesInContinent(data, searchQuery);
      }
      
      setProfiles(filteredData);
    } catch (err) {
      setError('Failed to load profiles. Please try again later.');
      console.error(err);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  
  

  const loadProfileById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProfileById(id);
      setSelectedProfile(data);
      return data;
    } catch (err) {
      setError('Failed to load profile. Please try again later.');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update useEffect to include loadProfiles in dependencies
  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]); // Add loadProfiles as a dependency

  // Clear selected profile when unmounting
  useEffect(() => {
    return () => {
      setSelectedProfile(null);
    };
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        selectedProfile,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        loadProfiles,
        loadProfileById,
        setSelectedProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;