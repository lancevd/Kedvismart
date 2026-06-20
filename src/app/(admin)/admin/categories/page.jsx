'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminCategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link href="/admin/categories/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Category
        </Link>
      </div>
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c._id} className="border-t">
                <td className="p-4">{c._id}</td>
                <td className="p-4">{c.name}</td>
                <td className="p-4">{c.description || '-'}</td>
                <td className="p-4 space-x-2">
                  <Link href={`/admin/categories/edit/${c._id}`} className="text-blue-600 hover:underline">Edit</Link>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete category?')) {
                        fetch(`/api/categories/${c._id}`, { method: 'DELETE' })
                          .then(res => {
                            if (res.ok) {
                              setCategories(categories.filter(cat => cat._id !== c._id));
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
