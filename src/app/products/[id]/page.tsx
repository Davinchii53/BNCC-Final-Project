import { fetchProduct, Product } from '@/lib/api';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/products');
  const { products } = await res.json();
  
  return products.map((product: Product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const product = await fetchProduct(params.id);

  if (!product) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p>The requested product does not exist</p>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}