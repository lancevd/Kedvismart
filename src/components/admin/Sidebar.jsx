"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  TbLayoutDashboard, 
  TbBox, 
  TbCategory, 
  TbShoppingCart, 
  TbUsers, 
  TbSettings,
  TbArrowLeft
} from 'react-icons/tb';

const menuItems = [
  { name: 'Dashboard', icon: TbLayoutDashboard, href: '/admin' },
  { name: 'Products', icon: TbBox, href: '/admin/products' },
  { name: 'Categories', icon: TbCategory, href: '/admin/categories' },
  { name: 'Orders', icon: TbShoppingCart, href: '/admin/orders' },
  { name: 'Customers', icon: TbUsers, href: '/admin/customers' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 h-screen fixed left-0 top-0 hidden lg:flex flex-col border-r border-slate-800 z-50">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 text-white font-extrabold text-xl tracking-tighter">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm">K</div>
          K.MART <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-normal">ADMIN</span>
        </Link>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-1">
        <p className="text-[10px] uppercase font-bold text-slate-500 mb-4 ml-2 tracking-widest">Main Menu</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`text-xl ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
              <span className="font-semibold text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-800/50 rounded-2xl p-4 mb-4 border border-slate-800">
          <p className="text-xs font-bold text-white mb-1">Need help?</p>
          <p className="text-[10px] text-slate-400">Check our documentation for advanced features.</p>
          <button className="mt-3 w-full bg-slate-700 text-white text-xs py-2 rounded-lg hover:bg-slate-600 transition-colors">Docs</button>
        </div>
        
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <TbArrowLeft /> Back to Shop
        </Link>
      </div>
    </aside>
  );
}
