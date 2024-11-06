import { useEffect, useState } from 'react';
import { FaTruck, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TruckList = () => {
    const [truckList, setTruckList] = useState(null);

    useEffect(() => {
        fetch('/public/Data.json')
            .then(response => response.json())
            .then(data => setTruckList(data)) // Load the truck list
            .catch(err => console.error("Error loading JSON data: ", err));
    }, []);

    if (!truckList) {
        return <p className="text-center text-gray-500 mt-10">Loading truck data...</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-8">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6">All Trucks</h1>

                {/* Truck List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {truckList.map((truck) => (
                        <div key={truck.truckId} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                            {/* Truck Image */}
                            {truck.image && (
                                <img
                                    src={truck.image}
                                    alt={`Truck ${truck.truckId}`}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                            )}

                            {/* Truck Info */}
                            <div className="flex items-center text-gray-700 mb-3">
                                <FaTruck className="text-xl mr-2 text-indigo-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Truck #{truck.truckId}</h3>
                            </div>
                            <p className="text-gray-600">
                                <strong>City:</strong> {truck.city}
                            </p>
                            <p className="text-gray-600">
                                <strong>Status:</strong> {truck.status}
                            </p>
                            <p className="text-gray-600">
                                <strong>Last Updated:</strong> {truck.lastUpdated}
                            </p>

                            {/* View Location Button */}
                            <Link to="/truckDetails">
                                <button className="mt-4 w-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg py-2 flex justify-center items-center">
                                    <FaMapMarkerAlt className="inline-block mr-2" /> View Location
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TruckList;