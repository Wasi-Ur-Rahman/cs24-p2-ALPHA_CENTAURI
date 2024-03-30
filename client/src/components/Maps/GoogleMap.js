import React, { useEffect, useRef } from 'react';

function GoogleMap({ coordinates }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      const google = window.google;

      // Center the map on the first coordinate
      const center = coordinates.length > 0 ? coordinates[0] : { latitude: 0, longitude: 0 };

      // Create a new map instance
      const map = new google.maps.Map(mapRef.current, {
        zoom: 10,
        center: { lat: center.latitude, lng: center.longitude }
      });

      // Add markers for each coordinate
      coordinates.forEach(coord => {
        new google.maps.Marker({
          position: { lat: coord.latitude, lng: coord.longitude },
          map: map
        });
      });
    };

    // Check if google.maps is available, if not, initializeMap on load
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC8c3r_BBzz2N9h11eUOihkh2AduJe_vIA&libraries=places`;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, [coordinates]);

  return <div style={{ width: '100%', height: '400px' }} ref={mapRef} />;
}

export default GoogleMap;
