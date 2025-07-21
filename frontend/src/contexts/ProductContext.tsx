'use client';

import { Product, ProductContextType, Review } from '@/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';



const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const addReview = (productId: string, review: Review) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, reviews: [...product.reviews, review] }
        : product
    ));
    
    if (selectedProduct?.id === productId) {
      setSelectedProduct({
        ...selectedProduct,
        reviews: [...selectedProduct.reviews, review]
      });
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      selectedProduct,
      setProducts,
      setSelectedProduct,
      addProduct,
      addReview
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};