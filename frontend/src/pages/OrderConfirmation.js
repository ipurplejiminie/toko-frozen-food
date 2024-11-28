import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const OrderConfirmation = () => {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-green-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Pesanan Berhasil!
            </h2>
            <p className="text-gray-600 mb-4">
              Terima kasih telah berbelanja di toko kami
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Nomor Pesanan: {orderNumber}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold mb-2">Detail Pesanan:</h3>
            <p className="text-sm text-gray-600 mb-1">
              Status: <span className="font-medium">Menunggu Pembayaran</span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Estimasi pengiriman: 1-2 hari kerja
            </p>
          </div>

          <div className="space-y-3 mt-6">
            <Link to="/products">
              <button className="w-full btn-primary">
                Lanjut Belanja
              </button>
            </Link>
            <Link to="/orders">
              <button className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                Lihat Pesanan Saya
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;