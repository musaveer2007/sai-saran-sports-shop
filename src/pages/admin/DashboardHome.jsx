import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { 
  Package, ShoppingBag, Users, DollarSign, 
  TrendingUp, ArrowUpRight, Plus, Image as ImageIcon, 
  Tag, Layers 
} from 'lucide-react';

export function DashboardHome() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStock: 0,
    lowStock: 0,
    ordersToday: 12, // Dummy data for now
    revenue: 45200, // Dummy data for now
    visitors: 1250 // Dummy data for now
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data: products } = await supabase.from('ss_products').select('*');
      
      if (products) {
        setStats(prev => ({
          ...prev,
          totalProducts: products.length,
          inStock: products.filter(p => p.status === 'published').length, // basic approx
          lowStock: 0 // wait for stock field
        }));
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
          <Icon size={20} />
        </div>
        {trend && (
          <div className="flex items-center text-emerald-600 text-sm font-medium bg-emerald-50 px-2 py-1 rounded-full">
            <TrendingUp size={14} className="mr-1" />
            {trend}
          </div>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  const QuickAction = ({ icon: Icon, label, desc, to, colorClass }) => (
    <Link to={to} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-indigo-100 hover:shadow-md transition-all group">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${colorClass} group-hover:scale-105 transition-transform`}>
        <Icon size={24} />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{label}</h4>
        <p className="text-sm text-gray-500 leading-snug">{desc}</p>
      </div>
    </Link>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`₹${stats.revenue.toLocaleString()}`} 
          icon={DollarSign} 
          trend="+12.5%" 
          colorClass="bg-indigo-50 text-indigo-600"
        />
        <StatCard 
          title="Orders Today" 
          value={stats.ordersToday} 
          icon={ShoppingBag} 
          trend="+5.2%" 
          colorClass="bg-sky-50 text-sky-600"
        />
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon={Package} 
          colorClass="bg-emerald-50 text-emerald-600"
        />
        <StatCard 
          title="Active Visitors" 
          value={stats.visitors} 
          icon={Users} 
          trend="+18.1%" 
          colorClass="bg-amber-50 text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center gap-1">
              View all <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="flex items-center justify-center h-64 text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
            Activity chart will be displayed here
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <QuickAction 
                icon={Plus} 
                label="Add New Product" 
                desc="Create a new product listing in your store." 
                to="/admin/products/new"
                colorClass="bg-indigo-50 text-indigo-600"
              />
              <QuickAction 
                icon={ImageIcon} 
                label="Upload Banner" 
                desc="Update the homepage hero banner." 
                to="/admin/banners"
                colorClass="bg-fuchsia-50 text-fuchsia-600"
              />
              <QuickAction 
                icon={Tag} 
                label="Create Offer" 
                desc="Set up a new discount or sale." 
                to="/admin/offers"
                colorClass="bg-rose-50 text-rose-600"
              />
              <QuickAction 
                icon={Layers} 
                label="Manage Categories" 
                desc="Organize your product hierarchy." 
                to="/admin/categories"
                colorClass="bg-emerald-50 text-emerald-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
