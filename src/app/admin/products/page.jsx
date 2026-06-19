import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Product
        </Link>
      </div>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-t">
                <td className="p-4">{p._id}</td>
                <td className="p-4">{p.name}</td>
                <td className="p-4">{p.category?.name || 'N/A'}</td>
                <td className="p-4">${(p.price / 100).toFixed(2)}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4 space-x-2">
                  <Link href={`/admin/products/edit/${p._id}`} className="text-blue-600 hover:underline">Edit</Link>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete product?')) {
                        fetch(`/api/products/${p._id}`, { method: 'DELETE' })
                          .then(res => {
                            if (res.ok) {
                              setProducts(products.filter(prod => prod._id !== p._id));
                            } else {
                              alert('Failed to delete');
                            }
                          });
                      }
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
