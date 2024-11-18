// app/api/save-data/route.js
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// สร้างการเชื่อมต่อฐานข้อมูลด้วย Pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "meeting",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function POST(request) {
  try {
    const { data } = await request.json();

    // ล้างข้อมูลเก่าทั้งหมด (ถ้าต้องการแทนที่ข้อมูลเดิม)
    await pool.query("TRUNCATE TABLE meetings");

    // บันทึกข้อมูลใหม่ลงในตาราง meetings
    for (const meeting of data) {
      await pool.query("INSERT INTO meetings (problem, updateDate) VALUES (?, ?)", [
        meeting.problem,
        meeting.updateDate,
      ]);
    }

    return NextResponse.json({ message: "Data saved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ message: "Failed to save data" }, { status: 500 });
  }
}
