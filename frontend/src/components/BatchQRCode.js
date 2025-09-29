import React from 'react';
import QRCode from 'qrcode.react';

export default function BatchQRCode({ batchId }) {
  if (!batchId) return null;
  const url = window.location.origin + '/?batch=' + batchId;
  return (
    <div className="my-4 flex flex-col items-center">
      <QRCode value={batchId} size={128} bgColor="#fff" fgColor="#3B7A57" />
      <div className="mt-2 text-xs">Batch ID: {batchId}</div>
      <div className="mt-1 text-xs">Share or scan this QR code to trace this product.</div>
    </div>
  );
}
