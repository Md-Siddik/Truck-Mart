import React from 'react';
import { FaDollarSign } from 'react-icons/fa';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const FinancialReporting = ({ notificationCount }) => {
  const navigate = useNavigate();

  const handleFinancialReport = () => {
    navigate('/financialReport');
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
      title="Financial Reporting"
      description="Analyze expenses, revenue, and profits across trucks."
      icon={<FaDollarSign />}
      borderColor="border-teal-500"
      styleClasses="bg-teal-100 text-teal-900"
      buttonText="View Reports"
      onButtonClick={handleFinancialReport}
    />
    </div>
  );
};

export default FinancialReporting;