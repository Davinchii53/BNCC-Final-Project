"use client";
import { useProducts } from '@/contexts/ProductContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';
import { SearchAndFilter } from '@/components/SearchAndFilter';

export default function Home() {
  const { products, loading, error } = useProducts();
  const { theme } = useTheme();

  if (loading) return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-900 text-white' : 'bg-white'}`}>
      <Navbar />
      <div className="container mx-auto px-4 py-8 text-center">Loading...</div>
    </div>
  );

  if (error) return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-900 text-white' : 'bg-white'}`}>
      <Navbar />
      <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-dark-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header dengan gradien yang responsive terhadap theme */}
        <div className={`mb-8 p-6 rounded-xl ${theme === 'dark' 
          ? 'bg-gradient-to-br from-dark-800 to-dark-700' 
          : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            Selamat Datang
          </h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Temukan produk terbaik dengan harga spesial
          </p>
        </div>

        <SearchAndFilter />

        {/* Product Grid dengan efek hover yang berbeda untuk dark/light mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              className={`transition-all duration-300 ${
                theme === 'dark'
                  ? 'hover:shadow-lg hover:shadow-blue-900/20'
                  : 'hover:shadow-md hover:shadow-blue-500/10'
              }`}
            />
          ))}
        </div>

        {/* Bagian rekomendasi */}
        <section className="mt-12">
          <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Rekomendasi Untuk Anda
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product) => (
              <div 
                key={`rec-${product.id}`}
                className={`p-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-dark-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <p className={`font-medium ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {product.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}