import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import LoadingSpinner from '../components/LoadingSpinner';
import { useProfiles } from '../context/ProfileContext';

const HomePage = () => {
  const { profiles, selectedProfile, setSearchQuery, loading } = useProfiles();
  const [filterCriteria, setFilterCriteria] = useState({
    location: '',
    interests: '',
    sortBy: 'name'
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria(prev => ({ ...prev, [name]: value }));
    
    if (name === 'location') {
      setSearchQuery(value);
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Discover Amazing Profiles</h1>
        <p>Connect with people and explore their locations on the map</p>
      </div>

      <div className="search-filter-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search profiles..."
            className="search-input"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <select 
            className="filter-select"
            name="location"
            value={filterCriteria.location}
            onChange={handleFilterChange}
          >
            <option value="">All Locations</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="north-america">North America</option>
            <option value="south-america">South America</option>
            <option value="africa">Africa</option>
            <option value="australia">Australia</option>
            <option value="antarctica">Antarctica</option>
          </select>

          <select 
            className="filter-select"
            name="interests"
            value={filterCriteria.interests}
            onChange={handleFilterChange}
          >
            <option value="">Filter by Interest</option>
            <option value="technology">Technology</option>
            <option value="art">Art</option>
            <option value="sports">Sports</option>
            <option value="music">Music</option>
          </select>

          <select 
            className="filter-select"
            name="sortBy"
            value={filterCriteria.sortBy}
            onChange={handleFilterChange}
          >
            <option value="name">Sort by Name</option>
            <option value="recent">Most Recent</option>
            <option value="location">Location</option>
          </select>
        </div>
      </div>

      <div className="content-section">
        <div className="map-section">
          {loading ? (
            <LoadingSpinner />
          ) : profiles.length > 0 ? (
            <>
              <h2>{selectedProfile ? 'Selected Profile Location' : 'All Profile Locations'}</h2>
              <MapComponent 
                profiles={selectedProfile ? [selectedProfile] : profiles} 
              />
            </>
          ) : (
            <div className="no-results">No profiles found for the selected criteria</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;