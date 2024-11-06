import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const Map = () => {
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [errorMessage, setErrorMessage] = useState('');

    // Set default marker icon fix for Leaflet
    const DefaultIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    // Get user's location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    setErrorMessage(error.message);
                },
                {
                    enableHighAccuracy: true, // Enable high accuracy
                    timeout: 10000, // Timeout after 10 seconds
                    maximumAge: 0 // No caching of location data
                }
            );
        } else {
            setErrorMessage('Geolocation is not supported by your browser.');
        }
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            {location.lat && location.lng ? (
                <div className="w-full h-full">
                    <MapContainer
                        center={[location.lat, location.lng]}
                        zoom={13}
                        className="h-full"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[location.lat, location.lng]}>
                            <Popup>
                                Your Location: <br /> Latitude: {location.lat}, Longitude: {location.lng}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            ) : (
                <div className="text-center">
                    {errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <p>Loading location...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Map;
