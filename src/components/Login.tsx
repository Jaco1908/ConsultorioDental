/**
 * COMPONENTE DE LOGIN
 *
 * Pantalla de inicio de sesión del sistema DentalSys
 * Características:
 * - Login normal con email y contraseña
 * - Accesos demo rápidos para superadmin, doctor y paciente
 * - Validación de formulario
 * - Opción "Recordarme"
 * - Enlaces a registro y recuperación de contraseña
 */

'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Shield, User, UserCircle } from 'lucide-react';

/**
 * PROPS DEL COMPONENTE LOGIN
 */
interface LoginProps {
  onLogin: (email: string, password: string) => void;           // Función que se ejecuta al hacer login normal
  onDemoLogin?: (email: string, password: string) => void;      // Función para login demo (opcional)
  onRegister: () => void;                                       // Función para ir a registro
  onForgotPassword: () => void;                                 // Función para recuperar contraseña
}

export function Login({ onLogin, onDemoLogin, onRegister, onForgotPassword }: LoginProps) {
  // ESTADOS DEL FORMULARIO
  const [email, setEmail] = useState('');                       // Email ingresado
  const [password, setPassword] = useState('');                 // Contraseña ingresada
  const [showPassword, setShowPassword] = useState(false);      // Mostrar/ocultar contraseña
  const [rememberMe, setRememberMe] = useState(false);          // Checkbox "Recordarme"
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({}); // Errores de validación

  /**
   * FUNCIÓN DE VALIDACIÓN DEL FORMULARIO
   * Valida que el email sea válido y la contraseña tenga al menos 6 caracteres
   * @returns true si el formulario es válido, false si hay errores
   */
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Validar email
    if (!email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    // Validar contraseña
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * MANEJADOR DE ENVÍO DEL FORMULARIO
   * Se ejecuta cuando se presiona el botón "Iniciar Sesión"
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin(email, password);
    }
  };

  /**
   * RENDERIZADO DEL COMPONENTE
   * Estructura:
   * 1. Logo y título
   * 2. Card de login con formulario
   * 3. Botón de registro
   * 4. Accesos demo
   * 5. Links de pie de página
   */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md">
        {/* SECCIÓN 1: LOGO Y HEADER */}
        <div className="text-center mb-8">
          {/* Logo dental SVG */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1976D2] rounded-2xl mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Forma de diente simplificada */}
              <path
                d="M 8 12 Q 8 6, 16 6 Q 24 6, 24 12 L 22 22 Q 22 26, 16 26 Q 10 26, 10 22 Z"
                fill="white"
              />
            </svg>
          </div>
          {/* Título y subtítulo */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">DentalSys</h1>
          <p className="text-gray-600">Sistema Odontológico Integral</p>
        </div>

        {/* SECCIÓN 2: CARD DE LOGIN */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Iniciar Sesión</h2>

          {/* FORMULARIO DE LOGIN */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo de Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                {/* Icono de email */}
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
              {/* Mensaje de error de email */}
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Campo de Contraseña */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                {/* Icono de candado */}
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}  // Cambia entre text y password
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 pr-10 h-12 ${errors.password ? 'border-red-500' : ''}`}
                />
                {/* Botón para mostrar/ocultar contraseña */}
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
              {/* Mensaje de error de contraseña */}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Recordarme y Olvidé mi contraseña */}
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

            {/* Botón de Submit */}
            <Button type="submit" className="w-full h-12 bg-[#1976D2] hover:bg-[#0D47A1]">
              Iniciar Sesión
            </Button>
          </form>

          {/* Divisor "O" */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">O</span>
            </div>
          </div>

          {/* SECCIÓN 3: BOTÓN DE REGISTRO */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12"
            onClick={onRegister}
          >
            Registrarse como Paciente
          </Button>
        </div>

        {/* SECCIÓN 4: ACCESOS DEMO */}
        {/* Botones rápidos para acceder como diferentes roles sin necesidad de credenciales */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-4 text-center">
            Acceso Demo (Solo para Pruebas)
          </p>
          <div className="grid grid-cols-3 gap-3">
            {/* Demo Superadmin */}
            <Button
              variant="outline"
              className="h-12 flex flex-col items-center justify-center gap-1"
              onClick={() => (onDemoLogin || onLogin)('superadmin@demo.com', 'demo')}
            >
              <Shield className="w-5 h-5" />
              <span className="text-xs">Superadmin</span>
            </Button>
            {/* Demo Doctor */}
            <Button
              variant="outline"
              className="h-12 flex flex-col items-center justify-center gap-1"
              onClick={() => (onDemoLogin || onLogin)('doctor@demo.com', 'demo')}
            >
              <User className="w-5 h-5" />
              <span className="text-xs">Doctor</span>
            </Button>
            {/* Demo Paciente */}
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

        {/* SECCIÓN 5: LINKS DE PIE DE PÁGINA */}
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