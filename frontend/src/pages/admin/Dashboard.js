import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { orderService } from '../../services/productService';

const AdminDashboard = () => {
  // Hooks
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders'); // Tab aktif: 'orders', 'products', atau 'users'
  const { products, loading, error, deleteProduct } = useProducts(); // Custom hook untuk produk
  const [orders, setOrders] = useState([]); // State untuk menyimpan data pesanan
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(''); // State untuk filter kategori

  // Daftar kategori produk
  const categories = [
    'Nugget',
    'Sosis',
    'Dimsum',
    'Kentang',
    'Sayuran',
    'Lainnya'
  ];

  // Mengambil data pesanan ketika tab orders aktif
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);
        // Untuk sementara gunakan data dummy
        const dummyOrders = [
          {
            id: "ORD001",
            date: "2024-03-15",
            customerName: "John Doe",
            total: 150000,
            status: "completed"
          },
          {
            id: "ORD002",
            date: "2024-03-14",
            customerName: "Jane Smith",
            total: 75000,
            status: "processing"
          }
        ];
        setOrders(dummyOrders);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Fungsi untuk menghapus produk
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        await deleteProduct(id);
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };

  // Filter produk berdasarkan kategori
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="hover:text-blue-200"
          >
            Keluar
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-8">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'orders' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-600'
            }`}
            onClick={() => setActiveTab('orders')}
          >
            Pesanan
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'products' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-600'
            }`}
            onClick={() => setActiveTab('products')}
          >
            Produk
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'users' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-600'
            }`}
            onClick={() => setActiveTab('users')}
          >
            Pengguna
          </button>
        </div>

        {/* Tab Content - Orders */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Daftar Pesanan</h2>
            {ordersLoading ? (
              <div>Loading...</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">ID Pesanan</th>
                    <th className="text-left py-2">Tanggal</th>
                    <th className="text-left py-2">Pelanggan</th>
                    <th className="text-left py-2">Total</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b">
                      <td className="py-2">{order.id}</td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>{order.customerName}</td>
                      <td>Rp {order.total.toLocaleString()}</td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status === 'completed' ? 'Selesai' : 'Diproses'}
                        </span>
                      </td>
                      <td>
                        <button className="text-blue-600 hover:text-blue-800">
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab Content - Products */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold">Daftar Produk</h2>
                <p className="text-sm text-gray-600">
                  Total: {filteredProducts.length} produk
                </p>
              </div>
              <div className="flex space-x-4">
                <select 
                  className="px-3 py-2 border rounded-lg"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Semua Kategori</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Link 
                  to="/admin/product/add" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Tambah Produk
                </Link>
              </div>
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <img 
                      src={product.image || 'https://via.placeholder.com/150'} 
                      alt={product.name} 
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-600">Rp {product.price?.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Stok: {product.stock}</p>
                    <div className="flex space-x-2 mt-2">
                      <button 
                        onClick={() => navigate(`/admin/product/edit/${product.id}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content - Users */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Daftar Pengguna</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">ID</th>
                  <th className="text-left py-2">Nama</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Tanggal Daftar</th>
                  <th className="text-left py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {/* Data dummy untuk pengguna */}
                <tr className="border-b">
                  <td className="py-2">1</td>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>15/03/2024</td>
                  <td>
                    <button className="text-blue-600 hover:text-blue-800">
                      Detail
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;