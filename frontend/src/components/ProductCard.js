import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-blue-800">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-blue-600 font-bold mt-2">
          Rp {product.price.toLocaleString()}
        </p>
        <button 
          className="btn-primary w-full mt-4"
          onClick={() => addToCart(product)}
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
};

export default ProductCard;