import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createCustomIcon = (imageUrl, name) => {
  return L.divIcon({
    html: `
      <div class="custom-marker">
        <img src="${imageUrl}" alt="${name}" 
          onerror="this.onerror=null; this.src='https://via.placeholder.com/40'"/>
        <div class="marker-tooltip">${name}</div>
      </div>
    `,
    className: 'custom-marker-container',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

const MapComponent = ({ profiles, selectedProfile }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  useEffect(() => {
    
    if (!mapInstanceRef.current && mapContainerRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current).setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
      markersLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersLayerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    
    markersLayerRef.current.clearLayers();

    const profilesToShow = selectedProfile ? [selectedProfile] : (profiles || []);
    const bounds = L.latLngBounds();
    let hasValidMarkers = false;

    profilesToShow.forEach(profile => {
      if (!profile?.location?.lat || !profile?.location?.lng) return;

      const { lat, lng } = profile.location;
      const imageUrl = profile.photo?.startsWith('http')
        ? profile.photo
        : `http://localhost:5000/uploads/${profile.photo}`;

      const marker = L.marker([lat, lng], {
        icon: createCustomIcon(imageUrl, profile.name)
      }).bindPopup(`
        <div class="custom-popup">
          <h3>${profile.name}</h3>
          <p>${profile.address}</p>
          ${profile.contactInfo?.email ? `<p>📧 ${profile.contactInfo.email}</p>` : ''}
          ${profile.description ? `<p>${profile.description.substring(0, 100)}...</p>` : ''}
        </div>
      `);

      marker.addTo(markersLayerRef.current);
      bounds.extend([lat, lng]);
      hasValidMarkers = true;
    });

    
    if (hasValidMarkers) {
      requestAnimationFrame(() => {
        mapInstanceRef.current.invalidateSize();
        mapInstanceRef.current.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 13
        });
      });
    }
  }, [profiles, selectedProfile]);

  return (
    <div 
      ref={mapContainerRef} 
      style={{ 
        height: '600px', 
        width: '100%',
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#f8f9fa'
      }} 
    />
  );
};

export default MapComponent;