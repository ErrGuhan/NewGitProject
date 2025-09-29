import React, { useState } from 'react';

export default function GeoImageUpload({ onUpload }) {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  function handleFile(e) {
    setImage(e.target.files[0]);
  }

  function getLocation() {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setError('Failed to get location')
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!image || !location) {
      setError('Image and location required');
      return;
    }
    setError('');
    onUpload({ image, location });
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFile} />
      <button type="button" className="bg-ayurGreen text-white rounded px-2 py-1" onClick={getLocation}>
        Get Geolocation
      </button>
      {location && <div>Lat: {location.lat}, Lng: {location.lng}</div>}
      {error && <div className="text-red-300">{error}</div>}
      <button type="submit" className="bg-ayurSaffron text-white rounded px-2 py-1">Upload</button>
    </form>
  );
}
