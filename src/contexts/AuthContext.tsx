/**
 * CONTEXTO DE AUTENTICACIÓN
 *
 * Este archivo maneja toda la lógica de autenticación del sistema usando React Context API
 * Provee funciones de login, logout y registro que pueden ser usadas en cualquier componente
 *
 * IMPORTANTE: Actualmente usa datos MOCK (simulados) para demostración
 * Cuando se conecte al backend real, se deben reemplazar las funciones mock por llamadas API reales
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, UserRole } from '@/types';

// Crear el contexto de autenticación (inicialmente undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * PROVEEDOR DE AUTENTICACIÓN
 * Componente que envuelve la aplicación y provee el contexto de autenticación
 * Debe usarse en el layout principal para que esté disponible en toda la app
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Estado del usuario actual (null si no está autenticado)
  const [user, setUser] = useState<User | null>(null);

  // Estado de carga (true mientras se verifica la sesión)
  const [isLoading, setIsLoading] = useState(true);

  /**
   * EFECTO DE INICIALIZACIÓN
   * Se ejecuta al cargar la app para verificar si hay una sesión guardada
   * Lee el localStorage para mantener la sesión persistente entre recargas
   */
  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // Si existe, restaurar la sesión
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  /**
   * FUNCIÓN DE LOGIN
   * Autentica al usuario y crea una sesión
   *
   * @param email - Correo electrónico del usuario
   * @param password - Contraseña (actualmente no se valida en mock)
   * @param skipPersistence - Si es true, no guarda la sesión en localStorage (usado para demos)
   *
   * MOCK: Determina el rol basándose en el email
   * TODO: Reemplazar con llamada API real cuando el backend esté listo
   */
  const login = async (email: string, password: string, skipPersistence = false) => {
    setIsLoading(true);

    // Simular delay de llamada a API (500ms)
    await new Promise(resolve => setTimeout(resolve, 500));

    // LÓGICA MOCK: Determinar rol y nombre según el email
    let role: UserRole = 'patient';
    let name = 'Usuario';

    if (email.includes('superadmin')) {
      role = 'superadmin';
      name = 'Super Admin';
    } else if (email.includes('doctor')) {
      role = 'doctor';
      name = 'Dr. Juan Pérez';
    } else if (email.includes('paciente') || email.includes('patient')) {
      role = 'patient';
      name = 'María González';
    }

    // Crear objeto de usuario mock
    const mockUser: User = {
      id: `${role}-${Date.now()}`,  // ID único basado en timestamp
      email,
      name,
      role,
    };

    // Establecer usuario en el estado
    setUser(mockUser);

    // Guardar en localStorage solo si NO es login demo
    // Los logins demo no persisten para permitir cambiar fácilmente de rol
    if (!skipPersistence) {
      localStorage.setItem('user', JSON.stringify(mockUser));
    }

    setIsLoading(false);
  };

  /**
   * FUNCIÓN DE LOGOUT
   * Cierra la sesión del usuario actual
   * Limpia el estado y el localStorage
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  /**
   * FUNCIÓN DE REGISTRO
   * Registra un nuevo usuario (siempre como paciente)
   *
   * @param email - Correo del nuevo usuario
   * @param password - Contraseña (actualmente no se valida en mock)
   * @param name - Nombre completo del usuario
   *
   * MOCK: Siempre crea un usuario con rol 'patient'
   * TODO: Reemplazar con llamada API real
   */
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Crear usuario mock (siempre es paciente en el registro)
    const mockUser: User = {
      id: `patient-${Date.now()}`,
      email,
      name,
      role: 'patient',
    };

    // Establecer usuario y guardar sesión
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  /**
   * PROVEER EL CONTEXTO
   * Hace disponibles los datos y funciones de autenticación en toda la app
   */
  return (
    <AuthContext.Provider
      value={{
        user,                           // Usuario actual
        isAuthenticated: !!user,        // Booleano: true si hay usuario
        isLoading,                      // Estado de carga
        login,                          // Función de login
        logout,                         // Función de logout
        register,                       // Función de registro
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * HOOK PERSONALIZADO useAuth
 * Hook para acceder al contexto de autenticación desde cualquier componente
 *
 * Uso:
 * const { user, login, logout } = useAuth();
 *
 * @throws Error si se usa fuera de AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
