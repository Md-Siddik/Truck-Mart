import React from 'react';
import { FaGasPump } from 'react-icons/fa';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const MaintenanceFuelTracking = ({ notificationCount }) => {
  const navigate = useNavigate();
  const handleMaintenanceFuel = () => {
    navigate("/maintenanceFuel")
  }
  return (
    <div className="relative">
      {/* Notification Badge */}
      {
        notificationCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
            {notificationCount}
          </span>
        )
      }
      <Card
        title="Maintenance & Fuel Tracking"
        description="Monitor truck maintenance and fuel usage."
        icon={<FaGasPump />}
        borderColor="border-orange-500"
        styleClasses="bg-orange-100 text-orange-900"
        buttonText="Track Maintenance"
        onButtonClick={handleMaintenanceFuel}
      />
    </div>
  );
};

export default MaintenanceFuelTracking;
