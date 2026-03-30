'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Game1 from "../../components/Game1";

export default function Home() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLogin');
    setIsLogin(!!loginStatus);
  }, []);

  // ⏳ loading dulu biar ga flicker
  if (isLogin === null) return null;

  // ❌ BELUM LOGIN → TAMPILKAN HALAMAN KHUSUS
  if (!isLogin) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-400 to-blue-600">
        <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center max-w-md w-full">

          {/* IMAGE */}
          <img
            src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
            alt="not login"
            className="rounded-xl mb-4 w-full h-40 object-cover"
          />

          {/* TEXT */}
          <h2 className="text-xl font-bold text-gray-800">
            ❌ Anda belum login
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Silakan login terlebih dahulu
          </p>

          {/* BUTTON */}
          <button
            onClick={() => router.push('/auth/login')}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            ← Kembali
          </button>
        </div>
      </div>
    );
  }

  // ✅ SUDAH LOGIN → HALAMAN NORMAL
  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen'>
      <h1 className='text-4xl font-bold mb-4 text-white'>
        Selamat Datang!
      </h1>

      <Game1 />

      <button
        onClick={() => {
          localStorage.removeItem('isLogin');
          router.push('/auth/login');
        }}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}