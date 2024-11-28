import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../../services/productService';
import ImageUpload from '../../components/ImageUpload';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    stock: '',
    category: '' // Tambah field kategori
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          setLoading(true);
          const product = await productService.getProductById(id);
          setFormData(product);
        } catch (err) {
          setError('Gagal mengambil data produk');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageUpload = (imageUrl) => {
    setFormData({ ...formData, image: imageUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await productService.updateProduct(id, formData);
      } else {
        await productService.createProduct(formData);
      }
      navigate('/admin');
    } catch (err) {
      setError('Gagal menyimpan produk');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Nugget',
    'Sosis',
    'Dimsum',
    'Kentang',
    'Sayuran',
    'Lainnya'
  ];

  if (loading && id) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">
          {id ? 'Edit Produk' : 'Tambah Produk Baru'}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nama Produk</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Kategori</label>
            <select
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Harga</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">Rp</span>
              <input
                type="number"
                className="w-full px-3 py-2 pl-10 border rounded-lg"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
            </div>
          </div>

          <ImageUpload onImageUpload={handleImageUpload} />

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Deskripsi</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Stok</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Menyimpan...' : (id ? 'Simpan Perubahan' : 'Tambah Produk')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;