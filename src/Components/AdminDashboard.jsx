import React from 'react';
import { FaTachometerAlt } from 'react-icons/fa';
import Card from './Card';

const AdminDashboard = ({ notificationCount }) => {
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
      title="Admin Dashboard"
      description="Overview of all operational metrics."
      icon={<FaTachometerAlt />}
      borderColor="border-pink-500"
      styleClasses="bg-pink-100 text-pink-900"
      buttonText="View Dashboard"
    />
    </div>
  );
};

export default AdminDashboard;
