"use client"; 

import Link from 'next/link';
import Card from '../components/Card';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';


function page() {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the success message from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');

    // Display success message if available
    if (message) {
      const messageMap = {
        success: 'Item added successfully!',
        updated: 'Item updated successfully!',
        deleted: 'Item deleted successfully!',
      };
  
      Swal.fire({
        title: 'Success!',
        text: messageMap[message] || 'Operation completed successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // Remove the message parameter from the URL after showing the alert
        urlParams.delete('message');
        const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
      });
    }
  }, []);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/get-items");
        const data = await response.json();

        // Ensure price is properly formatted
        const formattedData = data.map(item => ({
          ...item,
          price: item.price?.$numberDecimal ? parseFloat(item.price.$numberDecimal) : parseFloat(item.price)
        }));

        setStockData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (itemId) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/api/delete-item/${itemId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          Swal.fire('Deleted!', 'The item has been deleted.', 'success');
          // Refresh the table data
          setStockData(stockData.filter(item => item.itemId !== itemId));
        } else {
          const data = await response.json();
          Swal.fire('Error!', data.error || 'Failed to delete item.', 'error');
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire('Error!', 'An unexpected error occurred.', 'error');
      }
    }
  };


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

        <br />
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
                <tr key={item.itemId} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-sm">{item.itemId}</td>
                  <td className="px-4 py-2 border text-sm">{item.name}</td>
                  <td className="px-4 py-2 border text-sm">
                    {isNaN(item.price) ? 'Invalid Price' : item.price.toFixed(2)} {/* Handle invalid price */}
                  </td>
                  <td className="px-4 py-2 border text-sm">{item.stockQty}</td>
                  <td
                    className={`px-4 py-2 border text-sm ${item.availability ? "text-green-500" : "text-red-500"}`}
                  >
                    {item.availability ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border text-sm">
                    <div className="flex space-x-2">
                      <Link
                        href={`/edit-vege-form/${item.itemId}`}
                        className="inline-flex items-center px-3 py-2 bg-blue-500 text-white font-medium text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
                      >
                        <AiOutlineEdit className="mr-1" />
                      </Link>
                      <button
                       onClick={() => handleDelete(item.itemId)}
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
