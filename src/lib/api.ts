// src/lib/api.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  description: string;
}

export async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    return res.ok ? await res.json() : null;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}