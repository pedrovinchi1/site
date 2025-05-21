import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "../store/useStore";
import { login } from "../api/client";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const validateForm = () => {
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email inválido.");
      return false;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await login(email, password);
      
      // Store the auth token
      localStorage.setItem("authToken", response.access_token);
      
      // Set user data in the global store
      setUser({
        id: response.user.id,
        name: response.user.name || email.split("@")[0],
        email: response.user.email,
        role: response.user.role || "customer",
        address: response.user.address,
        isAuthenticated: true // Adicionar esta propriedade
      });
      
      // Navigate to the account page
      navigate("/account");
    } catch (error) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
      console.error("Erro ao fazer login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // For the Google login functionality, you need to implement the actual API call
  // This is a placeholder that you can complete when ready to implement OAuth
  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      // This should be replaced with your actual Google OAuth implementation
      // For example, using the API client:
      // const response = await googleOAuthLogin();
      
      setError("Login com Google ainda não implementado.");
      
      /* When implemented, it would look something like this:
      localStorage.setItem("authToken", response.access_token);
      setUser({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role || "customer",
        address: response.user.address
      });
      navigate("/account");
      */
    } catch (err) {
      setError("Erro ao fazer login com Google. Tente novamente mais tarde.");
      console.error("Erro ao fazer login com Google:", err);
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
            className={`w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Carregando..." : "Entrar"}
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
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
            Não tem uma conta?{" "}
            <Link to="/register" className="font-medium text-red-600 hover:text-red-500">
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}