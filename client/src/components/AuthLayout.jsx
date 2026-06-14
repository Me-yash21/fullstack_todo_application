import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore';

export default function AuthLayout({ children, authentication = true }) {
  const userAuthStatus = useAuthStore((state) => state.isAuthenticate);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on auth status
    if (authentication && !userAuthStatus) {
      navigate('/login');
    } else if (!authentication && userAuthStatus) {
      navigate('/dashboard');
    }
  }, [userAuthStatus, authentication, navigate]);

  return <>{children}</>;
}
