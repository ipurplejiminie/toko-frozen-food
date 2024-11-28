import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Data dummy untuk riwayat pesanan
const dummyOrders = [
  {
    id: "ORD001",
    date: "2024-03-15",
    total: 150000,
    status: "Selesai",
    items: [
      { name: "Nugget Ayam", quantity: 2, price: 45000 },
      { name: "Sosis Sapi", quantity: 2, price: 30000 }
    ]
  },
  {
    id: "ORD002",
    date: "2024-03-14",
    total: 75000,
    status: "Dikirim",
    items: [
      { name: "Dimsum", quantity: 3, price: 25000 }
    ]
  }
];

const OrderHistory = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Riwayat Pesanan</h2>

        <div className="space-y-4">
          {dummyOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">Pesanan #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    Tanggal: {new Date(order.date).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'Selesai' ? 'bg-green-100 text-green-800' : 
                  'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm mb-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>Rp {item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                <div className="font-semibold">
                  Total: Rp {order.total.toLocaleString()}
                </div>
                <Link 
                  to={`/order-detail/${order.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;