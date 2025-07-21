'use client';

import { Product } from '@/types';
import React, { useState } from 'react';

interface OptionsSelectorProps {
  product: Product;
  onOptionsChange?: (options: { size?: string; color?: string }) => void;
}

export const OptionsSelector: React.FC<OptionsSelectorProps> = ({ product, onOptionsChange }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    onOptionsChange?.({ size, color: selectedColor });
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onOptionsChange?.({ size: selectedSize, color });
  };

  return (
    <div className="space-y-6">
      {product.options.size && product.options.size.length > 0 && (
        <div>
          <h3 className="text-black text-lg font-semibold mb-3">Size</h3>
          <div className="flex flex-wrap gap-2">
            {product.options.size.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-4 py-2 border-2 rounded-md transition-colors ${
                  selectedSize === size
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-400 bg-gray-400 text-black hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.options.color && product.options.color.length > 0 && (
        <div>
          <h3 className="text-black text-lg font-semibold mb-3">Color</h3>
          <div className="flex flex-wrap gap-2">
            {product.options.color.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`px-4 py-2 border-2 rounded-md transition-colors ${
                  selectedColor === color
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-400 bg-gray-400 text-black hover:border-gray-400'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedSize || selectedColor ? (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            Selected: {selectedSize && `Size: ${selectedSize}`} {selectedSize && selectedColor && ', '} {selectedColor && `Color: ${selectedColor}`}
          </p>
        </div>
      ) : null}
    </div>
  );
};