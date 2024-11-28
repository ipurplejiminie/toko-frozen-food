import React from 'react';
import { Link } from 'react-router-dom'; // Tambahkan import ini
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Keranjang Belanja</h2>
        
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Keranjang belanja Anda kosong</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow flex items-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-blue-600">Rp {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="px-2 py-1 bg-blue-100 rounded"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button 
                      className="px-2 py-1 bg-blue-100 rounded"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className="ml-4 text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white p-4 rounded-lg shadow">
              <div className="text-xl font-bold flex justify-between">
                <span>Total:</span>
                <span>Rp {getCartTotal().toLocaleString()}</span>
              </div>
              <Link to="/checkout">
                <button className="w-full btn-primary mt-4">
                  Lanjut ke Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
