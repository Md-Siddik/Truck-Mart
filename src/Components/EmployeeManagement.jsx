import React from 'react';
import { FaUsers } from 'react-icons/fa';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const EmployeeManagement = ({ notificationCount }) => {
  const navigate = useNavigate();
  const handleEmployees = () => {
    navigate('/employees'); // Updated to navigate
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
        title="Employee Management"
        description="Manage employee attendance and shifts."
        icon={<FaUsers />}
        borderColor="border-green-500"
        styleClasses="bg-green-100 text-green-900"
        buttonText="Manage Employees"
        onButtonClick={handleEmployees}
      />
    </div>

  );
};

export default EmployeeManagement;
