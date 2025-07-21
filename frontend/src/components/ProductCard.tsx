'use client';

import React from 'react';
import { Product } from '@/contexts/ProductContext';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-square w-full bg-gray-100">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No image
            </div>
          )}
        </div>
        
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            
            {product.reviews.length > 0 && (
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">
                  {averageRating.toFixed(1)} ({product.reviews.length})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};