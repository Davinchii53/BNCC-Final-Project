"use client";
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { cart } = useCart();

  return (
    <nav className={`p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          E-Commerce
        </Link>
        <div className="flex items-center gap-6">
          {/* Tambahkan menu baru di sini */}
          <Link href="/topup" className="hover:underline">
            💰 Top Up
          </Link>
          <Link href="/history" className="hover:underline">
            📜 Riwayat
          </Link>
          <Link href="/cart" className="flex items-center gap-1">
            🛒 Cart
            {cart.length > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          <button onClick={toggleTheme} className="p-2 rounded-full">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};