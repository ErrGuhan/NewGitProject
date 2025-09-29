import React, { useEffect, useState } from 'react';
import ProcessorProcessForm from '../components/ProcessorProcessForm';
import ProcessorProcessList from '../components/ProcessorProcessList';

export default function ProcessorDashboard() {
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
      <h2 className="text-2xl font-bold mb-4">Processor Dashboard</h2>
      <p className="mb-4">Log each process step, receive raw material.</p>
      <ProcessorProcessForm crops={crops} onSubmitted={handleSubmitted} />
      <ProcessorProcessList key={refresh} />
    </div>
  );
}
