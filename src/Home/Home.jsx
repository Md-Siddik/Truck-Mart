import { useState } from 'react';
import { GiFoodTruck } from "react-icons/gi";
import '../index.css';
import EmployeeManagement from '../Components/EmployeeManagement';
import SalesTracking from '../Components/SaleDetails/SalesTracking';
import InventoryManagement from '../Components/InventoryManagement';
import FinancialReporting from '../Components/FinancialReporting';
import MaintenanceFuelTracking from '../Components/MaintenanceFuelTracking';
import NotificationsAlerts from '../Components/NotificationsAlerts';
import AdminDashboard from '../Components/AdminDashboard';
import TruckLocation from '../Components/TruckLocation/TruckLocation';

const Home = () => {
  // Example notification counts for each section
  const [notifications, setNotifications] = useState({
    truckLocation: 3,
    employeeManagement: 1,
    salesTracking: 0,
    inventoryManagement: 3,
    adminDashboard: 1,
    financialReporting: 0,
    maintenanceFuelTracking: 0,
    notificationsAlerts: 5,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white animate-fadeIn">
      <header className="relative h-[350px] flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-orange-600 p-10 text-white shadow-lg bg-[length:200%_200%] animate-[gradientSwap_5s_infinite]">
        
        {/* Truck Icon Animation */}
        <GiFoodTruck className="absolute left-0 text-[200px] opacity-90 animate-truckSlide" />

        {/* Text Animation */}
        <div className="flex flex-col items-center mt-4 opacity-0 animate-textSlide">
          <h1 className="text-5xl font-bold tracking-wide leading-tight">
            Food Truck Management Dashboard
          </h1>
          <p className="text-lg mt-4 opacity-90">
            Track trucks, employees, sales, and inventory efficiently.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <TruckLocation notificationCount={notifications.truckLocation} />
          <EmployeeManagement notificationCount={notifications.employeeManagement} />
          <SalesTracking notificationCount={notifications.salesTracking} />
          <InventoryManagement notificationCount={notifications.inventoryManagement} />
          <AdminDashboard notificationCount={notifications.adminDashboard} />
          <FinancialReporting notificationCount={notifications.financialReporting} />
          <MaintenanceFuelTracking notificationCount={notifications.maintenanceFuelTracking} />
          <NotificationsAlerts notificationCount={notifications.notificationsAlerts} />
        </div>
      </main>
    </div>
  );
};

export default Home;