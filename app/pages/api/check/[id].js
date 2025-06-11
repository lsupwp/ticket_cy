import { db } from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const [rows] = await db.query("SELECT * FROM student WHERE student_id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "ไม่พบข้อมูล" });

    return res.status(200).json({ student: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
