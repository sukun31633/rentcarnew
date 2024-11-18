import {
    Input,
    Button, // ใช้ Button ของ NextUI
  } from "@nextui-org/react"; // นำเข้าไลบรารี NextUI อย่างถูกต้อง
  import React from 'react';
  import '../styles/booking.css'
  
  export default function RentCar() {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-purple-900 to-black">
        <div className="w-full max-w-md p-8 border border-purple-600 rounded-lg shadow-lg bg-black text-white">
          <h2 className="text-3xl font-bold text-center mb-6">ลงทะเบียน</h2>
          <div className="flex flex-col gap-6">
            {/* ช่องกรอกข้อมูล */}
            <div className="w-full">
              <Input
                size="lg"
                type="text"
                label="Name"
                placeholder="ชื่อ-นามสกุล"
                labelClassName="text-white"
                className="text-black"
              />
            </div>
            <div className="w-full">
              <Input
                size="lg"
                type="email"
                label="Email"
                placeholder="อีเมล"
                labelClassName="text-white"
                className="text-black"
              />
            </div>
            <div className="w-full">
              <Input
                size="lg"
                type="text"
                label="Tel"
                placeholder="เบอร์โทร"
                labelClassName="text-white"
                className="text-black"
              />
            </div>
            <div className="w-full">
              <Input
                size="lg"
                type="password"
                label="Password"
                placeholder="รหัสผ่าน"
                labelClassName="text-white" 
                className="text-black"
              />
            </div>
  
            {/* ปุ่มยืนยัน */}
            <div className="flex justify-center mt-6">
              <Button auto className="bg-purple-500 hover:bg-purple-600 text-white rounded-full py-3 px-6">
                ยืนยัน
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  