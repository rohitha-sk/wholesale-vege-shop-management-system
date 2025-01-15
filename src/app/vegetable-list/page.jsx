'use client'

import Link from 'next/link';
import Card from '../components/Card';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useEffect, useState } from "react";

function page() {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/get-items");
        const data = await response.json();
        setStockData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-6 flex justify-center items-start">
      {/* Card with table inside, full width */}
      <Card className="w-full max-w-4xl mx-auto relative">
        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Vegetable Stock Inventory
        </h2>
        <br />

        {/* Button at top right */}
        <Link
          href="/"
          className="absolute top-4 left-4 px-4 py-2 bg-slate-600 text-white rounded-md shadow-lg"
        >
          Go back
        </Link>
        <Link
          href="/add-new-item"
          className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-lg"
        >
          Add New Item
        </Link>

        {/* Table */}
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left text-sm font-semibold text-gray-700">
                ID
              </th>
              <th className="px-4 py-2 border text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 border text-left text-sm font-semibold text-gray-700">
                Price [LKR]
              </th>
              <th className="px-4 py-2 border text-left text-sm font-semibold text-gray-700">
                Stock Qty [Kg]
              </th>
              <th className="px-4 py-2 border text-left text-sm font-semibold text-gray-700">
                Availability
              </th>
              <th className="px-4 py-2 border text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="px-4 py-2 border text-center">
                  Loading...
                </td>
              </tr>
            ) : stockData.length > 0 ? (
              stockData.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-sm">{item._id}</td>
                  <td className="px-4 py-2 border text-sm">{item.name}</td>
                  <td className="px-4 py-2 border text-sm">
                    {item.price.$numberDecimal}
                  </td>
                  <td className="px-4 py-2 border text-sm">{item.stockQty}</td>
                  <td
                    className={`px-4 py-2 border text-sm ${
                      item.availability ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.availability ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border text-sm">
                    <div className="flex space-x-2">
                      <Link
                        href={`/edit-item/${item._id}`}
                        className="inline-flex items-center px-3 py-2 bg-blue-500 text-white font-medium text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
                      >
                        <AiOutlineEdit className="mr-1" />
                      </Link>
                      <button
                        onClick={() => console.log("Delete item", item._id)}
                        className="inline-flex items-center px-3 py-2 bg-red-500 text-white font-medium text-sm rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition"
                      >
                        <AiOutlineDelete className="mr-1" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 border text-center">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default page;