import React, { useState } from "react";

const NotificationsAlerts = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New maintenance log added.", read: false },
    { id: 2, message: "Fuel log entry created.", read: false },
    { id: 3, message: "Employee attendance updated.", read: false },
    { id: 4, message: "New customer order received.", read: false },
    { id: 5, message: "Inventory levels are low for some items.", read: false },
    { id: 6, message: "Truck location updated.", read: false },
    { id: 7, message: "Payment received for order #2345.", read: false },
    { id: 8, message: "Maintenance due for Truck #3 next week.", read: false },
    { id: 9, message: "New alert: Customer feedback received.", read: false },
    { id: 10, message: "Weekly sales report generated.", read: false },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Notifications & Alerts</h1>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`flex justify-between items-center p-3 rounded-lg ${
                notification.read ? "bg-gray-100" : "bg-yellow-100"
              }`}
            >
              <span className={`${notification.read ? "line-through" : ""}`}>
                {notification.message}
              </span>
              <div className="space-x-2">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-400"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as Read
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-400"
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsAlerts;