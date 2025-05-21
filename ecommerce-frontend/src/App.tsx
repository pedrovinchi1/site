import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "./store/useStore";
import { login } from "./api/client";

// Importando Páginas
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { CheckoutSuccess } from "./pages/CheckoutSuccess";
import { CheckoutFailure } from "./pages/CheckoutFailure";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Orders } from "./pages/Orders";
import { OrderDetail } from "./pages/OrderDetail";
import { ProductDetail } from "./pages/ProductDetail";
import { NotFound } from "./pages/Notfound";

// Componentes de Layout
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const App = () => {
  const { user, setUser } = useStore();

  // Verificar se o usuário está logado ao carregar a aplicação
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Verificar autenticação com o token atual
      const fetchUserData = async () => {
        try {
          // Substitua por uma chamada real que valida o token e retorna os dados do usuário
          // Por exemplo: const userData = await validateToken(token);
          // Simulando para não quebrar a funcionalidade atual
          setUser({ 
            id: "1", 
            name: "João Silva", 
            email: "user@example.com", 
            role: "customer",
            isAuthenticated: true
          });
        } catch (error) {
          console.error("Erro ao verificar autenticação:", error);
          localStorage.removeItem("authToken"); // Remove o token inválido
        }
      };
      fetchUserData();
    }
  }, [setUser]);

  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      {/* Rotas da Aplicação */}
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Página Inicial */}
          <Route path="/" element={<Home />} />

          {/* Produtos */}
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Carrinho */}
          <Route path="/cart" element={<Cart />} />

          {/* Checkout */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/failure" element={<CheckoutFailure />} />

          {/* Pedidos */}
          <Route
            path="/orders"
            element={user ? <Orders /> : <Navigate to="/login" />}
          />
          <Route
            path="/order/:id"
            element={user ? <OrderDetail /> : <Navigate to="/login" />}
          />

          {/* Autenticação */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Página Não Encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;