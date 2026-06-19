import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  category: z.string().min(1),
  images: z.array(z.string().url()).min(1, 'At least one image required'),
  stock: z.number().nonnegative(),
  isActive: z.boolean().default(true),
});

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
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

  // Fetch categories and product on mount
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const catRes = await fetch('/api/categories');
        if (!catRes.ok) throw new Error('Failed to fetch categories');
        const catData = await catRes.json();
        setCategories(catData);

        // Fetch product
        const prodRes = await fetch(`/api/products/${productId}`);
        if (!prodRes.ok) throw new Error('Failed to fetch product');
        const prodData = await prodRes.json();
        // Convert price from kobo to NGN for display
        setProduct(prodData);
        reset({
          name: prodData.name,
          slug: prodData.slug,
          description: prodData.description,
          price: (prodData.price / 100).toFixed(2),
          category: prodData.category?._id?.toString() || '',
          images: prodData.images || [],
          stock: prodData.stock,
          isActive: prodData.isActive,
        });
      } catch (err) {
        console.error(err);
        alert('Failed to load product');
        router.push('/admin/products');
      } finally {
        setLoading(false);
        setLoadingCats(false);
      }
    }
    fetchData();
  }, [productId, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          price: Math.round(parseFloat(data.price) * 100), // convert to kobo
          category: data.category, // expecting ObjectId string
        }),
      });
      if (!res.ok) throw new Error('Failed to update product');
      router.push('/admin/products');
    } catch (err) {
      console.error(err);
      alert('Error updating product');
    }
  };

  // Simple image URL input (for demo)
  const [imageUrls, setImageUrls] = useState([]);
  const addImageUrl = (url) => {
    setImageUrls(prev => [...prev, url]);
  };

  // Sync form images with imageUrls state when form changes
  useEffect(() => {
    const imgs = watch('images');
    if (imgs) setImageUrls(imgs);
  }, [watch]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {uploading ? 'Saving...' : 'Update Product'}
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
