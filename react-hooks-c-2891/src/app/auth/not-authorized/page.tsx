'use client';

import { useRouter } from 'next/navigation';

export default function NotAuthorized() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 to-red-600">
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center max-w-md w-full">

        <h1 className="text-2xl font-bold text-gray-800">
          🚫 Akses Ditolak!
        </h1>

        <p className="text-gray-700 mt-2 text-sm">
          Kamu harus login terlebih dahulu untuk mengakses halaman ini.
        </p>

        <button
          onClick={() => router.replace('/auth/login')}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          ← Kembali ke Login
        </button>

      </div>
    </div>
  );
}