import React, { useState } from 'react';
import { FaMapMarkerAlt, FaBullseye } from 'react-icons/fa';

const NotificationPage = () => {
  const [option, setOption] = useState('');
  const [shiftStatus, setShiftStatus] = useState('');
  const [maintenanceDescription, setMaintenanceDescription] = useState('');
  const [maintenanceType, setMaintenanceType] = useState('');
  const [maintenanceQuantity, setMaintenanceQuantity] = useState('');
  const [maintenanceCost, setMaintenanceCost] = useState('');
  const [nextDayActivity] = useState({ target: '100 Sales', location: 'Downtown Plaza' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (option === 'shift') {
      console.log('Shift Notification:', shiftStatus);
    } else if (option === 'maintenance') {
      console.log('Maintenance Notification:', { maintenanceDescription, maintenanceType, maintenanceQuantity, maintenanceCost });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6">
      <div className="w-full max-w-6xl">
        {/* Page Header */}
        <h2 className="text-4xl font-extrabold text-gray-800 mt-12 mb-8">Employee Notifications</h2>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Shift In/Out Card */}
          <div
            onClick={() => setOption('shift')}
            className={`p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
              option === 'shift' ? 'border-t-4 border-blue-500' : 'border border-gray-200'
            }`}
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Shift In/Out</h3>
            <p className="text-gray-500">Submit your shift details.</p>
          </div>

          {/* Maintenance Description Card */}
          <div
            onClick={() => setOption('maintenance')}
            className={`p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
              option === 'maintenance' ? 'border-t-4 border-green-500' : 'border border-gray-200'
            }`}
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Maintenance Description</h3>
            <p className="text-gray-500">Log any maintenance issues.</p>
          </div>

          {/* Next Day Activity Card */}
          <div
            onClick={() => setOption('next-day')}
            className={`p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
              option === 'next-day' ? 'border-t-4 border-yellow-500' : 'border border-gray-200'
            }`}
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Next Day Activity</h3>
            <p className="text-gray-500">View tomorrow's location and targets.</p>
          </div>
        </div>

        {/* Conditional Forms Based on Selection */}
        <div className="w-full max-w-lg mt-8 bg-white rounded-xl shadow-lg p-8 mx-auto">
          {option === 'shift' && (
            <form onSubmit={handleSubmit}>
              <label className="block text-gray-700 font-medium mb-3">Shift Status</label>
              <div className="flex justify-between mb-6">
                <button
                  type="button"
                  onClick={() => setShiftStatus('shift-in')}
                  className={`p-4 rounded-lg w-full mr-2 transition-colors duration-300 ${
                    shiftStatus === 'shift-in' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  Shift In
                </button>
                <button
                  type="button"
                  onClick={() => setShiftStatus('shift-out')}
                  className={`p-4 rounded-lg w-full ml-2 transition-colors duration-300 ${
                    shiftStatus === 'shift-out' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  Shift Out
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300"
              >
                Send Shift Notification
              </button>
            </form>
          )}

          {option === 'maintenance' && (
            <form onSubmit={handleSubmit}>
              <label className="block text-gray-700 font-medium mb-3">Maintenance Description</label>
              <textarea
                value={maintenanceDescription}
                onChange={(e) => setMaintenanceDescription(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-gray-700"
                placeholder="Describe the issue"
                rows="3"
                required
              />

              <label className="block text-gray-700 font-medium mb-3">Maintenance Type</label>
              <input
                type="text"
                value={maintenanceType}
                onChange={(e) => setMaintenanceType(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-gray-700"
                placeholder="Type of maintenance"
                required
              />

              <label className="block text-gray-700 font-medium mb-3">Maintenance Quantity / Range</label>
              <input
                type="number"
                value={maintenanceQuantity}
                onChange={(e) => setMaintenanceQuantity(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-gray-700"
                placeholder="Enter quantity or range"
                required
              />

              <label className="block text-gray-700 font-medium mb-3">Maintenance Cost</label>
              <input
                type="number"
                value={maintenanceCost}
                onChange={(e) => setMaintenanceCost(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg mb-6 text-gray-700"
                placeholder="Enter cost"
                required
              />

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition duration-300"
              >
                Send Maintenance Notification
              </button>
            </form>
          )}

          {option === 'next-day' && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Next Day Activity</h3>
              <div className="flex items-center bg-yellow-100 p-4 rounded-lg mb-6 shadow-sm">
                <FaBullseye className="text-yellow-500 text-2xl mr-4" />
                <div>
                  <p className="font-medium text-gray-700">Target</p>
                  <p className="text-lg text-gray-900">{nextDayActivity.target}</p>
                </div>
              </div>
              <div className="flex items-center bg-yellow-100 p-4 rounded-lg shadow-sm">
                <FaMapMarkerAlt className="text-yellow-500 text-2xl mr-4" />
                <div>
                  <p className="font-medium text-gray-700">Location</p>
                  <p className="text-lg text-gray-900">{nextDayActivity.location}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;