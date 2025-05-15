import { useState } from "react";
import { FaStar, FaUser, FaSearch, FaBars } from "react-icons/fa";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className='flex h-screen bg-gray-900 text-white'>
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 p-4 flex flex-col`}
      >
        <button
          className='mb-4 text-xl focus:outline-none'
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>
        <ul className='space-y-4 flex-1'>
          <li className='flex items-center gap-4 p-2 rounded hover:bg-gray-700 cursor-pointer'>
            <FaStar />
            {isSidebarOpen && <span>Dashboard</span>}
          </li>
          {/* Add more items as needed */}
        </ul>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Navbar */}
        <div className='flex justify-between items-center p-4 bg-gray-800'>
          <div className='flex items-center bg-gray-700 p-2 rounded w-1/3'>
            <FaSearch className='text-gray-400' />
            <input
              type='text'
              placeholder='Search...'
              className='bg-transparent border-none text-white focus:outline-none ml-2 w-full'
            />
          </div>
          <FaUser className='text-xl' />
        </div>

        {/* Content Grid */}
        <div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, index) => (
            <div key={index} className='bg-gray-800 p-4 rounded-lg text-center'>
              <div className='text-3xl mb-2'>
                <FaStar />
              </div>
              <p className='text-gray-400'>Some description</p>
              <button className='mt-4 bg-purple-600 py-1 px-4 rounded'>
                Action
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
