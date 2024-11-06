import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const users = [
    { email: 'admin@gmail.com', password: 'Admin123', role: 'admin' },
    { email: 'employee@gmail.com', password: 'Employee123', role: 'employee' }
];

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userRole, setUserRole] = useState('');

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find((user) => user.email === email && user.password === password);
        if (user) {
            setUserRole(user.role);
            if (user.role === 'admin') {
                navigate("/home");
            } else if (user.role === 'employee') {
                navigate("/employeePage");
            }
        } else {
            setError('Invalid email or password');
        }
    };

    const handleSignUp = () => {
        navigate("/signUp"); // Assuming there’s a route for signup page
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-100 via-red-100 to-orange-100">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Food Truck Management</h2>
                    <p className="text-gray-600">Login to your account</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
                        Login
                    </button>
                </form>
                <p className="mt-6 text-sm text-center text-gray-600">
                    Already have an account?
                    <button
                        onClick={handleSignUp}
                        className="text-orange-500 hover:underline">
                        Sign up
                    </button>
                </p>
                {userRole && (
                    <p className="mt-4 text-sm text-center text-green-600">
                        Logged in as: {userRole === 'admin' ? 'Admin' : 'Employee'}
                    </p>
                )}
            </div>
        </div>
    );
}


// Geolocation API

// navigator.geolocation.getCurrentPosition((position) => {
//     const { latitude, longitude } = position.coords;
//     console.log('Latitude:', latitude, 'Longitude:', longitude);
// });



// Frontend Code Example (React with Firebase)

// import React, { useEffect, useState } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/database';

// const firebaseConfig = {
//   // Your Firebase configuration
// };

// firebase.initializeApp(firebaseConfig);

// const LiveLocation = () => {
//   const [location, setLocation] = useState({ latitude: null, longitude: null });

//   useEffect(() => {
//     const updateLocation = (position) => {
//       const { latitude, longitude } = position.coords;
//       setLocation({ latitude, longitude });
//       firebase.database().ref('users/user1').set({ latitude, longitude });
//     };

//     navigator.geolocation.watchPosition(updateLocation);

//     const locationRef = firebase.database().ref('users/user1');
//     locationRef.on('value', (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         setLocation({ latitude: data.latitude, longitude: data.longitude });
//       }
//     });

//     return () => {
//       locationRef.off();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Live Location</h1>
//       <p>Latitude: {location.latitude}</p>
//       <p>Longitude: {location.longitude}</p>
//     </div>
//   );
// };

// export default LiveLocation;