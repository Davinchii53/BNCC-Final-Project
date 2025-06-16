"use client";
import { useProducts } from '@/contexts/ProductContext';
import { useState } from 'react';

export const SearchAndFilter = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Fixed Line 12:
const categories = ['all'].concat(Array.from(new Set(products.map(p => p.category))));
  // Filter dan sortir produk

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border rounded pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute left-3 top-2.5">🔍</span>
      </div>

      {/* Filter & Sort */}
      <div className="flex flex-wrap gap-4">
        <select
          className="p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rating</option>
        </select>
      </div>
    </div>
  );
};