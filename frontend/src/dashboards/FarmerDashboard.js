import React, { useState } from 'react';
import FarmerCropForm from '../components/FarmerCropForm';
import FarmerCropList from '../components/FarmerCropList';

export default function FarmerDashboard() {
  const [refresh, setRefresh] = useState(false);

  function handleSubmitted() {
    setRefresh(r => !r);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Farmer Dashboard</h2>
      <p className="mb-4">Register crops, upload geotagged images, log harvests.</p>
      <FarmerCropForm onSubmitted={handleSubmitted} />
      {/* Key prop forces re-mount to refresh list */}
      <FarmerCropList key={refresh} />
    </div>
  );
}
