import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import Link from 'next/link'

export default function BarcodeScannerPage() {
  const [scannedData, setScannedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [scanned, setScanned] = useState(false);
  const [student, setStudent] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleScan = async (result) => {
    const id = result[0]?.rawValue;
    if (!id) return;

    setScanned(true);
    setScannedData(id);

    try {
      const res = await fetch(`/api/check/${id}`);
      const data = await res.json();

      if (res.ok) {
        setStudent(data.student);
        setSuccessMessage("");
      } else {
        setStudent(null);
        setSuccessMessage("ไม่พบนักเรียนในระบบ");
      }
    } catch (err) {
      console.error(err);
      setStudent(null);
      setSuccessMessage("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }

    setTimeout(() => setScanned(false), 3000);
  };

  const handleApprove = async () => {
    if (!scannedData) return;

    const res = await fetch(`/api/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: scannedData }),
    });

    const data = await res.json();
    if (res.ok) {
      setSuccessMessage("✅ บันทึกการเข้างานแล้ว");
    } else {
      setSuccessMessage("❌ ไม่สามารถบันทึกข้อมูลได้");
    }

    setTimeout(() => {
      setScannedData(null);
      setStudent(null);
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-center space-y-4">
      <h1 className="text-2xl font-bold"><Link href="/">📷 ระบบเช็คชื่อเข้างาน</Link></h1>

      {errorMessage && <p className="text-red-600 font-semibold">{errorMessage}</p>}

      <div className="rounded-xl overflow-hidden border shadow-md max-w-md mx-auto">
        <Scanner
          onScan={handleScan}
          paused={scanned}
          sound={true}
          onError={(err) => {
            setErrorMessage("เกิดข้อผิดพลาดในการเข้ากล้อง");
            console.error(err);
          }}
        />
      </div>

      {scannedData && (
        <div className="bg-gray-100 p-4 rounded-lg shadow mt-4">
          <h2 className="font-semibold text-lg mb-2">📄 ข้อมูลที่แสกนได้</h2>
          <p><strong>รหัส:</strong> {scannedData}</p>
          {student && <p><strong>ชื่อ:</strong> {student.name}</p>}

          <button
            onClick={handleApprove}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            ✅ ยืนยันการเข้างาน
          </button>

          <p className="mt-2 text-green-600 font-medium">{successMessage}</p>
        </div>
      )}
    </div>
  );
}
