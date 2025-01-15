"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineArrowLeft } from "react-icons/ai"; // Importing an icon for the back button


function page() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your form submission logic
    router.push('/vegetable-list'); // Navigate to /vegetable-list
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
      <Link href="/vegetable-list" className="absolute top-4 left-4 px-4 py-2 bg-slate-600 text-white rounded-md shadow-lg">
      <AiOutlineArrowLeft className="text-xl" />
        </Link>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Edit item Data
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter item name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              placeholder="Enter stock quantity"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-medium text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
