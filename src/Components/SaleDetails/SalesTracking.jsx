import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import Card from '../Card';
import { useNavigate } from 'react-router-dom';

const SalesTracking = ({ notificationCount }) => {
  const navigate = useNavigate();
  const handleSalesTracking = () => {
    navigate('/saleTrackingDetails'); // Updated to navigate
  };
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
        title="Sales Tracking"
        description="Analyze sales data by products and trucks."
        icon={<FaChartLine />}
        borderColor="border-purple-500"
        styleClasses="bg-purple-100 text-purple-900"
        buttonText="View Sales"
        onButtonClick={handleSalesTracking}
      />
    </div>
  );
};

export default SalesTracking;
