import React, { useState } from "react";
import { login } from "../api/client";

const TestLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      localStorage.setItem("authToken", data.access_token); // Armazena o token no localStorage
      setMessage("Login bem-sucedido!");
    } catch (error) {
      setMessage("Erro ao fazer login.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teste de Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Fazer Login
      </button>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default TestLogin;