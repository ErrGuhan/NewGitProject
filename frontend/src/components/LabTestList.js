import React, { useEffect, useState } from 'react';

export default function LabTestList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch('/api/supply/lab/events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setEvents(data.events || []);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  if (loading) return <div>Loading lab events...</div>;
  if (!events.length) return <div>No lab results uploaded yet.</div>;

  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">Your Lab Test Results</h3>
      <ul className="space-y-2">
        {events.map(ev => (
          <li key={ev._id} className="bg-ayurGreen p-2 rounded">
            <div>Batch: {ev.crop}</div>
            <div>Result: {ev.result}</div>
            <div>Certified: {ev.certified ? 'Yes' : 'No'}</div>
            <div>Report: {ev.reportUrl || 'N/A'}</div>
            <div>Timestamp: {ev.timestamp ? ev.timestamp.slice(0, 19).replace('T', ' ') : 'N/A'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
