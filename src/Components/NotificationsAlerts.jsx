import React from 'react';
import { FaBell } from 'react-icons/fa';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const NotificationsAlerts = ({ notificationCount }) => {
  const navigate = useNavigate();
  const handleNotifications = () => {
    navigate("/notifications")
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
        title="Notifications & Alerts"
        description="Get alerts on critical truck issues and stock levels."
        icon={<FaBell />}
        borderColor="border-red-500"
        styleClasses="bg-red-100 text-red-900"
        buttonText="View Alerts"
        onButtonClick={handleNotifications}
      />
    </div>
  );
};

export default NotificationsAlerts;