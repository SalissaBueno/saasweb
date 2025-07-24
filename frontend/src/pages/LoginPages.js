        // frontend/src/pages/LoginPage.js
        import React, { useState } from 'react';
        import axios from 'axios'; // Para fazer requisições HTTP
        import { useNavigate, Link } from 'react-router-dom'; // Para navegação e link para registro

        // Recebe 'setAuthToken' como prop para atualizar o estado de autenticação no App.js
        const LoginPage = ({ setAuthToken }) => {
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [error, setError] = useState('');     // Estado para mensagens de erro
            const [loading, setLoading] = useState(false); // Estado para indicar carregamento
            const navigate = useNavigate(); // Hook para navegação programática

            const handleSubmit = async (e) => {
                e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
                setError('');       // Limpa erros anteriores
                setLoading(true);   // Ativa o estado de carregamento

                try {
                    // Pega a URL do backend da variável de ambiente ou usa localhost para desenvolvimento
                    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
                    // Faz uma requisição POST para a rota de login do backend
                    const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password });

                    // Se o login for bem-sucedido, salva o token JWT no localStorage
                    localStorage.setItem('authToken', response.data.token);
                    // Atualiza o estado de autenticação no componente pai (App.js)
                    setAuthToken(response.data.token);
                    // Redireciona o usuário para o dashboard
                    navigate('/dashboard');
                } catch (err) {
                    console.error('Erro de login:', err);
                    // Captura a mensagem de erro do backend ou uma mensagem genérica
                    setError(err.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.');
                } finally {
                    setLoading(false); // Desativa o estado de carregamento
                }
            };

            return (
                <div className="flex items-center justify-center min-h-screen bg-graphite">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-white">
                        <h2 className="text-3xl font-bold text-center mb-6">Login no MyAI SaaS</h2>
                        {/* Exibe mensagem de erro se houver */}
                        {error && <p className="bg-red-500 text-white p-3 rounded mb-4 text-center">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                                    Email Corporativo
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required // Campo obrigatório
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required // Campo obrigatório
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={loading} // Desabilita o botão durante o carregamento
                                >
                                    {loading ? 'Entrando...' : 'Entrar'} {/* Muda o texto do botão */}
                                </button>
                                {/* Link para a página de registro */}
                                <p className="text-sm text-gray-400">
                                    Não tem conta? <Link to="/register" className="text-blue-400 hover:underline">Registre-se</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            );
        };

        export default LoginPage;
        