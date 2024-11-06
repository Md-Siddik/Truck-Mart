import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../../AuthProvider/AuthProvider';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const { createUser } = useContext(AuthContext);

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photoUrl');
        const email = form.get('email');
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        if (!name || !email || !password || !confirmPassword) {
            Swal.fire('Error', 'Please fill out all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire('Error', 'Passwords do not match', 'error');
            return;
        }

        createUser(email, password)
            .then(result => {
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo
                })
                    .then(() => {
                        Swal.fire('Success!', 'User Added Successfully', 'success');
                        navigate('/');
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire('Error', error.message, 'error');
                    });
            })
            .catch(error => {
                console.error(error);
                Swal.fire('Error', error.message, 'error');
            });

        navigate('/');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-blue-100 to-purple-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
                    <p className="text-gray-600">Join Food Truck Management</p>
                </div>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            placeholder="Enter your name"
                            name='name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Photo</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            placeholder="Photo URL"
                            name='photoUrl'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            placeholder="Enter your email"
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='gap-4 relative mb-4'>
                        <label className="block text-gray-700">Password</label>
                        <input type={showPassword ? "text" : "password"} required name="password" placeholder="Create a password" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400" />
                        <span className='absolute right-3 pt-5' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>
                    </div>
                    <div className='gap-4 relative mb-4'>
                        <label className="block text-gray-700">Confirm Password</label>
                        <input type={showConfirmPassword ? "text" : "password"} required name="confirmPassword" placeholder="Confirm your password" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400" />
                        <span className='absolute right-3 pt-5' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
                        Sign Up
                    </button>
                </form>
                <p className="mt-6 text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/')}
                        className="text-purple-500 hover:underline cursor-pointer">
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}
