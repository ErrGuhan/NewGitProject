import React from 'react';

const roles = [
  { key: 'farmer', label: 'Farmer' },
  { key: 'processor', label: 'Processor' },
  { key: 'lab', label: 'Lab Technician' },
  { key: 'consumer', label: 'Consumer' }
];

export default function DashboardSelector({ onSelect }) {
  return (
    <div className="flex flex-col gap-4">
      {roles.map(r => (
        <button
          key={r.key}
          className="bg-ayurGreen hover:bg-ayurSaffron text-white font-bold py-2 px-4 rounded"
          onClick={() => onSelect(r.key)}
        >
          {r.label} Dashboard
        </button>
      ))}
    </div>
  );
}
