import React from 'react';
import { FaTruck, FaDollarSign, FaCalendarAlt, FaExclamationTriangle, FaMapMarkerAlt, FaPizzaSlice, FaHamburger, FaHotdog, FaAppleAlt, FaCoffee } from 'react-icons/fa'; // Add more food icons as needed
import { Link } from 'react-router-dom';

const foodIcons = {
    Tacos: FaPizzaSlice,
    Burgers: FaHamburger,
    Fries: FaAppleAlt, // Assuming icon for fries
    'Hot Dogs': FaHotdog,
    Nachos: FaPizzaSlice, // Can be changed to a more relevant icon
    Drinks: FaCoffee, // Example drink icon
};

const salesData = [
    {
        id: 1,
        truck: 'Truck A',
        location: 'Downtown',
        totalSales: 150,
        revenue: '$3,000',
        date: '2024-09-23',
        itemsSold: [
            { item: 'Tacos', quantity: 50, price: 2.5, stock: 10 }, // In stock
            { item: 'Burgers', quantity: 30, price: 5.0, stock: 2 }, // Going out of stock
            { item: 'Fries', quantity: 70, price: 1.5, stock: 0 }, // Out of stock
        ],
    },
    {
        id: 2,
        truck: 'Truck B',
        location: 'Mall',
        totalSales: 120,
        revenue: '$2,500',
        date: '2024-09-23',
        itemsSold: [
            { item: 'Hot Dogs', quantity: 60, price: 3.0, stock: 5 }, // Low stock
            { item: 'Nachos', quantity: 40, price: 4.0, stock: 8 }, // In stock
            { item: 'Drinks', quantity: 20, price: 1.0, stock: 15 }, // In stock
        ],
    },
    // Add more sales data here
];

const SaleTracking = () => {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Sales Tracking</h1>
                <button className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition">
                    Export Report
                </button>
            </div>

            {/* Filter by Date */}
            <div className="mb-8 flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-gray-600">
                    <FaCalendarAlt />
                    <span>Filter by Date:</span>
                </label>
                <input
                    type="date"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-gray-400"
                />
            </div>

            {/* Sales List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {salesData.map((sale) => (
                    <div key={sale.id} className="bg-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105 duration-300">
                        {/* Truck and Location */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">{sale.truck}</h3>
                            <p className="text-gray-500">{sale.location}</p>
                        </div>

                        {/* Date */}
                        <p className="text-gray-600 flex items-center mb-2">
                            <FaCalendarAlt className="mr-2" /> {new Date(sale.date).toLocaleDateString()}
                        </p>

                        {/* Sales Details */}
                        <div className="border-t border-gray-200 pt-4">
                            <p className="text-gray-600 flex items-center mb-2">
                                <FaTruck className="mr-2" /> Total Sales: <span className="font-bold">{sale.totalSales}</span>
                            </p>
                            <p className="text-gray-600 flex items-center">
                                <FaDollarSign className="mr-2" /> Revenue: <span className="font-bold">{sale.revenue}</span>
                            </p>
                        </div>

                        {/* Items Sold */}
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-gray-700 mb-2">Items Sold:</h4>
                            <ul className="text-gray-600 space-y-1">
                                {sale.itemsSold.map((item, index) => {
                                    const FoodIcon = foodIcons[item.item] || FaPizzaSlice; // Default to pizza icon if not found
                                    return (
                                        <li key={index} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 transition duration-300">
                                            <span className={`flex items-center ${item.stock === 0 ? 'text-red-500 font-bold' : item.stock <= 5 ? 'text-orange-500' : ''}`}>
                                                <FoodIcon className="mr-2" /> {/* Render food icon */}
                                                {item.item} {item.stock === 0 && <FaExclamationTriangle className="inline text-red-500 text-sm ml-1" title="Out of stock" />}
                                            </span>
                                            <span className="flex-shrink-0">
                                                x{item.quantity} - ${item.price.toFixed(2)} each | <span className="font-semibold">Stock: {item.stock}</span>
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Check Location Button */}
                        <div className="mt-4 flex justify-end">
                            <Link to="/truckDetails">
                                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-700 transition">
                                    <FaMapMarkerAlt className="mr-2" /> Check Location
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SaleTracking;