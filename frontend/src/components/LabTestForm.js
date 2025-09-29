import React, { useState } from 'react';

export default function LabTestForm({ crops, onSubmitted }) {
  const [cropId, setCropId] = useState(crops[0]?._id || '');
  const [result, setResult] = useState('');
  const [certified, setCertified] = useState(false);
  const [report, setReport] = useState(null);
  const [status, setStatus] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('');
    const formData = new FormData();
    formData.append('crop', cropId);
    formData.append('result', result);
    formData.append('certified', certified);
    if (report) formData.append('report', report);
    const token = localStorage.getItem('token');
    const res = await fetch('/api/supply/lab/test', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) setStatus(data.error || 'Failed');
    else {
      setStatus('Test result uploaded!');
      setResult('');
      setCertified(false);
      setReport(null);
      onSubmitted && onSubmitted();
    }
  }

  return (
    <form className="mb-4 flex flex-col gap-2" onSubmit={handleSubmit}>
      <select className="p-2 rounded text-black" value={cropId} onChange={e => setCropId(e.target.value)}>
        {crops.map(c => <option key={c._id} value={c._id}>Batch {c._id.slice(-6)}</option>)}
      </select>
      <input className="p-2 rounded text-black" value={result} onChange={e => setResult(e.target.value)} placeholder="Test Result (e.g. purity)" required />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={certified} onChange={e => setCertified(e.target.checked)} />
        Certified
      </label>
      <input type="file" accept="application/pdf,image/*" onChange={e => setReport(e.target.files[0])} />
      <button className="bg-ayurSaffron text-white rounded px-2 py-1" type="submit">Upload Test Result</button>
      {status && <div className="text-green-300">{status}</div>}
    </form>
  );
}
