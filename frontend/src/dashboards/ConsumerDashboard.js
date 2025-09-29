import React, { useState } from 'react';
import ConsumerTraceForm from '../components/ConsumerTraceForm';
import ConsumerTraceResult from '../components/ConsumerTraceResult';

export default function ConsumerDashboard() {
  const [trace, setTrace] = useState(null);

  async function handleTrace(batchId) {
    setTrace(null);
    const res = await fetch(`/api/supply/consumer/trace/${batchId}`);
    const data = await res.json();
    setTrace(data);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Consumer Dashboard</h2>
      <p className="mb-4">Scan QR, view the full supply chain journey, verify trust.</p>
      <ConsumerTraceForm onTrace={handleTrace} />
      <ConsumerTraceResult trace={trace} />
    </div>
  );
}
