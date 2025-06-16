"use client";
import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import Link from 'next/link';

export default function TopUpPage() {
  const { balance, topUp } = useUser();
  const { theme } = useTheme();
  const [amount, setAmount] = useState<number>(10);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTopUp = () => {
    if (amount <= 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      topUp(amount);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen transition-colors ${theme === 'dark' ? 'bg-dark-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
          Top Up Saldo
        </h1>

        <div className={`max-w-md mx-auto p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-dark-800' : 'bg-white'}`}>
          <div className="mb-4">
            <label className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Saldo Saat Ini
            </label>
            <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
              ${balance.toFixed(2)}
            </p>
          </div>

          <div className="mb-4">
            <label className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Jumlah Top-Up
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-dark-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
          </div>

          <button
            onClick={handleTopUp}
            disabled={isProcessing}
            className={`w-full py-2 rounded font-medium ${isProcessing ? 'bg-gray-400' : theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600 text-white'}`}
          >
            {isProcessing ? 'Memproses...' : 'Top Up Sekarang'}
          </button>

          <Link href="/" className={`block text-center mt-4 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}