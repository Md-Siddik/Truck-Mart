import React from 'react';
import { FaEye, FaEdit, FaTrash, FaClock, FaIdBadge, FaEnvelope, FaBuilding, FaDollarSign, FaMapMarkerAlt, FaBirthdayCake, FaMapSigns, FaBullseye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const employees = [
  { 
    id: 1, 
    name: 'John Doe', 
    position: 'Manager', 
    status: 'Active', 
    image: 'https://via.placeholder.com/150', 
    contact: '123-456-7890', 
    email: 'johndoe@example.com', 
    address: '1234 Elm St, Springfield, IL', 
    department: 'Operations', 
    salary: '$60,000', 
    dob: '1985-06-15', 
    shiftIn: '9:00 AM', 
    shiftOut: '5:00 PM', 
    joiningDate: '2022-03-01',
    currentLocation: 'Chicago, IL', 
    targetLocation: 'New York, NY',
    todaysTarget: 'Complete team meeting and prepare sales report', // Today's Target added
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    position: 'Cashier', 
    status: 'Inactive', 
    image: 'https://via.placeholder.com/150', 
    contact: '098-765-4321', 
    email: 'janesmith@example.com', 
    address: '5678 Oak St, Dallas, TX', 
    department: 'Customer Service', 
    salary: '$40,000', 
    dob: '1990-10-10', 
    shiftIn: '10:00 AM', 
    shiftOut: '6:00 PM', 
    joiningDate: '2023-06-15',
    currentLocation: 'Houston, TX',
    targetLocation: 'Dallas, TX',
    todaysTarget: 'Manage customer complaints and oversee billing',
  },
  { 
    id: 3, 
    name: 'Mark Johnson', 
    position: 'Driver', 
    status: 'Active', 
    image: 'https://via.placeholder.com/150', 
    contact: '111-222-3333', 
    email: 'markjohnson@example.com', 
    address: '7890 Pine St, Seattle, WA', 
    department: 'Logistics', 
    salary: '$50,000', 
    dob: '1988-09-22', 
    shiftIn: '8:00 AM', 
    shiftOut: '4:00 PM', 
    joiningDate: '2021-08-10',
    currentLocation: 'Portland, OR',
    targetLocation: 'Seattle, WA',
    todaysTarget: 'Deliver supplies to designated locations and update logs',
  },
  // Add more employee data as needed
];

const Employees = () => {
  const navigate = useNavigate();
  const handleEmployeeTask = () => {
    navigate("/employeeTask")
  }

  const handleDetails = () => {
    navigate("/employeeDetails")
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Employee Management</h1>
        <button className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition">
          Add New Employee
        </button>
      </div>

      {/* Employee List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {employees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            {/* Employee Header */}
            <div className="flex items-center space-x-6 mb-4">
              <img src={employee.image} alt={employee.name} className="w-20 h-20 rounded-full object-cover" />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{employee.name}</h3>
                <p className="text-gray-500 text-lg">{employee.position}</p>
                <p className="text-sm text-gray-400">Joined: {new Date(employee.joiningDate).toLocaleDateString()}</p>
                <span className={`text-sm font-medium ${employee.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                  {employee.status}
                </span>
              </div>
            </div>

            {/* Employee Details */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 flex items-center">
                <FaIdBadge className="mr-2" /> Employee ID: {employee.id}
              </p>
              <p className="text-gray-600 flex items-center">
                <FaEnvelope className="mr-2" /> Email: {employee.email}
              </p>
              <p className="text-gray-600 flex items-center">
                <FaBuilding className="mr-2" /> Department: {employee.department}
              </p>
              <p className="text-gray-600 flex items-center">
                <FaDollarSign className="mr-2" /> Salary: {employee.salary}
              </p>
            </div>

            {/* Current and Target Locations */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <p className="text-gray-600 flex items-center">
                <FaMapSigns className="mr-2" /> Current Location: {employee.currentLocation}
              </p>
              <p className="text-gray-600 flex items-center">
                <FaMapSigns className="mr-2" /> Target Location: {employee.targetLocation}
              </p>
            </div>

            {/* Today's Target */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <p className="text-gray-600 flex items-center">
                <FaBullseye className="mr-2" /> Today's Target: {employee.todaysTarget}
              </p>
            </div>

            {/* Shift In and Shift Out Times */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <p className="text-gray-600 flex items-center">
                <FaClock className="mr-2" /> Shift In: {employee.shiftIn}
              </p>
              <p className="text-gray-600 flex items-center">
                <FaClock className="mr-2" /> Shift Out: {employee.shiftOut}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button className="text-blue-500 hover:text-blue-600 transition-colors" onClick={handleDetails}><FaEye size={18} /></button>
              <button className="text-yellow-500 hover:text-yellow-600 transition-colors" onClick={handleEmployeeTask}><FaEdit size={18} /></button>
              <button className="text-red-500 hover:text-red-600 transition-colors"><FaTrash size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
