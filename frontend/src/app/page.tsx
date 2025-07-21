'use client';

import React, { useEffect, useState } from 'react';
import { useProduct } from '@/contexts/ProductContext';
import { ProductCard } from '@/components/ProductCard';
import { NewProductModal } from '@/components/NewProductModal';
import { Plus, ShoppingBag } from 'lucide-react';
import axios from 'axios';

export default function ProductsPage() {
  const { products, setProducts, addProduct } = useProduct();
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData: any) => {
    try {
      const response = await axios.post('http://localhost:3001/products', productData);
      addProduct(response.data);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">E-Commerce Store</h1>
          </div>
          <button
            onClick={() => setShowNewProductModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">All Products</h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">No products found.</p>
            <button
              onClick={() => setShowNewProductModal(true)}
              className="text-blue-600 hover:text-blue-700"
            >
              Add your first product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <NewProductModal
        isOpen={showNewProductModal}
        onClose={() => setShowNewProductModal(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
}