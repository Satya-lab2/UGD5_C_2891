'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Game1 from "../../components/Game1";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');

    // 🔒 PROTECT PAGE
    if (!isLogin) {
      router.push('/auth/login');
    }
  }, [router]);

  // 🔓 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('userEmail');
    router.push('/auth/login');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen'>

      {/* HEADER */}
      <h1 className='text-4xl font-bold mb-4 text-white'>
        Selamat Datang!
      </h1>

      {/* GAME */}
      <Game1 />

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>
  );
}