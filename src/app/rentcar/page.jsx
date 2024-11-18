"use client";
import React, { useState } from "react"; // นำเข้า useState อย่างถูกต้อง
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import Image from 'next/image';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import '../style/rentcar.css';

export default function Booking() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const images = [
    "/images/รถ1.jpeg",
    "/images/รถ2.png",
    "/images/รถ3.jpeg",
  ];

  // ข้อมูลตัวอย่างที่จะแสดงในตาราง
  const [data, setData] = useState([
    { id: 1, problem: "ปัญหาที่ 1", solution: "วิธีแก้ไข 1", updateDate: "2024-01-01" },
    { id: 2, problem: "ปัญหาที่ 2", solution: "วิธีแก้ไข 2", updateDate: "2024-01-02" },
    { id: 3, problem: "ปัญหาที่ 3", solution: "วิธีแก้ไข 3", updateDate: "2024-01-03" },
  ]);

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของข้อมูลในตาราง
  const handleInputChange = (id, field, value) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setData(newData); // อัปเดตข้อมูลใหม่หลังการแก้ไข
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-4">
      {/* Navbar Section */}
      <Navbar className="mt-8 w-full p-4 bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-xl shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-2xl mb-12">
        <NavbarBrand className="text-center mx-auto">
          <p className="font-bold text-inherit text-center text-lg">Booking Website</p>
        </NavbarBrand>

        {/* Navbar Links */}
        <NavbarContent className="hidden sm:flex gap-4 justify-center mx-auto text-white">
          <NavbarItem>
            <Link href="/" className="text-center hover:text-gray-300 transition-colors text-sm">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/booking" className="text-center hover:text-gray-300 transition-colors text-sm">
              Booking
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/rentcar" className="text-center hover:text-gray-300 transition-colors text-sm">
              Rent Car
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

      {/* Image Slider Section */}
      <div className="w-full max-w-4xl mx-auto mb-12">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index} className="relative h-64">
              <Image
                src={src}
                alt={`Slide Image ${index + 1}`}
                width={800} // กำหนดความกว้าง
                height={500} // กำหนดความสูง
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Content Section */}
      <div className="flex justify-center items-center mb-12">
        <Card className="w-full max-w-lg p-6 bg-purple-200 text-black rounded-xl shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-2xl flex flex-col items-center">
          <CardHeader className="flex flex-col justify-center items-center">
            <h4 className="font-bold text-2xl text-black">เว็บไซต์เช่ารถ</h4>
          </CardHeader>

          <CardBody className="flex flex-col justify-center items-center mt-4">
            <p className="text-lg font-light text-black text-center">
              ตรวจสอบสถานะ บันทึกการทำงานต่างๆในเว็บไซต์ที่นี่
            </p>
          </CardBody>

          <CardFooter className="flex justify-center mt-6">
          </CardFooter>
        </Card>
      </div>

      {/* Table Section */}
<div className="flex justify-center items-center mb-12">
  <Card className="w-full max-w-5xl bg-purple-800 text-white rounded-xl shadow-xl p-6 transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-2xl">
    <CardHeader>
      <h2 className="text-2xl font-bold text-center text-white">ตารางข้อมูล</h2>
    </CardHeader>

    <CardBody>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">ปัญหาที่พบ</th>
              <th className="py-3 px-6 text-left">วิธีแก้ไข</th>
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
                    onChange={(e) => handleInputChange(item.id, 'problem', e.target.value)}
                    className="bg-gray-100 p-1 rounded-md w-full"
                  />
                </td>
                <td className="py-3 px-6 text-left">
                  <input
                    type="text"
                    value={item.solution}
                    onChange={(e) => handleInputChange(item.id, 'solution', e.target.value)}
                    className="bg-gray-100 p-1 rounded-md w-full"
                  />
                </td>
                <td className="py-3 px-6 text-left">
                  <input
                    type="date" // ใช้ type="date" เพื่อเปิดปฏิทิน
                    value={item.updateDate}
                    onChange={(e) => handleInputChange(item.id, 'updateDate', e.target.value)}
                    className="bg-gray-100 p-1 rounded-md w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardBody>


          <CardFooter className="flex justify-center mt-6">
            <button className="rounded-full bg-purple-500 text-white py-2 px-4 hover:bg-purple-600 transition-colors duration-300 shadow-lg hover:shadow-2xl">
              บันทึกข้อมูล
            </button>
          </CardFooter>
        </Card>
      </div>

      <footer className="w-full flex justify-center items-center mt-16 gap-8 py-8 bg-black text-white-500 border-t border-purple-500">
        <p className="text-center">© 2024 TesterWebsite. All rights reserved.</p>
      </footer>
    </div>
  );
}
