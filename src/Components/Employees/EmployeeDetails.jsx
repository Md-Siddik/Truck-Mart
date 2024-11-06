import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default calendar styles

const EmployeeDetails = () => {
  const employee = {
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
    todaysTarget: 'Complete team meeting and prepare sales report',
    daysOnTime: 120, // Example data for shift in on time
    daysTargetCompleted: 110, // Example data for targets covered
    attendance: {
      '2024-09-01': 'onTime',
      '2024-09-02': 'late',
      '2024-09-03': 'onTime',
      '2024-09-04': 'onTime',
      '2024-09-05': 'late',
      '2024-09-06': 'onTime',
      '2024-09-07': 'late',
      '2024-09-08': 'onTime',
      // More days as needed
    },
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to add Tailwind classes for on-time or late shift-ins
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      if (employee.attendance[dateString] === 'onTime') {
        return 'bg-green-500 text-white rounded-full'; // Tailwind class for on-time (green)
      } else if (employee.attendance[dateString] === 'late') {
        return 'bg-red-500 text-white rounded-full'; // Tailwind class for late (red)
      }
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-4">
        <img
          src={employee.image}
          alt={employee.name}
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-semibold">{employee.name}</h2>
          <p className="text-gray-500">
            {employee.position} - {employee.department}
          </p>
          <p className={`text-sm ${employee.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
            {employee.status}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Personal Info</h3>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Contact:</strong> {employee.contact}</p>
          <p><strong>Address:</strong> {employee.address}</p>
          <p><strong>Date of Birth:</strong> {employee.dob}</p>
        </div>

        {/* Job Info */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Job Info</h3>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Salary:</strong> {employee.salary}</p>
          <p><strong>Joining Date:</strong> {employee.joiningDate}</p>
        </div>

        {/* Shift Info */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Shift Info</h3>
          <p><strong>Shift In:</strong> {employee.shiftIn}</p>
          <p><strong>Shift Out:</strong> {employee.shiftOut}</p>
          <p><strong>Current Location:</strong> {employee.currentLocation}</p>
          <p><strong>Target Location:</strong> {employee.targetLocation}</p>
        </div>

        {/* Performance Info */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Performance</h3>
          <p><strong>Today's Target:</strong> {employee.todaysTarget}</p>
          <p><strong>Days Shifted In On Time:</strong> {employee.daysOnTime}</p>
          <p><strong>Days Target Met:</strong> {employee.daysTargetCompleted}</p>
        </div>
      </div>

      {/* Calendar for Shift Timings */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Shift Timings Calendar</h3>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={tileClassName} // Apply Tailwind-based classes for attendance
          className="w-full text-center"
        />
        <iframe src="https://drive.google.com/file/d/1YqU_L4yGNffQOSzkBnhrx6atkiYXcKUp/preview" width="640" height="480"></iframe>
      </div>

      {/* Calendar for Target tracking */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Target tracking Calendar</h3>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={tileClassName} // Apply Tailwind-based classes for attendance
          className="w-full text-center"
        />
      </div>
    </div>
  );
};

export default EmployeeDetails;