"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export default function AddCategoryPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '', description: '', image: '' },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = { ...data };
      if (!payload.image) delete payload.image;
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create category');
      router.push('/admin/categories');
    } catch (err) {
      console.error(err);
      alert('Error creating category');
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

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Add Category</h1>
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
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Or upload image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
          {previewUrl && <img src={previewUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover border rounded" />}
        </div>
        <div className="flex items-center gap-4 pt-2">
          <button type="submit" disabled={submitting} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50">
            {submitting ? 'Saving...' : 'Create Category'}
          </button>
          <button type="button" onClick={() => router.push('/admin/categories')} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
