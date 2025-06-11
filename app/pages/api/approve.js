import { db } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { student_id } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM mukata WHERE student_id = ?", [student_id]);

    if (rows.length > 0) {
      // ถ้ามีอยู่แล้ว แค่ update
      await db.query("UPDATE mukata SET is_come = 1 WHERE student_id = ?", [student_id]);
    } else {
      // ถ้ายังไม่มีให้ insert ใหม่
      await db.query("INSERT INTO mukata (student_id, is_come) VALUES (?, 1)", [student_id]);
    }

    return res.status(200).json({ message: "บันทึกเรียบร้อยแล้ว" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
}
