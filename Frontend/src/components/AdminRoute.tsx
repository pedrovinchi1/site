import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export function AdminRoute({ children }) {
  const { user } = useStore();
  
  // Verifica se o usuário está autenticado e tem permissões de admin
  const isAdmin = user && user.isAuthenticated && user.role === 'admin';
  
  if (!isAdmin) {
    // Redireciona para a página de login administrativo
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
}