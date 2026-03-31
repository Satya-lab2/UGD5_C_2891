'use client';
import { useRouter } from 'next/navigation';
export default function NotAuthorized() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center max-w-md w-full">
        <img
          src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
          alt="funny gif"
          className="w-full h-40 object-cover rounded-xl mb-4"
        />
        <h2 className="text-xl font-bold text-gray-800">
          ❌ Anda belum login
        </h2>
        <p className="text-gray-600 mt-2 text-sm">
          Silakan login terlebih dahulu
        </p>
        <button
          onClick={() => router.replace('/auth/login')}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center justify-center gap-2 mx-auto"
        >
          ← Kembali
        </button>
      </div>
    </div>
  );
}