import React, { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  // สร้างฟังก์ชันจัดการการกดปุ่ม Login
  const handleLogin = (e) => {
    e.preventDefault();

    // ตรวจสอบข้อมูลการ Login (ตัวอย่างพื้นฐาน)
    if (username === "admin" && password === "password") {
      // หากข้อมูลถูกต้อง เปลี่ยนเส้นทางไปยังหน้า dashboard
      router.push("/dashboard");
    } else {
      // หากข้อมูลไม่ถูกต้อง แสดงข้อผิดพลาด
      setError("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};