import React from 'react';
import BatchQRCode from './BatchQRCode';

export default function ConsumerTraceResult({ trace }) {
  if (!trace) return null;
  if (trace.error) return <div className="text-red-300">{trace.error}</div>;

  return (
    <div className="bg-ayurGreen p-4 rounded mt-4">
      <h3 className="font-bold mb-2">Traceability Record</h3>
      <BatchQRCode batchId={trace.crop?._id} />
      <div><b>Farmer:</b> {trace.farmer?.username || 'N/A'}</div>
      <div><b>Harvest Date:</b> {trace.crop?.harvestDate?.slice(0,10) || 'N/A'}</div>
      <div><b>Location:</b> {trace.crop?.location?.lat}, {trace.crop?.location?.lng}</div>
      {trace.crop?.location?.lat && trace.crop?.location?.lng && (
        <iframe
          title="Crop Location"
          width="100%"
          height="200"
          className="my-2 rounded"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${trace.crop.location.lat},${trace.crop.location.lng}&z=15&output=embed`}
        />
      )}
      <div><b>Process Steps:</b></div>
      <ul className="ml-4 list-disc">
        {trace.processes?.map((p, i) => (
          <li key={i}>
            {p.step} ({p.timestamp?.slice(0,19).replace('T',' ')})
            {p.imageUrl && (
              <div>
                <img
                  src={`https://ipfs.io/ipfs/${p.imageUrl}`}
                  alt="Process Step"
                  className="my-1 rounded max-h-32"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      <div><b>Lab Results:</b></div>
      <ul className="ml-4 list-disc">
        {trace.labs?.map((l, i) => (
          <li key={i}>
            {l.result} {l.certified ? '(Certified)' : ''} ({l.timestamp?.slice(0,19).replace('T',' ')})
            {l.reportUrl && (
              <div>
                {l.reportUrl.endsWith('.pdf') ? (
                  <a href={`https://ipfs.io/ipfs/${l.reportUrl}`} target="_blank" rel="noopener noreferrer" className="underline text-blue-200">View PDF Report</a>
                ) : (
                  <img
                    src={`https://ipfs.io/ipfs/${l.reportUrl}`}
                    alt="Lab Report"
                    className="my-1 rounded max-h-32"
                  />
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div><b>Trust Score:</b> {trace.trustScore ?? 'N/A'}</div>
    </div>
  );
}
