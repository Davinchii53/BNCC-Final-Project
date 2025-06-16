"use client";
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p>Your cart is empty.</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {cart.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div 
                  className="w-20 h-20 bg-cover bg-center rounded"
                  style={{ backgroundImage: `url(${item.thumbnail})` }}
                />
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p>${item.price} x {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={clearCart}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}