"use client";
import { Product } from '@/types/product';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';

interface ProductCardProps {
  product: Product;
  className?: string; 
}

export const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { theme } = useTheme();

  return (
    <div className={`border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-dark-800 border-gray-700 hover:shadow-blue-900/20' 
        : 'bg-white border-gray-200 hover:shadow-blue-500/10'
    } ${className}`}> {/* Gabungkan className */}
      
      {/* Gambar Produk */}
      <div 
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${product.thumbnail})` }}
        aria-label={product.title}
      />
      
      {/* Info Produk */}
      <div className={`p-4 ${
        theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
      }`}>
        <h3 className="font-bold text-lg truncate">{product.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className={`font-semibold ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>
            ${product.price}
          </span>
          <span className="text-yellow-500">⭐ {product.rating}</span>
        </div>
        
        {/* Tombol */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => addToCart(product)}
            className={`px-3 py-1 rounded text-sm ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            + Keranjang
          </button>
          <Link
            href={`/products/${product.id}`}
            className={`px-3 py-1 rounded text-sm ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};