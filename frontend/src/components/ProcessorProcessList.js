import React, { useEffect, useState } from 'react';

export default function ProcessorProcessList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch('/api/supply/processor/events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setEvents(data.events || []);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  if (loading) return <div>Loading process events...</div>;
  if (!events.length) return <div>No process steps logged yet.</div>;

  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">Your Process Steps</h3>
      <ul className="space-y-2">
        {events.map(ev => (
          <li key={ev._id} className="bg-ayurGreen p-2 rounded">
            <div>Batch: {ev.crop}</div>
            <div>Step: {ev.step}</div>
            <div>Notes: {ev.notes}</div>
            <div>Image: {ev.imageUrl || 'N/A'}</div>
            <div>Timestamp: {ev.timestamp ? ev.timestamp.slice(0, 19).replace('T', ' ') : 'N/A'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
