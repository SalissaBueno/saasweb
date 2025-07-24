        // frontend/src/App.js
        import React, { useState, useEffect } from 'react';
        // Importa os componentes necessários do react-router-dom para roteamento
        import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

        // Importa as páginas do seu aplicativo
        import LoginPage from './pages/LoginPage';
        import RegisterPage from './pages/RegisterPage'; // Página de registro (opcional)
        import DashboardPage from './pages/DashboardPage'; // A página principal do dashboard

        import './index.css'; // Mantenha a importação do CSS global com Tailwind

        function App() {
            // Estado para armazenar o token de autenticação. Tenta pegar do localStorage ao iniciar.
            const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

            // Efeito para verificar o token (pode ser expandido para validar o token no backend)
            useEffect(() => {
                if (authToken) {
                    // Em uma aplicação real, você faria uma requisição para validar o token no backend
                    // para garantir que ele ainda é válido e não expirou.
                    // Por simplicidade neste MVP, apenas a existência no localStorage é suficiente para o frontend.
                }
            }, [authToken]); // Dependência: executa quando o authToken muda

            return (
                // BrowserRouter envolve toda a aplicação para habilitar o roteamento
                <Router>
                    <div className="App">
                        {/* Routes define as diferentes rotas (URLs) do seu aplicativo */}
                        <Routes>
                            {/* Rota para a página de Login */}
                            <Route path="/login" element={<LoginPage setAuthToken={setAuthToken} />} />
                            {/* Rota para a página de Registro (opcional, se você quiser auto-registro) */}
                            <Route path="/register" element={<RegisterPage />} />

                            {/* Rota Protegida para o Dashboard */}
                            {/* Se houver um authToken, renderiza o DashboardPage; senão, redireciona para o Login */}
                            <Route
                                path="/dashboard"
                                element={
                                    authToken ? (
                                        <DashboardPage authToken={authToken} setAuthToken={setAuthToken} />
                                    ) : (
                                        <Navigate to="/login" replace /> // Redireciona para login
                                    )
                                }
                            />

                            {/* Rota Raiz: Redireciona para o Dashboard se já logado, senão para o Login */}
                            <Route
                                path="/"
                                element={
                                    authToken ? (
                                        <Navigate to="/dashboard" replace />
                                    ) : (
                                        <Navigate to="/login" replace />
                                    )
                                }
                            />
                        </Routes>
                    </div>
                </Router>
            );
        }

        export default App;
        