"use client";

import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter(); // Initialize router
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stockQty: '',
    availability: true, // true means available, false means unavailable
  });
  const [errors, setErrors] = useState({}); // Track validation errors
  const [responseMessage, setResponseMessage] = useState(''); // State for response message

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      availability: value === 'available', // 'available' will be converted to true, 'unavailable' to false
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.price) formErrors.price = 'Price is required';
    if (!formData.stockQty) formErrors.stockQty = 'Stock quantity is required';
    if (formData.price <= 0) formErrors.price = 'Price must be a positive number';
    if (formData.stockQty <= 0) formErrors.stockQty = 'Stock quantity must be a positive number';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // Prevent form submission if validation fails
    }

    // Create the payload to send to the backend
    const requestData = {
      name: formData.name,
      price: parseFloat(formData.price),
      stockQty: parseInt(formData.stockQty, 10),
      availability: formData.availability,
    };

    try {
      // Sending data to the backend API
      const response = await fetch('http://localhost:3000/api/create-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setResponseMessage('Item added successfully'); // Set success message
        router.push('/vegetable-list?message=success'); // Redirect with success message
      } else {
        const errorData = await response.json();
        setResponseMessage(errorData.message || 'Something went wrong'); // Set failure message
      }
    } catch (error) {
      setResponseMessage(error.message); // Set failure message for network errors
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <Link href="/vegetable-list" className="absolute top-4 left-4 px-4 py-2 bg-slate-600 text-white rounded-md shadow-lg">
          <AiOutlineArrowLeft className="text-xl" />
        </Link>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Item Form
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter item name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stockQty"
              value={formData.stockQty}
              onChange={handleInputChange}
              placeholder="Enter stock quantity"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            {errors.stockQty && <p className="text-red-500 text-xs mt-1">{errors.stockQty}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <select
              name="availability"
              value={formData.availability ? 'available' : 'unavailable'}
              onChange={handleAvailabilityChange}
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
              Submit
            </button>
          </div>
        </form>

        {/* Display the response message */}
        {responseMessage && !responseMessage.includes('success') && (
          <div className={`mt-4 p-3 text-center bg-red-100 text-red-700 rounded-md`}>
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
