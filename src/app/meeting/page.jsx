"use client";
import React from "react";
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
  Calendar,
} from "@nextui-org/react"; // นำเข้าไลบรารี NextUI อย่างถูกต้อง
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import '../styles/booking.css'

export default function Home() {
  let [date, setDate] = React.useState(today(getLocalTimeZone()));
  let { locale } = useLocale();
  let isInvalid = isWeekend(date, locale);


  const handleBooking = async () => {
    try {
      // แปลงวันที่เป็นสตริงเพื่อส่งไปยัง API
      const bookingDate = date.toString(); // คุณอาจแปลงเป็นรูปแบบอื่น เช่น yyyy-MM-dd

      // ส่งข้อมูลไปยัง API เพื่อบันทึกข้อมูลการจอง
      const response = await fetch('/api/book-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: bookingDate }),
      });

      // ตรวจสอบว่า response.ok เป็น true หรือไม่
      if (response.ok) {
        alert('จองวันที่สำเร็จ!');
      } else {
        alert('เกิดข้อผิดพลาดในการจองวันที่');
      }
    } catch (error) {
      console.error('Error booking date:', error);
      alert('เกิดข้อผิดพลาดในการจองวันที่');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      {/* Navbar */}
      <Navbar className="mt-8 w-full p-4 bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-xl shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-2xl">
        <NavbarBrand className="text-center mx-auto">
          <p className="font-bold text-inherit text-center text-lg">TesterWebsite</p>
        </NavbarBrand>

        {/* Navbar Links */}
        <NavbarContent className="hidden sm:flex gap-4 justify-center mx-auto text-white">
          <NavbarItem>
            <Link href="/meeting" className="text-center hover:text-gray-300 transition-colors text-sm">
              Meeting
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/booking" className="text-center hover:text-gray-300 transition-colors text-sm">
              Booking
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/rentcar" className="text-center hover:text-gray-300 transition-colors text-sm">
              Rentcar
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/contactdeveloper" className="text-center hover:text-gray-300 transition-colors text-sm">
              Contact Developer
            </Link>
          </NavbarItem>
        </NavbarContent>

        {/* Avatar Dropdown */}
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="s"
                src="/images/13d97d540be78ef119a9e357b76816a1.jpeg"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" className="bg-gray-800 text-white shadow-lg">
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

      {/* Header */}
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

      {/* Calendar Section */}
      <div className="flex justify-center mt-12 px-4">
        <Card className="group relative overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl w-full max-w-xl">
          <CardHeader className="p-6 text-center">
            <h2 className="text-4xl font-bold mb-4 text-black">นัดวันประชุมออนไลน์</h2>
          </CardHeader>
          <CardBody className="p-6 flex justify-center items-center flex-col">
            {/* ปฏิทินสำหรับนัดวันประชุม */}
            <div className="w-full flex justify-center">
              <div className="w-full max-w-md">
                <Calendar
                  aria-label="เลือกวันสำหรับประชุม"
                  value={date}
                  onChange={setDate}
                  className="w-full bg-purple-200 text-black rounded-md shadow-md p-3 text-center"
                />
                {isInvalid && (
                  <p className="text-red-600 mt-2 text-center">กรุณาเลือกวันอื่น</p>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    
      {/* Footer */}
      <footer className="w-full flex justify-center items-center mt-16 gap-8 py-8 bg-black text-white-500 border-t border-purple-500">
        <p className="text-center">© 2024 TesterWebsite. All rights reserved.</p>
      </footer>
    </div>
  );
}
