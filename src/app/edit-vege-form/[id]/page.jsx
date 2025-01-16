"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineArrowLeft } from "react-icons/ai";
import React, { useState, useEffect } from 'react';

function Page({ params }) {
  const [itemData, setItemData] = useState({
    name: '',
    price: '',
    stockQty: '',
    availability: 'available',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = React.use(params);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/get-item/${id}`);
        const data = await response.json();

        if (data && data._id) {
          // Ensure price is a number
          const price = data.price?.$numberDecimal ? parseFloat(data.price.$numberDecimal) : data.price;

          setItemData({
            name: data.name,
            price: price || '', // Set price to empty string if undefined or NaN
            stockQty: data.stockQty,
            availability: data.availability ? 'available' : 'unavailable',
          });
        }
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };

    fetchItemData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/api/update-item/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: itemData.name,
          price: parseFloat(itemData.price).toFixed(2),
          stockQty: parseInt(itemData.stockQty),
          availability: itemData.availability === 'available',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item.');
      }

      // Use router.push to redirect without refreshing
      router.push('/vegetable-list?message=updated');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Link href="/vegetable-list" className="absolute top-4 left-4 px-4 py-2 bg-slate-600 text-white rounded-md shadow-lg">
        <AiOutlineArrowLeft className="text-xl" />
      </Link>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Update Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={itemData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={itemData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stockQty"
              value={itemData.stockQty}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <select
              name="availability"
              value={itemData.availability}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 bg-blue-500 text-white font-medium text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
