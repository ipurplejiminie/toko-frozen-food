import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import FormInput from '../components/FormInput';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    phone: '',
    note: ''
  });

  // Fungsi validasi form
  const validateForm = () => {
    const newErrors = {};
    
    if (!shippingInfo.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap harus diisi';
    }
    
    if (!shippingInfo.address.trim()) {
      newErrors.address = 'Alamat harus diisi';
    }
    
    if (!shippingInfo.phone.trim()) {
      newErrors.phone = 'Nomor telepon harus diisi';
    } else if (!/^[0-9]{10,13}$/.test(shippingInfo.phone)) {
      newErrors.phone = 'Nomor telepon tidak valid';
    }
    
    if (!paymentMethod) {
      newErrors.payment = 'Pilih metode pembayaran';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Tambahkan fungsi handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulasi proses pembayaran
      console.log('Data pesanan:', {
        shippingInfo,
        paymentMethod,
        items: cartItems,
        total: getCartTotal()
      });

      // Redirect ke halaman konfirmasi setelah 1.5 detik
      setTimeout(() => {
        navigate('/order-confirmation');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Checkout</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Pengiriman */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Informasi Pengiriman</h3>
            <form onSubmit={handleSubmit}>
              <FormInput
                label="Nama Lengkap"
                type="text"
                value={shippingInfo.fullName}
                onChange={(e) => setShippingInfo({
                  ...shippingInfo,
                  fullName: e.target.value
                })}
                error={errors.fullName}
              />

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Alamat Lengkap</label>
                <textarea
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows="3"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({
                    ...shippingInfo,
                    address: e.target.value
                  })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <FormInput
                label="Nomor Telepon"
                type="tel"
                value={shippingInfo.phone}
                onChange={(e) => setShippingInfo({
                  ...shippingInfo,
                  phone: e.target.value
                })}
                error={errors.phone}
              />
            </form>
          </div>

          {/* Ringkasan Pesanan dan Pembayaran */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h3>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>Rp {getCartTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Metode Pembayaran</h3>
              <div className="space-y-2">
                <label className="block">
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  Kartu Kredit
                </label>
                <label className="block">
                  <input
                    type="radio"
                    name="payment"
                    value="debit"
                    checked={paymentMethod === 'debit'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  Kartu Debit
                </label>
                <label className="block">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  Tunai
                </label>
                {errors.payment && (
                  <p className="text-red-500 text-sm mt-1">{errors.payment}</p>
                )}
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full btn-primary py-3"
              disabled={cartItems.length === 0}
            >
              {cartItems.length === 0 ? 'Keranjang Kosong' : 'Proses Pembayaran'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;