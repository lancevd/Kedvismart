"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useParams } from 'next/navigation';

const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id;

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '', description: '', image: '' },
  });

  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch(`/api/categories/${categoryId}`);
        if (!res.ok) throw new Error('Failed to fetch category');
        const data = await res.json();
        reset({
          name: data.name,
          description: data.description || '',
          image: data.image || '',
        });
        if (data.image) setPreviewUrl(data.image);
      } catch (err) {
        console.error(err);
        alert('Failed to load category');
        router.push('/admin/categories');
      } finally {
        setLoading(false);
      }
    }
    if (categoryId) fetchCategory();
  }, [categoryId, reset, router]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = { ...data };
      if (!payload.image) delete payload.image;
      const res = await fetch(`/api/categories/${categoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update category');
      router.push('/admin/categories');
    } catch (err) {
      console.error(err);
      alert('Error updating category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const uploadRes = await fetch('/api/cloudinary-upload', { method: 'POST', body: formData });
      if (!uploadRes.ok) throw new Error('Upload failed');
      const result = await uploadRes.json();
      setPreviewUrl(result.url);
      setValue('image', result.url);
    } catch (err) {
      console.error(err);
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input {...register('name')} className={`border p-2 w-full rounded ${errors.name ? 'border-red-500' : ''}`} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea {...register('description')} className="border p-2 w-full rounded h-24" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
          <input type="text" {...register('image')} className={`border p-2 w-full rounded ${errors.image ? 'border-red-500' : ''}`} />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          {previewUrl && <img src={previewUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover border rounded" />}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Or upload image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
        </div>
        <div className="flex items-center gap-4 pt-2">
          <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {submitting ? 'Saving...' : 'Update Category'}
          </button>
          <button type="button" onClick={() => router.push('/admin/categories')} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
