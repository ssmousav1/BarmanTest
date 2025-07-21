"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Product } from "@/types";

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, "id" | "reviews">) => void;
}

export const NewProductModal: React.FC<NewProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [""],
    options: {
      size: [""],
      color: [""],
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const product = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      images: formData.images.filter((img) => img.trim() !== ""),
      options: {
        size: formData.options.size.filter((size) => size.trim() !== ""),
        color: formData.options.color.filter((color) => color.trim() !== ""),
      },
    };

    onSubmit(product);
    onClose();

    // Reset form
    setFormData({
      name: "",
      description: "",
      price: "",
      images: [""],
      options: {
        size: [""],
        color: [""],
      },
    });
  };

  const addField = (field: "images" | "size" | "color") => {
    if (field === "images") {
      setFormData({ ...formData, images: [...formData.images, ""] });
    } else if (field === "size") {
      setFormData({
        ...formData,
        options: { ...formData.options, size: [...formData.options.size, ""] },
      });
    } else {
      setFormData({
        ...formData,
        options: {
          ...formData.options,
          color: [...formData.options.color, ""],
        },
      });
    }
  };

  const updateField = (
    field: "images" | "size" | "color",
    index: number,
    value: string
  ) => {
    if (field === "images") {
      const newImages = [...formData.images];
      newImages[index] = value;
      setFormData({ ...formData, images: newImages });
    } else if (field === "size") {
      const newSizes = [...formData.options.size];
      newSizes[index] = value;
      setFormData({
        ...formData,
        options: { ...formData.options, size: newSizes },
      });
    } else {
      const newColors = [...formData.options.color];
      newColors[index] = value;
      setFormData({
        ...formData,
        options: { ...formData.options, color: newColors },
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-black text-2xl font-bold">Add New Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="text-black block text-sm font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-black block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-black block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-black block text-sm font-medium mb-2">Image URLs</label>
            {formData.images.map((image, index) => (
              <input
                key={index}
                type="url"
                value={image}
                onChange={(e) => updateField("images", index, e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
            ))}
            <button
              type="button"
              onClick={() => addField("images")}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              + Add another image
            </button>
          </div>

          <div>
            <label className="text-black block text-sm font-medium mb-2">
              Size Options
            </label>
            {formData.options.size.map((size, index) => (
              <input
                key={index}
                type="text"
                value={size}
                onChange={(e) => updateField("size", index, e.target.value)}
                placeholder="e.g., Small, Medium, Large"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
            ))}
            <button
              type="button"
              onClick={() => addField("size")}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              + Add another size
            </button>
          </div>

          <div>
            <label className="text-black block text-sm font-medium mb-2">
              Color Options
            </label>
            {formData.options.color.map((color, index) => (
              <input
                key={index}
                type="text"
                value={color}
                onChange={(e) => updateField("color", index, e.target.value)}
                placeholder="e.g., Red, Blue, Green"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
            ))}
            <button
              type="button"
              onClick={() => addField("color")}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              + Add another color
            </button>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-black flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
