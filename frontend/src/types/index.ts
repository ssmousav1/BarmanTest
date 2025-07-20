export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  options: {
    size?: string[];
    color?: string[];
  };
  reviews: Review[];
}

export interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  author: string;
  createdAt: string;
}

export interface ProductContextType {
  products: Product[];
  selectedProduct: Product | null;
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  addProduct: (product: Product) => void;
  addReview: (productId: string, review: Review) => void;
}