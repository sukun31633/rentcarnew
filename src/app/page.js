"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Calendar,
} from "@nextui-org/react";
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

export default function Home() {
  const [date, setDate] = useState(today(getLocalTimeZone()));
  const { locale } = useLocale();
  const isInvalid = isWeekend(date, locale);

  const [data, setData] = useState([
    { id: 1, problem: "ประเด็นที่ 1", updateDate: "2024-01-01" },
    { id: 2, problem: "ประเด็นที่ 2", updateDate: "2024-01-02" },
    { id: 3, problem: "ประเด็นที่ 3", updateDate: "2024-01-03" },
  ]);

  const handleInputChange = (id, field, value) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setData(newData);
  };

  // ฟังก์ชันเพิ่มแถวข้อมูลการประชุมใหม่
  const addNewMeeting = () => {
    const newMeeting = {
      id: data.length + 1,
      problem: "",
      updateDate: new Date().toISOString().split("T")[0], // ตั้งค่าวันที่เป็นวันนี้
    };
    setData([...data, newMeeting]);
  };

  const handleSaveData = async () => {
    try {
      const response = await fetch("/api/save-data", { // เปลี่ยนเป็น API route ของ Next.js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }), // ส่งข้อมูล JSON ไปยัง API
      });
  
      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <Navbar className="mt-8 w-full p-4 bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-xl shadow-xl">
        <NavbarBrand className="text-center mx-auto">
          <p className="font-bold text-lg">TesterWebsite</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4 justify-center mx-auto text-white">
          <NavbarItem>
            <Link href="/booking" className="text-center text-sm">Booking</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/rentcar" className="text-center text-sm">Rentcar</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/contactdeveloper" className="text-center text-sm">Contact Developer</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                color="secondary"
                size="s"
                src="/images/13d97d540be78ef119a9e357b76816a1.jpeg"
              />
            </DropdownTrigger>
            <DropdownMenu className="bg-gray-800 text-white shadow-lg">
              <DropdownItem key="profile" className="h-10 gap-2 text-sm">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" className="text-sm">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      <header className="w-full mt-8 flex justify-center items-center bg-purple-900 py-8 shadow-lg">
        <div className="w-full max-w-6xl overflow-hidden rounded-xl shadow-lg">
          <Image
            src="/images/header.png"
            alt="Header Image"
            width={1200}
            height={400}
            className="w-full h-auto rounded-xl object-cover"
            priority
          />
        </div>
      </header>

      <div className="flex justify-center items-center mt-16 gap-8">
  <div className="w-full max-w-lg p-8 border border-purple-500 rounded-lg shadow-lg bg-black bg-opacity-40 backdrop-blur-md">
    <h2 className="text-2xl font-semibold mb-6 text-center text-purple-200">เข้าสู่ระบบ</h2>
    <div className="flex flex-col gap-6">
      <Input size="lg" type="email" label="Email" placeholder="อีเมล" />
      <Input size="lg" type="password" label="Password" placeholder="รหัสผ่าน" />
    </div>
    <div className="w-full max-w-lg p-4 mt-6 bg-purple-100 text-purple-800 rounded-lg shadow-lg">
      <p className="text-center font-medium">
        คุณไม่มีบัญชี?{" "}
        <Link href="/register" className="text-purple-600 font-semibold">ลงทะเบียน</Link>
      </p>
    </div>
    <div className="flex justify-center mt-6">
      <button className="rounded-full bg-purple-500 text-white py-3 px-6">ยืนยัน</button>
    </div>
  </div>
</div>

<div className="flex justify-center items-center mt-16 gap-8">
  <Card className="w-full max-w-lg p-6 bg-purple-200 text-white rounded-xl shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-2xl flex flex-row items-center gap-4">
    <div className="relative p-1 bg-purple-300 rounded-lg shadow-xl transform transition-transform duration-500 hover:scale-105 flex-shrink-0">
      <Image
        src="/images/Screenshot 2024-10-03 142026.png"
        alt="My Image"
        width={200}
        height={120}
        className="rounded-lg shadow-lg transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
        priority
      />
    </div>
    <div className="flex flex-col justify-center items-start">
      <CardHeader className="flex flex-col justify-center items-start">
        <h4 className="font-bold text-xl text-white">เว็บไซต์จองที่พัก</h4>
      </CardHeader>

      <CardBody className="flex flex-col justify-center items-start mt-2">
        <p className="text-sm font-light text-white">
          เว็บไซต์อำนวยความสะดวกแก่ผู้ใช้งานที่ต้องการท่องเที่ยว
        </p>
      </CardBody>
      <div className="flex flex-col justify-center items-start mt-4">
        <h3 className="text-lg font-semibold text-white mb-2">สถานะเว็บไซต์</h3>
        <div className="bg-purple-500 text-white font-bold rounded-md px-8 py-4 text-lg inline-block text-center">
          Editing
        </div>
      </div>
      <CardFooter className="flex justify-start mt-4">
        <a
          href="https://staginghomebookingapp.appsmez-platform.com/shop/main/home/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="rounded-full bg-purple-500 text-white py-3 px-6 hover:bg-purple-600 transition-colors duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
            ไปเว็บไซต์จองที่พัก
          </button>
        </a>
      </CardFooter>
    </div>
  </Card>

  <Card className="w-full max-w-lg p-6 bg-purple-200 text-white rounded-xl shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-2xl flex flex-row items-center gap-4">
    <div className="relative p-1 bg-purple-300 rounded-lg shadow-xl transform transition-transform duration-500 hover:scale-105 flex-shrink-0">
      <Image
        src="/images/Screenshot 2024-10-03 142026.png"
        alt="My Image"
        width={200}
        height={120}
        className="rounded-lg shadow-lg transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
        priority
      />
    </div>
    <div className="flex flex-col justify-center items-start">
      <CardHeader className="flex flex-col justify-center items-start">
        <h4 className="font-bold text-xl text-white">เว็บไซต์เช่ารถ</h4>
      </CardHeader>
      <CardBody className="flex flex-col justify-center items-start mt-2">
        <p className="text-sm font-light text-white">
          เว็บไซต์อำนวยความสะดวกแก่ผู้ใช้งานที่ต้องการรถยนต์เพื่อเดินทาง หรือท่องเที่ยว
        </p>
      </CardBody>
      <div className="flex flex-col justify-center items-start mt-4">
        <h3 className="text-lg font-semibold text-white mb-2">สถานะเว็บไซต์</h3>
        <div className="bg-purple-500 text-white font-bold rounded-md px-8 py-4 text-lg inline-block text-center">
          Editing
        </div>
      </div>
      <CardFooter className="flex justify-start mt-4">
        <a
          href="https://staginghomebookingapp.appsmez-platform.com/shop/main/home/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="rounded-full bg-purple-500 text-white py-3 px-6 hover:bg-purple-600 transition-colors duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
            ไปเว็บไซต์เช่ารถ
          </button>
        </a>
      </CardFooter>
    </div>
  </Card>
</div>



    
<div className="flex justify-center py-12 px-4">
  <Card className="w-full max-w-5xl bg-purple-800 text-white rounded-xl shadow-xl p-6 transition-transform transform hover:scale-105 duration-300 hover:shadow-2xl flex flex-col md:flex-row gap-8 mt-8">
    <div className="w-full md:w-1/2">
      <CardHeader className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">นัดวันประชุมออนไลน์</h2>
      </CardHeader>
      <CardBody className="flex justify-center items-center flex-col">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-lg">
            <Calendar
              aria-label="เลือกวันสำหรับประชุม"
              errorMessage={isInvalid ? "**วันหยุดไม่สามารถนัดประชุมได้**" : undefined}
              isInvalid={isInvalid}
              value={date}
              onChange={setDate}
              className="w-full bg-white text-black rounded-md shadow-md p-3 text-center"
              dayClassName="flex justify-center items-center text-black"
              weekdayClassName="text-center font-bold text-black"
            />
          </div>
        </div>
      </CardBody>
    </div>


          <div className="w-full md:w-1/2">
            <CardHeader className="p-4 text-center">
              <h2 className="text-2xl font-bold">กรอกข้อมูลประชุม</h2>
            </CardHeader>
            <CardBody>
              <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">ปัญหาที่พบ</th>
            <th className="py-3 px-6 text-left">วันที่อัพเดท</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">
                <input
                  type="text"
                  value={item.problem}
                  onChange={(e) => handleInputChange(item.id, "problem", e.target.value)}
                  className="bg-gray-100 p-1 rounded-md w-full"
                />
              </td>
              <td className="py-3 px-6 text-left">
                <input
                  type="date"
                  value={item.updateDate}
                  onChange={(e) => handleInputChange(item.id, "updateDate", e.target.value)}
                  className="bg-gray-100 p-1 rounded-md w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={addNewMeeting} className="rounded-full bg-green-500 text-white py-2 px-4 hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-2xl">
          เพิ่มการประชุมใหม่
        </button>
        <button onClick={handleSaveData} className="rounded-full bg-purple-500 text-white py-2 px-4 hover:bg-purple-600 transition-colors duration-300 shadow-lg hover:shadow-2xl">
          บันทึกข้อมูล
        </button>
      </div>
    </div>
            </CardBody>
            <CardFooter className="flex justify-center mt-4">
            </CardFooter>
          </div>
        </Card>
      </div>

      <footer className="w-full flex justify-center items-center mt-16 gap-8 py-8 bg-black text-white-500 border-t border-purple-500">
        <p className="text-center">© 2024 TesterWebsite. All rights reserved.</p>
      </footer>
    </div>
  );
}
