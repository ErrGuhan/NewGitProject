import React, { useState } from 'react';

export default function ProcessorProcessForm({ crops, onSubmitted }) {
  const [cropId, setCropId] = useState(crops[0]?._id || '');
  const [step, setStep] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('');
    const formData = new FormData();
    formData.append('crop', cropId);
    formData.append('step', step);
    formData.append('notes', notes);
    if (image) formData.append('image', image);
    const token = localStorage.getItem('token');
    const res = await fetch('/api/supply/processor/process', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) setStatus(data.error || 'Failed');
    else {
      setStatus('Process step logged!');
      setStep('');
      setNotes('');
      setImage(null);
      onSubmitted && onSubmitted();
    }
  }

  return (
    <form className="mb-4 flex flex-col gap-2" onSubmit={handleSubmit}>
      <select className="p-2 rounded text-black" value={cropId} onChange={e => setCropId(e.target.value)}>
        {crops.map(c => <option key={c._id} value={c._id}>Batch {c._id.slice(-6)}</option>)}
      </select>
      <input className="p-2 rounded text-black" value={step} onChange={e => setStep(e.target.value)} placeholder="Process Step (e.g. drying)" required />
      <input className="p-2 rounded text-black" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes (optional)" />
      <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
      <button className="bg-ayurSaffron text-white rounded px-2 py-1" type="submit">Log Process Step</button>
      {status && <div className="text-green-300">{status}</div>}
    </form>
  );
}
