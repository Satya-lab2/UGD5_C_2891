'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthFormWrapper from '../../../components/AuthFromWrapper';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash, FaSyncAlt } from 'react-icons/fa';
import SocialAuth from '../../../components/SocialAuth';

type FormData = {
  username: string;
  email: string;
  nomorTelp: string;
  password: string;
  confirmPassword: string;
  captcha: string;
};

const generateCaptcha = () =>
  Math.random().toString(36).substring(2, 8);

const RegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [captcha, setCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const password = watch('password', '');

  const strength = Math.min(
    (password.length > 7 ? 25 : 0) +
    (/[A-Z]/.test(password) ? 25 : 0) +
    (/[0-9]/.test(password) ? 25 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 25 : 0)
  );

  const getColor = () => {
    if (strength < 50) return 'bg-red-500';
    if (strength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const onSubmit = (data: FormData) => {
    if (data.captcha !== captcha) {
      toast.error('Captcha salah');
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error('Password tidak cocok');
      return;
    }

    toast.success('Register Berhasil!');
    router.push('/auth/login');
  };

  return (
    <AuthFormWrapper title="Register">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Username <span className="text-gray-500 text-xs">(max 8 karakter)</span>
          </label>
          <input
            {...register('username', {
              required: 'Username wajib diisi',
              maxLength: { value: 8, message: 'Max 8 karakter' }
            })}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan username"
          />
          {errors.username && (
            <p className="text-red-600 text-sm italic">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            {...register('email', {
              required: 'Email wajib diisi',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.(com|net|co)$/,
                message: 'Format email tidak valid'
              }
            })}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm italic">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input
            {...register('nomorTelp', {
              required: 'Nomor wajib diisi',
              minLength: { value: 10, message: 'Minimal 10 digit' }
            })}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
            }}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.nomorTelp ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan nomor telepon"
          />
          {errors.nomorTelp && (
            <p className="text-red-600 text-sm italic">{errors.nomorTelp.message}</p>
          )}
        </div>

        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-700">Password</label>

          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Password wajib diisi' })}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan password"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

          <div className="w-full h-2 bg-gray-200 rounded mt-2">
            <div
              className={`h-2 rounded ${getColor()}`}
              style={{ width: `${strength}%` }}
            />
          </div>

          <p className="text-sm text-gray-600">Strength: {strength}%</p>
        </div>

        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-700">Konfirmasi Password</label>

          <input
            type={showConfirm ? 'text' : 'password'}
            {...register('confirmPassword')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300"
            placeholder="Masukkan ulang password"
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>

          <div className="w-full h-2 bg-gray-200 rounded mt-2">
            <div
              className={`h-2 rounded ${getColor()}`}
              style={{ width: `${strength}%` }}
            />
          </div>

          <p className="text-sm text-gray-600">Strength: {strength}%</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">Captcha:</span>

            <span className="font-mono text-lg font-bold text-gray-800 bg-gray-100 px-3 py-1.5 rounded">
              {captcha || '------'}
            </span>

            <button
              type="button"
              onClick={() => setCaptcha(generateCaptcha())}
              className="text-blue-600 hover:text-blue-800"
            >
              <FaSyncAlt />
            </button>
          </div>

          <input
            {...register('captcha')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300"
            placeholder="Masukkan captcha"
          />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg">
          Register
        </button>

        <SocialAuth />

        <p className="text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link href="/auth/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>

      </form>
    </AuthFormWrapper>
  );
};

export default RegisterPage;