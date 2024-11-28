import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Tampilkan preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Simulasi upload ke server
    try {
      setLoading(true);
      // Di sini nanti akan ada kode untuk upload ke server/cloud storage
      // Untuk sementara kita gunakan URL lokal
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Gambar Produk</label>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg"
            disabled={loading}
          />
          {loading && (
            <p className="text-sm text-gray-500 mt-1">Mengupload gambar...</p>
          )}
        </div>
        {preview && (
          <div className="w-24 h-24">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;