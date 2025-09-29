import React, { useEffect, useState } from 'react';

export default function FarmerCropList() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCrops() {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch('/api/supply/farmer/crops', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setCrops(data.crops || []);
      setLoading(false);
    }
    fetchCrops();
  }, []);

  if (loading) return <div>Loading crops...</div>;
  if (!crops.length) return <div>No crops submitted yet.</div>;

  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">Your Submitted Crops</h3>
      <ul className="space-y-2">
        {crops.map(crop => (
          <li key={crop._id} className="bg-ayurGreen p-2 rounded">
            <div>Harvest Date: {crop.harvestDate ? crop.harvestDate.slice(0,10) : 'N/A'}</div>
            <div>Method: {crop.harvestMethod}</div>
            <div>Location: {crop.location?.lat}, {crop.location?.lng}</div>
            <div>Image: {crop.imageUrl || 'N/A'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
