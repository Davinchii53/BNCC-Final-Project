import axios from 'axios';
import { Product } from '../types/product';

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response.data.products; 
};