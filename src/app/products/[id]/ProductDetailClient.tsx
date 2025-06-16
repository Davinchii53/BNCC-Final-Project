"use client";
import { Product } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div 
          className="w-full h-96 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${product.thumbnail})` }}
        />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl">${product.price}</p>
          <p>Rating: {product.rating} ⭐</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}