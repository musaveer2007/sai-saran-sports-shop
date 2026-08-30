import { Construction } from 'lucide-react';

export function PlaceholderAdmin({ title }) {
  return (
    <div className="max-w-7xl mx-auto space-y-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
        <Construction size={40} className="text-indigo-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">{title} Management</h1>
      <p className="text-gray-500 max-w-md">
        This module is currently under development. The full feature set for {title} will be available in the next major update.
      </p>
    </div>
  );
}
