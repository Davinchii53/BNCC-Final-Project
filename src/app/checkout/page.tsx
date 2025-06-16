"use client";
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart, addToHistory } = useCart();
  const { balance, topUp } = useUser();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    if (balance < totalPrice) {
      alert('Saldo tidak cukup! Silakan top up terlebih dahulu.');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // 1. Deduct balance
      topUp(-totalPrice); // Mengurangi saldo
      
      // 2. Save to purchase history
      addToHistory(cart, totalPrice);
      
      // 3. Clear cart
      clearCart();
      
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  if (cart.length === 0 && !paymentSuccess) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Keranjang Kosong</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Kembali Berbelanja
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {paymentSuccess ? (
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold mb-4 text-green-500">Pembayaran Berhasil!</h1>
          <p>Terima kasih telah berbelanja.</p>
          <div className="mt-6 space-x-4">
            <Link
              href="/"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Beranda
            </Link>
            <Link
              href="/history"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Lihat Riwayat
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>
          
          {/* Order Summary */}
          <div className="mb-6 p-4 border rounded-lg">
            <h2 className="font-bold mb-2">Ringkasan Pesanan</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <span>
                  {item.title} <span className="text-gray-500">x{item.quantity}</span>
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className={`mt-2 text-sm ${balance < totalPrice ? 'text-red-500' : 'text-green-500'}`}>
              Saldo tersedia: ${balance.toFixed(2)}
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Nomor Kartu</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border rounded"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Tanggal Kadaluarsa</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-2 border rounded"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full p-2 border rounded"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handlePayment}
              disabled={isProcessing || balance < totalPrice}
              className={`w-full py-2 rounded text-white ${
                isProcessing
                  ? 'bg-gray-400'
                  : balance < totalPrice
                  ? 'bg-red-400'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isProcessing ? 'Memproses...' : 'Bayar Sekarang'}
            </button>
            
            {balance < totalPrice && (
              <Link
                href="/topup"
                className="block text-center text-blue-500 hover:underline mt-2"
              >
                Top Up Saldo
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}