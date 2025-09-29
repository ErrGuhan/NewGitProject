import React, { useEffect, useState } from 'react';
import LabTestForm from '../components/LabTestForm';
import LabTestList from '../components/LabTestList';

export default function LabDashboard() {
  const [crops, setCrops] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchCrops() {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/supply/farmer/crops', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setCrops(data.crops || []);
    }
    fetchCrops();
  }, [refresh]);

  function handleSubmitted() {
    setRefresh(r => !r);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lab Technician Dashboard</h2>
      <p className="mb-4">Upload test results, certify batches.</p>
      <LabTestForm crops={crops} onSubmitted={handleSubmitted} />
      <LabTestList key={refresh} />
    </div>
  );
}
