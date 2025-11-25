'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Shield, User, UserCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onDemoLogin?: (email: string, password: string) => void;
  onRegister: () => void;
  onForgotPassword: () => void;
}

export function Login({ onLogin, onDemoLogin, onRegister, onForgotPassword }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1976D2] rounded-2xl mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 8 12 Q 8 6, 16 6 Q 24 6, 24 12 L 22 22 Q 22 26, 16 26 Q 10 26, 10 22 Z"
                fill="white"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">DentalSys</h1>
          <p className="text-gray-600">Sistema Odontológico Integral</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Iniciar Sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 h-12 ${errors.email ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 pr-10 h-12 ${errors.password ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Recordarme
                </label>
              </div>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-[#1976D2] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 bg-[#1976D2] hover:bg-[#0D47A1]">
              Iniciar Sesión
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">O</span>
            </div>
          </div>

          {/* Register Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12"
            onClick={onRegister}
          >
            Registrarse como Paciente
          </Button>
        </div>

        {/* Demo Access Section */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-4 text-center">
            Acceso Demo (Solo para Pruebas)
          </p>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="h-12 flex flex-col items-center justify-center gap-1"
              onClick={() => (onDemoLogin || onLogin)('superadmin@demo.com', 'demo')}
            >
              <Shield className="w-5 h-5" />
              <span className="text-xs">Superadmin</span>
            </Button>
            <Button
              variant="outline"
              className="h-12 flex flex-col items-center justify-center gap-1"
              onClick={() => (onDemoLogin || onLogin)('doctor@demo.com', 'demo')}
            >
              <User className="w-5 h-5" />
              <span className="text-xs">Doctor</span>
            </Button>
            <Button
              variant="outline"
              className="h-12 flex flex-col items-center justify-center gap-1"
              onClick={() => (onDemoLogin || onLogin)('paciente@demo.com', 'demo')}
            >
              <UserCircle className="w-5 h-5" />
              <span className="text-xs">Paciente</span>
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Estos accesos son solo para visualización y pruebas del sistema
          </p>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center space-x-4 text-sm text-gray-600">
          <a href="#" className="hover:text-[#1976D2]">
            Términos
          </a>
          <span>•</span>
          <a href="#" className="hover:text-[#1976D2]">
            Privacidad
          </a>
          <span>•</span>
          <a href="#" className="hover:text-[#1976D2]">
            Soporte
          </a>
        </div>
      </div>
    </div>
  );
}