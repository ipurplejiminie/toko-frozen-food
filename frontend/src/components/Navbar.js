import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Toko Frozen Food
        </Link>
        <div className="flex space-x-4 items-center">
          <Link to="/products" className="text-white hover:text-blue-200">
            Produk
          </Link>
          <Link to="/cart" className="text-white hover:text-blue-200 relative">
            Keranjang
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link to="/login" className="text-white hover:text-blue-200">
            Login
          </Link>
          <Link to="/register" className="text-white hover:text-blue-200">
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;