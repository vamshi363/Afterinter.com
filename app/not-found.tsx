
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-4xl font-black mb-4">Page Not Found</h2>
      <p className="text-slate-500 mb-8">Could not find requested resource</p>
      <Link href="/" className="bg-primary-teal text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
        <Home size={20} /> Return Home
      </Link>
    </div>
  );
}