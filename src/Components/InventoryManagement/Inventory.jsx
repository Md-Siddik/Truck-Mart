import React, { useState } from 'react';
import { FaSearch, FaPizzaSlice, FaHamburger, FaHotdog, FaIceCream, FaAppleAlt, FaDrumstickBite, FaExclamationTriangle, FaBeer, FaMugHot } from 'react-icons/fa';

const inventoryData = [
  { id: 1, name: 'Tacos', stock: 10, icon: FaDrumstickBite },
  { id: 2, name: 'Burgers', stock: 2, icon: FaHamburger },
  { id: 3, name: 'Fries', stock: 0, icon: FaAppleAlt },
  { id: 4, name: 'Hot Dogs', stock: 5, icon: FaHotdog },
  { id: 5, name: 'Nachos', stock: 8, icon: FaDrumstickBite },
  { id: 6, name: 'Drinks', stock: 15, icon: FaBeer },
  { id: 7, name: 'Pizza', stock: 4, icon: FaPizzaSlice },
  { id: 8, name: 'Salads', stock: 1, icon: FaAppleAlt },
  { id: 9, name: 'Ice Cream', stock: 0, icon: FaIceCream },
  { id: 10, name: 'Soda', stock: 20, icon: FaMugHot },
];

const InventoryManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // State for active tab

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredInventory = inventoryData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter items based on the selected tab
  const getItemsByTab = () => {
    if (activeTab === 'lowStock') {
      return filteredInventory.filter(item => item.stock > 0 && item.stock <= 5);
    }
    if (activeTab === 'outOfStock') {
      return filteredInventory.filter(item => item.stock === 0);
    }
    return filteredInventory; // all items
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Inventory Management</h1>
        <div className="relative w-64">
          <input
            type="text"
            className="p-3 pl-10 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-gray-400"
            placeholder="Search for food items..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`mr-4 py-2 px-4 rounded-lg ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('lowStock')}
          className={`mr-4 py-2 px-4 rounded-lg ${activeTab === 'lowStock' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Low Stock
        </button>
        <button
          onClick={() => setActiveTab('outOfStock')}
          className={`py-2 px-4 rounded-lg ${activeTab === 'outOfStock' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Out of Stock
        </button>
      </div>

      {/* Inventory List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {getItemsByTab().map((item) => (
          <div
            key={item.id}
            className={`p-6 bg-white rounded-xl shadow-lg border-4 ${
              item.stock === 0 ? 'border-red-500' : item.stock <= 5 ? 'border-orange-500' : 'border-green-500'
            } transition-transform transform hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <item.icon className="mr-2 text-orange-500" /> {item.name}
              </h3>
              <span
                className={`text-lg font-semibold ${
                  item.stock === 0 ? 'text-red-500' : item.stock <= 5 ? 'text-orange-500' : 'text-green-500'
                }`}
              >
                {item.stock === 0 ? 'Out of stock' : `${item.stock} in stock`}
              </span>
            </div>
            {item.stock === 0 && (
              <p className="text-red-500 flex items-center mt-2">
                <FaExclamationTriangle className="mr-2" /> This item is currently out of stock!
              </p>
            )}
            {item.stock <= 5 && item.stock > 0 && (
              <p className="text-orange-500 flex items-center mt-2">
                <FaExclamationTriangle className="mr-2" /> Low stock: Only {item.stock} left!
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryManagement;