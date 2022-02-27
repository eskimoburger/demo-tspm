import React from "react";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import DescriptionIcon from "@material-ui/icons/Description";
const TestLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative min-h-screen md:flex">
      {/* mobile menu bar */}
      <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        {/* logo */}
        <a href="#" className="block p-4 text-white font-bold uppercase">
          Student Project Management System
        </a>
        {/* mobile menu button */}
        <button
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* sidebar */}
      <div className={`sidebar flex-0 border-r-2 border-gray-300 bg-gray-50 text-black w-72 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform  md:relative    md:translate-x-0 transition duration-200 ease-in-out
      ${open ? "-translate-x-full" : "" } `}
      >
          
        {/* logo */}
        <div className="text-black flex flex-col items-center space-x-2 px-4 space-y-4 bg-gray-300 p-4 rounded-lg ">
          <Image src="/logo.png" width={80} height={80} />
          {/* <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg> */}
          <span className="text-lg font-extrabold">
            Student Project Management System
          </span>
        </div>

        {/* nav */}
        <nav>
          <Link href="/students">
            <a className="flex items-center gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-800">
              <HomeIcon /> หน้าแรก
            </a>
          </Link>
          <Link href="/students/profile">
            <a className="flex items-center gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-800">
              <PersonIcon /> ข้อมูลผู้ใช้
            </a>
          </Link>
          <Link href="/students/search">
            <a className="flex items-center gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-800">
              <SearchIcon /> ค้นหาโครงงาน
            </a>
          </Link>
          <Link href="/students/document">
            <a className="flex items-center gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-gray-800">
              <DescriptionIcon /> ไฟล์เอกสาร
            </a>
          </Link>
        </nav>
      </div>
      {/* content */}
      <div className="flex-1 p-10  ">{children}</div>
    </div>
  );
};

export default TestLayout;
