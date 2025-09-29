import React, { useState } from 'react';

export default function ConsumerTraceForm({ onTrace }) {
  const [batchId, setBatchId] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!batchId) {
      setError('Batch ID required');
      return;
    }
    onTrace(batchId);
  }

  return (
    <form className="mb-4 flex flex-col gap-2" onSubmit={handleSubmit}>
      <input className="p-2 rounded text-black" value={batchId} onChange={e => setBatchId(e.target.value)} placeholder="Enter or scan Batch ID" required />
      {error && <div className="text-red-300">{error}</div>}
      <button className="bg-ayurSaffron text-white rounded px-2 py-1" type="submit">Trace Product</button>
    </form>
  );
}
