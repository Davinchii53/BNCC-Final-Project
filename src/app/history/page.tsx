"use client";
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';

export default function HistoryPage() {
  const { purchaseHistory } = useCart();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors ${theme === 'dark' ? 'bg-dark-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
          Riwayat Pembelian
        </h1>

        {purchaseHistory.length === 0 ? (
          <div className={`text-center py-10 rounded-lg ${theme === 'dark' ? 'bg-dark-800' : 'bg-white p-6 shadow'}`}>
            <p className="mb-4">Belum ada riwayat pembelian.</p>
            <Link 
              href="/" 
              className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              Mulai Berbelanja
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {purchaseHistory.map((order) => (
              <div 
                key={order.id} 
                className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-dark-800 border-gray-700' : 'bg-white border-gray-200'} border`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className={`font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                      Order #{order.id}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                  <span className={`font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                    ${order.total.toFixed(2)}
                  </span>
                </div>

                <div className={`mt-3 pt-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  {order.items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex justify-between py-2 items-center"
                    >
                      <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.title} <span className="text-sm">(x{item.quantity})</span>
                      </span>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}