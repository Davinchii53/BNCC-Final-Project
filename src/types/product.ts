import { ReactNode } from "react";

export interface Product {
  description: ReactNode;
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}