import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-2xl" id="product-count">-</p>
          <Link href="/admin/products" className="mt-2 block text-blue-600 hover:underline">
            Manage Products
          </Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Categories</h2>
          <p className="text-2xl" id="category-count">-</p>
          <Link href="/admin/categories" className="mt-2 block text-blue-600 hover:underline">
            Manage Categories
          </Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-2xl" id="user-count">-</p>
          <Link href="/admin/users" className="mt-2 block text-blue-600 hover:underline">
            Manage Users
          </Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="text-2xl" id="order-count">-</p>
          <Link href="/admin/orders" className="mt-2 block text-blue-600 hover:underline">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
