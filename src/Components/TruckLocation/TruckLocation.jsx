import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTruck } from 'react-icons/fa';
import Card from '../Card';

const TruckLocation = ({ notificationCount }) => {
  const navigate = useNavigate();

  const handleViewLocations = () => {
    navigate('/truckList');
  };

  return (
    <div className="relative">
      {/* Notification Badge */}
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
          {notificationCount}
        </span>
      )}
      
      <Card
        title="Truck Location"
        description="Track real-time locations of your food trucks."
        icon={<FaTruck />}
        borderColor="border-indigo-500"
        styleClasses="bg-blue-100 text-indigo-900"
        buttonText="View Locations"
        onButtonClick={handleViewLocations}
      />
    </div>
  );
};

export default TruckLocation;