import { useState, useEffect } from 'react';
import { FaTruck, FaClock } from 'react-icons/fa'; // Truck and clock icons
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'; // Fullscreen CSS
import 'leaflet-fullscreen'; // Import fullscreen plugin
import { Link } from 'react-router-dom';
import Map from './Map';

const TruckDetails = () => {
  const [truckData, setTruckData] = useState(null);
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [cityName, setCityName] = useState(''); // State for city name

  // Fetch truck data
  useEffect(() => {
    fetch('/public/Data.json')
      .then(response => response.json())
      .then(data => setTruckData(data[0])) // Load the first truck for demonstration
      .catch(err => console.error("Error loading JSON data: ", err));
  }, []);

  // Get user's current location and update truck data with real location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // Update truckData with real location, keeping other data intact
          setTruckData((prevData) => ({
            ...prevData,
            latitude: latitude,   // Set real latitude
            longitude: longitude, // Set real longitude
          }));

          // Fetch the city name using reverse geocoding
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(response => response.json())
            .then(data => {
              setCityName(data.address.city || data.address.town || data.address.village || "Unknown");
              // Update truckData with the fetched city name
              setTruckData(prevData => ({
                ...prevData,
                city: data.address.city || data.address.town || data.address.village || "Unknown",
              }));
            })
            .catch(error => {
              console.error("Error fetching city name: ", error);
            });
        },
        (error) => {
          console.error("Error getting user location: ", error);
        }
      );
    }
  }, []);

  if (!truckData) {
    return <p>Loading truck data...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Truck #{truckData.truckId} Location
          </h1>
          <Link to="/home">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition">
              Home
            </button>
          </Link>
        </div>

        <Map />

        {/* Truck Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center text-gray-700 mb-3">
              <FaTruck className="text-xl mr-2 text-blue-600" />
              <h3 className="text-lg font-semibold">Truck Information</h3>
            </div>
            <p className="text-gray-600"><strong>ID:</strong> {truckData.truckId}</p>
            <p className="text-gray-600"><strong>City:</strong> {truckData.city}</p>
            <p className="text-gray-600"><strong>Status:</strong> {truckData.status}</p>
            {/* Display real location */}
            <p className="text-gray-600"><strong>Latitude:</strong> {truckData.latitude}</p>
            <p className="text-gray-600"><strong>Longitude:</strong> {truckData.longitude}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center text-gray-700 mb-3">
              <FaClock className="text-xl mr-2 text-blue-600" />
              <h3 className="text-lg font-semibold">Last Updated</h3>
            </div>
            <p className="text-gray-600">{truckData.lastUpdated}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component to add fullscreen control
const AddFullscreenControl = () => {
  const map = useMap();

  useEffect(() => {
    L.control.fullscreen({
      position: 'topright', // Fullscreen button position
      title: 'Show Fullscreen',
      titleCancel: 'Exit Fullscreen',
    }).addTo(map);
  }, [map]);

  return null;
};

export default TruckDetails;