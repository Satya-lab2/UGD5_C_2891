'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Game1 from "../../components/Game1";
import Game2 from "../../components/Game2";
import { FaPowerOff } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLogin');
    setIsLogin(!!loginStatus);
  }, []);

  useEffect(() => {
    if (isLogin === false) {
      router.replace('/auth/notauthorized');
    }
  }, [isLogin, router]);

  if (isLogin === null) return null;

  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    router.replace('/auth/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">

      <h1 className="text-4xl font-bold mb-3">
        Selamat Datang!
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 p-3 rounded-full mb-6"
      >
        <FaPowerOff />
      </button>

      {!selectedGame && (
        <div className="bg-black/80 p-10 rounded-2xl text-center shadow-xl backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-6">
            Choose Your Game
          </h2>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setSelectedGame('game1')}
              className="px-6 py-3 rounded-lg font-semibold 
              bg-gradient-to-r from-orange-400 to-orange-600 
              border-2 border-orange-300 
              shadow-lg hover:scale-105 transition"
            >
              Tap The Mole 🐭
            </button>

            <button
              onClick={() => setSelectedGame('game2')}
              className="px-6 py-3 rounded-lg font-semibold 
              bg-gradient-to-r from-green-400 to-green-600 
              border-2 border-green-300 
              shadow-lg hover:scale-105 transition"
            >
              Catching The Stars ⭐
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-300">
            Pick one to start playing!
          </p>
        </div>
      )}

      {selectedGame === 'game1' && (
        <div className="bg-black/80 p-10 rounded-2xl text-center shadow-xl backdrop-blur-md">
          <Game1 />

          <button
            onClick={() => setSelectedGame(null)}
            className="mt-5 bg-gray-300 text-black px-4 py-2 rounded"
          >
            ← Kembali
          </button>
        </div>
      )}

      {selectedGame === 'game2' && (
        <div className="bg-black/80 p-10 rounded-2xl text-center shadow-xl backdrop-blur-md">
          <Game2 />

          <button
            onClick={() => setSelectedGame(null)}
            className="mt-5 bg-gray-300 text-black px-4 py-2 rounded"
          >
            ← Kembali
          </button>
        </div>
      )}

    </div>
  );
}