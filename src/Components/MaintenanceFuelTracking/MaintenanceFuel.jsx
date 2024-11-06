import React, { useState } from "react";
import Swal from "sweetalert2";
import Papa from "papaparse";
import { jsPDF } from "jspdf";

const MaintenanceFuel = () => {
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [fuelLogs, setFuelLogs] = useState([]);
  const [formData, setFormData] = useState({
    maintenanceDate: "",
    maintenanceDescription: "",
    maintenanceCost: "",
    fuelDate: "",
    fuelLiters: "",
    fuelCost: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addMaintenanceLog = (e) => {
    e.preventDefault();
    if (!formData.maintenanceDate || !formData.maintenanceDescription || !formData.maintenanceCost) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the maintenance fields!",
      });
      return;
    }

    const newLog = {
      date: formData.maintenanceDate,
      description: formData.maintenanceDescription,
      cost: formData.maintenanceCost,
    };
    setMaintenanceLogs([...maintenanceLogs, newLog]);

    // Reset the form fields
    setFormData({
      ...formData,
      maintenanceDate: "",
      maintenanceDescription: "",
      maintenanceCost: "",
    });
  };

  const addFuelLog = (e) => {
    e.preventDefault();
    if (!formData.fuelDate || !formData.fuelLiters || !formData.fuelCost) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the fuel log fields!",
      });
      return;
    }

    const newLog = {
      date: formData.fuelDate,
      fuelLiters: formData.fuelLiters,
      fuelCost: formData.fuelCost,
    };
    setFuelLogs([...fuelLogs, newLog]);

    // Reset the form fields
    setFormData({
      ...formData,
      fuelDate: "",
      fuelLiters: "",
      fuelCost: "",
    });
  };

  // Function to download logs as CSV
  const downloadCSV = (logs, logType) => {
    const csv = Papa.unparse(logs);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${logType}_logs.csv`;
    link.click();
  };

  // Function to download logs as PDF
  const downloadPDF = (logs, logType) => {
    const doc = new jsPDF();
    doc.text(`${logType.charAt(0).toUpperCase() + logType.slice(1)} Logs`, 10, 10);
    let yPosition = 20;

    logs.forEach((log, index) => {
      doc.text(
        `${index + 1}. Date: ${log.date}, Description: ${log.description || log.fuelLiters + " liters"}, Cost: $${log.cost || log.fuelCost}`,
        10,
        yPosition
      );
      yPosition += 10;
    });

    doc.save(`${logType}_logs.pdf`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Maintenance & Fuel Tracking</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Maintenance Form */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Add Maintenance Log</h2>
          <form onSubmit={addMaintenanceLog}>
            <div className="mb-4">
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                name="maintenanceDate"
                value={formData.maintenanceDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <input
                type="text"
                name="maintenanceDescription"
                value={formData.maintenanceDescription}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Cost ($)</label>
              <input
                type="number"
                name="maintenanceCost"
                value={formData.maintenanceCost}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500"
            >
              Add Maintenance Log
            </button>
          </form>
        </div>

        {/* Fuel Form */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Add Fuel Log</h2>
          <form onSubmit={addFuelLog}>
            <div className="mb-4">
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                name="fuelDate"
                value={formData.fuelDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fuel Liters</label>
              <input
                type="number"
                name="fuelLiters"
                value={formData.fuelLiters}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fuel Cost ($)</label>
              <input
                type="number"
                name="fuelCost"
                value={formData.fuelCost}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500"
            >
              Add Fuel Log
            </button>
          </form>
        </div>
      </div>

      {/* Logs Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Maintenance Logs */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Maintenance Logs</h2>
          <ul className="list-disc pl-5">
            {maintenanceLogs.map((log, index) => (
              <li key={index}>
                {log.date} - {log.description} - ${log.cost}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => downloadCSV(maintenanceLogs, "maintenance")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Download Maintenance CSV
            </button>
            <button
              onClick={() => downloadPDF(maintenanceLogs, "maintenance")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Download Maintenance PDF
            </button>
          </div>
        </div>

        {/* Fuel Logs */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Fuel Logs</h2>
          <ul className="list-disc pl-5">
            {fuelLogs.map((log, index) => (
              <li key={index}>
                {log.date} - {log.fuelLiters} liters - ${log.fuelCost}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => downloadCSV(fuelLogs, "fuel")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Download Fuel CSV
            </button>
            <button
              onClick={() => downloadPDF(fuelLogs, "fuel")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Download Fuel PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceFuel;
