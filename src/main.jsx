import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './Home/Home.jsx'
import Main from './Main/Main.jsx';
import TruckDetails from './Components/TruckLocation/TruckDetails.jsx';
import TruckList from './Components/TruckLocation/TruckList.jsx';
import Employees from './Components/Employees/Employees.jsx';
import SaleTrackingDetails from './Components/SaleDetails/SalesTrackingDetails.jsx';
import Login from './Components/Login/Login.jsx';
import EmployeePage from './Components/Employees/EmployeePage.jsx';
import Inventory from './Components/InventoryManagement/Inventory.jsx';
import FinancialReport from './Components/FinancialReporting/FinancialReport.jsx';
import MaintenanceFuel from './Components/MaintenanceFuelTracking/MaintenanceFuel.jsx';
import Notifications from './Components/NotificationsAlert/Notifications.jsx';
import EmployeeTask from './Components/Employees/EmployeeTask.jsx';
import EmployeeDetails from './Components/Employees/EmployeeDetails.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <h1>404 not found</h1>,
    children: [
      {
        path: "/",
        element: <Login></Login>
      },
      {
        path: "/home",
        element: <Home></Home>
      },
      {
        path: "/truckDetails",
        element: <TruckDetails></TruckDetails>
      },
      {
        path: "/truckList",
        element: <TruckList></TruckList>
      },
      {
        path: "/employees",
        element: <Employees></Employees>
      },
      {
        path: "/employeeTask",
        element: <EmployeeTask></EmployeeTask>
      },
      {
        path: "/employeeDetails",
        element: <EmployeeDetails></EmployeeDetails>
      },
      {
        path: "/employeePage",
        element: <EmployeePage></EmployeePage>
      },
      {
        path: "/saleTrackingDetails",
        element: <SaleTrackingDetails></SaleTrackingDetails>
      },
      {
        path: "/inventory",
        element: <Inventory></Inventory>
      },
      {
        path: "/financialReport",
        element: <FinancialReport></FinancialReport>
      },
      {
        path: "/maintenanceFuel",
        element: <MaintenanceFuel></MaintenanceFuel>
      },
      {
        path: "/notifications",
        element: <Notifications></Notifications>
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)