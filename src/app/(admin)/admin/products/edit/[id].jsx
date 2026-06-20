"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useParams } from 'next/navigation';

const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().positive('Price must be positive'),
  category: z.string().min(1, 'Please select a category'),
  stock: z.coerce.number().nonnegative('Stock cannot be negative'),
  isActive: z.boolean().default(true),
});

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('/api/categories'),
          fetch(`/api/products/${productId}`),
        ]);
        if (!catRes.ok) throw new Error('Failed to fetch categories');
        if (!prodRes.ok) throw new Error('Failed to fetch product');
        const [catData, prodData] = await Promise.all([catRes.json(), prodRes.json()]);
        setCategories(catData);
        setImageUrls(prodData.images || []);
        reset({
          name: prodData.name,
          slug: prodData.slug,
          description: prodData.description,
          price: (prodData.price / 100).toFixed(2),
          category: prodData.category?._id?.toString() || '',
          stock: prodData.stock,
          isActive: prodData.isActive,
        });
      } catch (err) {
        console.error(err);
        alert('Failed to load product');
        router.push('/admin/products');
      } finally {
        setLoading(false);
      }
    }
    if (productId) fetchData();
  }, [productId, reset, router]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, images: imageUrls }),
      });
      if (!res.ok) throw new Error('Failed to update product');
      router.push('/admin/products');
    } catch (err) {
      console.error(err);
      alert('Error updating product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input {...register('name')} className={`border p-2 w-full rounded ${errors.name ? 'border-red-500' : ''}`} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input {...register('slug')} className={`border p-2 w-full rounded ${errors.slug ? 'border-red-500' : ''}`} />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea {...register('description')} className={`border p-2 w-full rounded h-32 ${errors.description ? 'border-red-500' : ''}`} />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price (NGN)</label>
          <input type="number" step="0.01" {...register('price')} className={`border p-2 w-full rounded ${errors.price ? 'border-red-500' : ''}`} />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select {...register('category')} className={`border p-2 w-full rounded ${errors.category ? 'border-red-500' : ''}`}>
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input type="number" {...register('stock')} className={`border p-2 w-full rounded ${errors.stock ? 'border-red-500' : ''}`} />
          {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('isActive')} className="h-4 w-4" id="isActive" />
          <label htmlFor="isActive" className="text-sm font-medium">Active</label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URLs (one per line)</label>
          <textarea
            value={imageUrls.join('\n')}
            onChange={(e) => {
              const urls = e.target.value.split(/\r?\n/).map((u) => u.trim()).filter((u) => u.length > 0);
              setImageUrls(urls);
            }}
            className="border p-2 w-full rounded h-24"
            placeholder="Enter one image URL per line"
          />
        </div>
        {imageUrls.length > 0 && (
          <div className="flex gap-4 flex-wrap">
            {imageUrls.map((url, idx) => (
              <img key={idx} src={url} alt={`Preview ${idx}`} className="w-24 h-24 object-cover border rounded" />
            ))}
          </div>
        )}
        <div className="flex items-center gap-4 pt-2">
          <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {submitting ? 'Saving...' : 'Update Product'}
          </button>
          <button type="button" onClick={() => router.push('/admin/products')} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
