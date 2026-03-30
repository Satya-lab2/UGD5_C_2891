'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthFormWrapper from '../../../components/AuthFromWrapper';
import SocialAuth from '../../../components/SocialAuth';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaSyncAlt } from 'react-icons/fa';

const generateCaptcha = () =>
  Math.random().toString(36).substring(2, 8);

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captchaInput: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<any>({});
  const [attempts, setAttempts] = useState(3);
  const [captcha, setCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    setErrors((prev: any) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let newErrors: any = {};

    const emailRegex = /^[0-9]{9}@gmail\.com$/;
    if (!formData.email) {
      newErrors.email = 'Email tidak boleh kosong';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email harus sesuai format NPM (cth: 220711905@gmail.com)';
    }

    const npmRegex = /^[0-9]{9}$/;
    if (!formData.password) {
      newErrors.password = 'Password tidak boleh kosong';
    } else if (!npmRegex.test(formData.password)) {
      newErrors.password = 'Password harus berupa NPM (angka saja)';
    }

    if (formData.captchaInput !== captcha) {
      newErrors.captcha = 'Captcha salah';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      if (attempts > 0) {
        setAttempts(prev => prev - 1);
        toast.error(`Login Gagal! Sisa kesempatan: ${attempts - 1}`);
      }

      return;
    }

    if (formData.rememberMe) {
      localStorage.setItem('userEmail', formData.email);
    }

    localStorage.setItem('isLogin', 'true');

    toast.success('Login Berhasil!');
    router.push('/home');
  };

  return (
    <AuthFormWrapper title="Login">
      <form onSubmit={handleSubmit} className="space-y-5 w-full">

        <p className="text-center font-semibold">
          Sisa Kesempatan: {attempts}
        </p>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukan email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm italic">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-700">Password</label>

          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukan password"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

          {errors.password && (
            <p className="text-red-600 text-sm italic">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              name="rememberMe"
              onChange={handleChange}
              className="mr-2 h-4 w-4"
            />
            Ingat Saya
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span>Captcha:</span>

            <span className="bg-gray-100 px-3 py-1.5 rounded font-bold">
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
            name="captchaInput"
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.captcha ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukan captcha"
          />

          {errors.captcha && (
            <p className="text-red-600 text-sm italic">{errors.captcha}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={attempts === 0}
          className={`w-full py-2.5 rounded-lg text-white ${
            attempts === 0
              ? 'bg-gray-400'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Sign In
        </button>

        <button
          type="button"
          disabled={attempts !== 0}
          onClick={() => setAttempts(3)}
          className={`w-full py-2.5 rounded-lg ${
            attempts === 0
              ? 'bg-green-500 text-white'
              : 'bg-gray-300 text-gray-500'
          }`}
        >
          Reset Kesempatan
        </button>

        <SocialAuth />

        <p className="text-center text-sm">
          Tidak punya akun?{' '}
          <Link href="/auth/register" className="text-blue-600">
            Daftar
          </Link>
        </p>

      </form>
    </AuthFormWrapper>
  );
};

export default LoginPage;