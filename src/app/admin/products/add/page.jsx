import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  category: z.string().min(1), // expecting ObjectId as string
  images: z.array(z.string().url()).min(1, 'At least one image required'),
  stock: z.number().nonnegative(),
  isActive: z.boolean().default(true),
});

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    resolver: z => productSchema.parse(z),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      price: '',
      category: '',
      images: [],
      stock: 0,
      isActive: true,
    },
  });

  // Fetch categories on mount
  React.useEffect(() => {
    async function fetchCats() {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCats(false);
      }
    }
    fetchCats();
  }, []);

  const onSubmit = async (data) => {
    // Handle image uploads (if any are File objects; but we expect URLs from preview)
    // For simplicity, assume images are already URLs (user pastes URLs) or we have a separate upload component.
    // We'll skip actual file upload here; in a real app you'd integrate an upload widget.
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          price: Math.round(parseFloat(data.price) * 100), // convert to kobo
          category: data.category, // expecting ObjectId string
        }),
      });
      if (!res.ok) throw new Error('Failed to create product');
      router.push('/admin/products');
    } catch (err) {
      console.error(err);
      alert('Error creating product');
    }
  };

  // Simple image URL input (for demo)
  const [imageUrls, setImageUrls] = useState([]);
  const addImageUrl = (url) => {
    setImageUrls(prev => [...prev, url]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input {...register('name')} className="border p-2 w-full rounded ${errors.name ? 'border-red-500' : ''}" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Slug</label>
          <input {...register('slug')} className="border p-2 w-full rounded ${errors.slug ? 'border-red-500' : ''}" />
          {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea {...register('description')} className="border p-2 w-full rounded h-32 ${errors.description ? 'border-red-500' : ''}" />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Price (NGN)</label>
          <input type="number" step="0.01" {...register('price')} className="border p-2 w-full rounded ${errors.price ? 'border-red-500' : ''}" />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select {...register('category')} className="border p-2 w-full rounded ${errors.category ? 'border-red-500' : ''}">
            <option value="">Select category</option>
            {loadingCats ? (
              <option>Loading...</option>
            ) : (
              categories.map(c => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))
            )}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Stock</label>
          <input type="number" {...register('stock')} className="border p-2 w-full rounded ${errors.stock ? 'border-red-500' : ''}" />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Active</label>
          <input type="checkbox" {...register('isActive')} className="h-4 w-4" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Image URLs (comma separated or one per line)</label>
          <textarea
            value={imageUrls.join('\n')}
            onChange={e => {
              const urls = e.target.value
                .split(/\r?\n/)
                .map(u => u.trim())
                .filter(u => u.length > 0);
              setImageUrls(urls);
            }}
            className="border p-2 w-full rounded h-24"
            placeholder="Enter one image URL per line"
          />
        </div>
        {imageUrls.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Preview:</h3>
            <div className="flex gap-4">
              {imageUrls.map((url, idx) => (
                <img key={idx} src={url} alt={`Product ${idx}`} className="w-32 h-32 object-cover border" />
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center">
          <button
            type="submit"
            disabled={uploading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {uploading ? 'Saving...' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
