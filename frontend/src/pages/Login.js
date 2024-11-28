import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Hapus useNavigate dulu

const Login = () => {
  // Hapus const navigate
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <button type="submit" className="w-full btn-primary">
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Belum punya akun? <Link to="/register" className="text-blue-600">Daftar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;