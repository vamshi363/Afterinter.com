
import React from 'react';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <h1 className="text-3xl font-bold mb-4">Join After Inter</h1>
        <p className="text-slate-500 mb-8">Save your favorite colleges and track applications.</p>
        <button className="bg-primary-teal text-white px-12 py-4 rounded-2xl font-bold shadow-lg">Sign In with Google</button>
    </div>
  );
}
