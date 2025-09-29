import React, { useState } from 'react';
import GeoImageUpload from './GeoImageUpload';

export default function FarmerCropForm({ onSubmitted }) {
  const [harvestDate, setHarvestDate] = useState('');
  const [harvestMethod, setHarvestMethod] = useState('');
  const [status, setStatus] = useState('');

  async function handleUpload({ image, location }) {
    setStatus('Uploading...');
    const formData = new FormData();
    formData.append('image', image);
    formData.append('lat', location.lat);
    formData.append('lng', location.lng);
    formData.append('harvestDate', harvestDate);
    formData.append('harvestMethod', harvestMethod);
    const token = localStorage.getItem('token');
    const res = await fetch('/api/supply/farmer/crop', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus(data.error || 'Failed');
    } else {
      setStatus('Crop registered!');
      setHarvestDate('');
      setHarvestMethod('');
      onSubmitted && onSubmitted();
    }
  }

  return (
    <div className="mb-4">
      <h3 className="font-bold mb-2">Register Crop with Geotagged Image</h3>
      <input
        className="p-2 rounded text-black mb-2 w-full"
        type="date"
        value={harvestDate}
        onChange={e => setHarvestDate(e.target.value)}
        placeholder="Harvest Date"
        required
      />
      <input
        className="p-2 rounded text-black mb-2 w-full"
        value={harvestMethod}
        onChange={e => setHarvestMethod(e.target.value)}
        placeholder="Harvest Method"
        required
      />
      <GeoImageUpload onUpload={handleUpload} />
      {status && <div className="mt-2 text-green-300">{status}</div>}
    </div>
  );
}
