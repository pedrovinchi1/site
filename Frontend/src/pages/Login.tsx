import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // Here we would normally handle authentication with Supabase
      // Simulate authentication check
      if (email && password) {
        setUser({ 
          email, 
          isAuthenticated: true,
          name: email.split('@')[0] // Extraindo nome do email como exemplo
        });
        
        // Redirecionando para a página de perfil após login bem-sucedido
        navigate('/profile');
      } else {
        setError('Por favor, preencha todos os campos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
      console.error('Login error:', err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      // Simulação de login com Google
      // Em um ambiente real, você usaria algo como:
      // const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      
      // Simulando um login bem-sucedido
      setUser({ 
        email: 'usuario.google@gmail.com', 
        isAuthenticated: true,
        name: 'Usuário Google' 
      });
      
      // Redirecionando para a página de perfil após login com Google
      navigate('/profile');
    } catch (err) {
      setError('Erro ao fazer login com Google. Tente novamente mais tarde.');
      console.error('Erro ao fazer login com Google:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
            <div className="mt-1 text-right">
              <Link to="/forgot-password" className="text-xs text-red-600 hover:text-red-500">
                Esqueceu a senha?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Entrar
          </button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou continue com</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                alt="Google logo" 
                className="h-5 w-5 mr-2" 
              />
              Entrar com Google
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/Register" className="font-medium text-red-600 hover:text-red-500">
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}