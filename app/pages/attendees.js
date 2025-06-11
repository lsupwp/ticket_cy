// pages/attendees.js
import { useEffect, useState } from "react";
import Link from 'next/link'

export default function AttendeesPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/attendees")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">กำลังโหลด...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4"><Link href="/">รายชื่อผู้ที่เข้างาน</Link></h1>
      <p className="mb-4">จำนวนคนที่มาแล้ว: <span className="font-semibold">{data.length}</span></p>
      <ul className="list-disc pl-6 space-y-2">
        {data.map((item, index) => (
          <li key={index} className="text-lg">{item.name} ({item.student_id})</li>
        ))}
      </ul>
    </div>
  );
}
