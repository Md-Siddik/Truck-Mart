import { useState } from "react";


const employees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
];

const locations = ['Park', 'Event Center', 'Market'];

const EmployeeTask = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0].id);
  const [dailyTarget, setDailyTarget] = useState('');
  const [workingLocation, setWorkingLocation] = useState(locations[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', {
      employee: selectedEmployee,
      target: dailyTarget,
      location: workingLocation,
    });
    // Here, you can also send the data to a backend
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Task Management</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Select Employee</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Daily Target</label>
          <input
            type="number"
            value={dailyTarget}
            onChange={(e) => setDailyTarget(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter Target Here"
          />
        </div>

        <div>
          <label className="block mb-1">Working Location</label>
          <select
            value={workingLocation}
            onChange={(e) => setWorkingLocation(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white rounded p-2">
          Save Task
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Current Tasks Overview</h2>
        <table className="min-w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Employee Name</th>
              <th className="border border-gray-300 p-2">Target</th>
              <th className="border border-gray-300 p-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {/* You can map through a list of tasks here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTask;