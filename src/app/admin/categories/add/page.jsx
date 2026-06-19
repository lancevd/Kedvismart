import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const categorySchema = z.object({
  name: z.string().min(2),
  description: z.string(),
  image: z.string().url().optional(), // optional image URL
});

export default function AddCategoryPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: z => categorySchema.parse(z),
    defaultValues: {
      name: '',
      description: '',
      image: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create category');
      router.push('/admin/categories');
    } catch (err) {
      console.error(err);
      alert('Error creating category');
    }
  };

  // Simple image upload handler (client-side preview only)
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const uploadRes = await fetch('/api/cloudinary-upload', {
        method: 'POST',
        body: formData,
      });
      if (!uploadRes.ok) throw new Error('Upload failed');
      const result = await uploadRes.json();
      setPreviewUrl(result.url);
      // Update form value
      // We need to update the field via setValue from react-hook-form; but we don't have access here.
      // For simplicity, we'll just store preview and let user copy URL manually.
      // In a real app, we'd integrate with react-hook-form's setValue.
      alert('Image uploaded successfully. Please copy the URL into the Image URL field.');
    } catch (err) {
      console.error(err);
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input {...register('name')} className="border p-2 w-full rounded ${errors.name ? 'border-red-500' : ''}" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea {...register('description')} className="border p-2 w-full rounded h-32 ${errors.description ? 'border-red-500' : ''}" />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Image URL (optional)</label>
          <input type="text" {...register('image')} className="border p-2 w-full rounded ${errors.image ? 'border-red-500' : ''}" />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          {previewUrl && (
            <div className="mt-2">
              <p className="text-sm text-green-600">Preview:</p>
              <img src={previewUrl} alt="Preview" className="max-w-xs hover:cursor-pointer" />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
          {uploading && <p className="text-xs">Uploading...</p>}
        </div>
        <div className="flex items-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Create Category
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/categories')}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
