// pages/api/attendees.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  try {
    const [rows] = await connection.execute(`
      SELECT s.student_id, s.name
      FROM student s
      JOIN mukata m ON s.student_id = m.student_id
      WHERE m.is_come = 1
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ message: "Database error" });
  } finally {
    await connection.end();
  }
}
