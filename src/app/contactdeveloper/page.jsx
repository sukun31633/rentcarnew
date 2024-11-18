"use client";
import React, { useState } from "react";
import Link from "next/link";
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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Card,
  CardBody,
} from "@nextui-org/react"; // Correctly importing NextUI library
import { useAsyncList } from "@react-stately/data";
import '../style/contentdeveloper.css'

// Static rows for the local table
const rows = [
  { key: "1", name: "สมชาย", role: "CEO", status: "Active" },
  { key: "2", name: "สมหญิง", role: "Developer Lead", status: "Active" },
  { key: "3", name: "สมพร", role: "Senior Developer", status: "Active" },
  { key: "4", name: "สมศักดิ์", role: "HR", status: "Active" },
];

const columns = [
  { key: "name", label: "NAME" },
  { key: "role", label: "ROLE" },
  { key: "status", label: "STATUS" },
];

export default function RentCar() {
  const [isLoading, setIsLoading] = useState(true);

  // Fetching external data with useAsyncList
  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch("https://swapi.py4e.com/api/people/?search", {
        signal,
      });
      let json = await res.json();
      setIsLoading(false);

      return { items: json.results };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
          if (sortDescriptor.direction === "descending") cmp *= -1;
          return cmp;
        }),
      };
    },
  });

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
            <Link href="/booking" className="text-center hover:text-gray-300 transition-colors text-sm">
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
                src="/images/13d97d540be78ef119a9e357b76816a1.jpeg" // Image path
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

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-purple-900 to-black text-white">
      <Card className="w-full max-w-4xl p-8 bg-black bg-opacity-50 shadow-lg">
        <CardBody>
          <Table aria-label="Example table with static data">
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
      {/* Dynamic Table with Sorting and Loading */}
      <Table
        aria-label="Example table with client side sorting"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn key="name" allowsSorting>
            ปัญหาที่พบ
          </TableColumn>
          <TableColumn key="height" allowsSorting>
            สถานะการแก้ไข
          </TableColumn>
          <TableColumn key="mass" allowsSorting>
            ถูกแก้ไขโดย
          </TableColumn>
        </TableHeader>
        <TableBody items={list.items} isLoading={isLoading} loadingContent={<Spinner label="Loading..." />}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Footer */}
      <footer className="w-full flex justify-center items-center mt-16 gap-8 py-8 bg-black text-white border-t border-purple-500">
        <p className="text-center">© 2024 TesterWebsite. All rights reserved.</p>
      </footer>
    </div>
  );
}
