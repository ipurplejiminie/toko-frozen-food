import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Selamat Datang di Toko Frozen Food
          </h1>
          <p className="text-gray-600 mb-8">
            Temukan berbagai makanan beku berkualitas untuk kebutuhan Anda
          </p>
          <Link 
            to="/products" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Lihat Produk Kami
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;