"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';

type CartItem = Product & { quantity: number };
type PurchaseHistoryItem = {
  id: string;
  date: Date;
  items: CartItem[];
  total: number;
};
type CartContextType = {
  cart: CartItem[];
  purchaseHistory: PurchaseHistoryItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  addToHistory: (items: CartItem[], total: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryItem[]>([]);

  // Load cart & history dari Local Storage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedHistory = localStorage.getItem('purchaseHistory');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedHistory) setPurchaseHistory(JSON.parse(savedHistory));
  }, []);

  // Simpan ke Local Storage saat ada perubahan
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
  }, [cart, purchaseHistory]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const addToHistory = (items: CartItem[], total: number) => {
    const newOrder: PurchaseHistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date(),
      items,
      total,
    };
    setPurchaseHistory((prev) => [newOrder, ...prev]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        purchaseHistory,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToHistory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};