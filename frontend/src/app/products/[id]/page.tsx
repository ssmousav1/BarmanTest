"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProduct } from "@/contexts/ProductContext";
import { ProductDetail } from "@/components/ProductDetail";
import { OptionsSelector } from "@/components/OptionsSelector";
import { Reviews } from "@/components/Reviews";
import { AIAssistant } from "@/components/AIAssistant";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { Review } from "@/types";

export default function ProductPage() {
  const params = useParams();
  const { selectedProduct, setSelectedProduct, addReview } = useProduct();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id]);

  const fetchProduct = async (productId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/products/${productId}`
      );
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/products/${params.id}/reviews`,
        reviewData
      );
      addReview(params.id as string, response.data);
    } catch (error) {
      console.error("Failed to add review:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg mb-4">Product not found</p>
        <Link href="/" className="text-blue-600 hover:text-blue-700">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">
              E-Commerce Store
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProductDetail product={selectedProduct} />

            <div className="bg-white rounded-lg shadow-lg p-6">
              <OptionsSelector
                product={selectedProduct}
                onOptionsChange={(options) =>
                  console.log("Selected options:", options)
                }
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <Reviews
                reviews={selectedProduct.reviews}
                productId={selectedProduct.id}
                onAddReview={handleAddReview}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AIAssistant
                productId={selectedProduct.id}
                reviews={selectedProduct.reviews}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
