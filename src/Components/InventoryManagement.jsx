import React from 'react';
import { FaWarehouse } from 'react-icons/fa';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const InventoryManagement = ({ notificationCount }) => {
  const navigate = useNavigate();
  const handleInbentory = () => {
    navigate("/inventory")
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
        title="Inventory Management"
        description="Monitor stock levels and receive alerts."
        icon={<FaWarehouse />}
        borderColor="border-yellow-500"
        styleClasses="bg-yellow-100 text-yellow-900"
        buttonText="Manage Inventory"
        onButtonClick={handleInbentory}
      />
    </div>
  );
};

export default InventoryManagement;
