"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import Spinner from '@/components/Spinner';
import Gallery from '@/components/productDetails/Gallery';
import ProductInfo from '@/components/productDetails/ProductInfo';
import TabComponent from '@/components/productDetails/TabComponent';
import Reviews from '@/components/productDetails/Reviews';
import RelatedProducts from '@/components/productDetails/RelatedProducts';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/slug/${slug}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
        // Store the product _id in the itemID cookie so the voice widget can "add to cart"
        setCookie('itemID', data._id, { maxAge: 60 * 60 * 24 });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="contain py-20 text-center">
        <h2 className="text-2xl font-semibold text-gray-500">Product not found</h2>
        <button
          onClick={() => router.push('/shop')}
          className="mt-4 px-6 py-2 bg-black text-white rounded-2xl"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  // Normalise product data to match existing component prop shapes
  const imageList = product.images?.length > 0 ? product.images : ['/images/black jeans.png'];

  return (
    <main className="contain py-10 space-y-12">
      {/* Gallery + Info */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <Gallery images={imageList} />
        </div>
        <div className="lg:w-1/2">
          <ProductInfo
            name={product.name}
            price={product.price / 100}
            description={product.description}
            productId={product._id}
          />
        </div>
      </div>

      {/* Tabs: Details / Reviews / FAQs */}
      <TabComponent description={product.description} />

      {/* Reviews */}
      <Reviews />

      {/* Related products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <RelatedProducts products={product.relatedProducts} />
      )}
    </main>
  );
}
