"use client";
// import React { useState } from "react";
import { useState } from "react";
import QrScanner from "../components/ScanQRCard";

export default function ScanPage() {
  const [lastResult, setLastResult] = useState(null);
  const [status, setStatus] = useState(null);

  const handleScan = async (data) => {
    setLastResult(data);
    setStatus("Sending to backend...");

  };

  return (
    <main style={{ padding: 20 }}>
      <h1>QR → IoT</h1>
      <p>Silakan arahkan kamera ke QR code.</p>
      <QrScanner onScan={handleScan} />
      <div style={{ marginTop: 16 }}>
        <strong>Last scanned:</strong> <span>{lastResult ?? "-"}</span>
      </div>
      <div style={{ marginTop: 8 }}>
        <strong>Status:</strong> <span>{status ?? "-"}</span>
      </div>
    </main>
  );
}
