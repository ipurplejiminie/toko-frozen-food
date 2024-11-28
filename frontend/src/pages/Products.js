import React from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

const dummyProducts = [
  {
    id: 1,
    name: "Nugget Ayam",
    price: 45000,
    image: "https://via.placeholder.com/300",
    description: "Nugget ayam berkualitas tinggi"
  },
  {
    id: 2,
    name: "Sosis Sapi",
    price: 35000,
    image: "https://via.placeholder.com/300",
    description: "Sosis sapi premium"
  },
  {
    id: 3,
    name: "Dimsum",
    price: 30000,
    image: "https://via.placeholder.com/300",
    description: "Dimsum aneka rasa"
  }
];

const Products = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Daftar Produk
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dummyProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;