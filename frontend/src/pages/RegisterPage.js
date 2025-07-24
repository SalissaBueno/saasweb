        // frontend/src/pages/RegisterPage.js
        import React, { useState } from 'react';
        import axios from 'axios';
        import { useNavigate, Link } from 'react-router-dom';

        const RegisterPage = () => {
            const [username, setUsername] = useState('');
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [confirmPassword, setConfirmPassword] = useState('');
            const [error, setError] = useState('');
            const [success, setSuccess] = useState('');
            const [loading, setLoading] = useState(false);
            const navigate = useNavigate();

            const handleSubmit = async (e) => {
                e.preventDefault();
                setError('');
                setSuccess('');
                setLoading(true);

                if (password !== confirmPassword) {
                    setError('As senhas não coincidem.');
                    setLoading(false);
                    return;
                }

                try {
                    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
                    // Faz a requisição POST para a rota de registro no backend
                    await axios.post(`${backendUrl}/api/auth/register`, { username, email, password });
                    setSuccess('Usuário registrado com sucesso! Você pode fazer login agora.');
                    // Redireciona para a página de login após 2 segundos
                    setTimeout(() => navigate('/login'), 2000);
                } catch (err) {
                    console.error('Erro de registro:', err);
                    setError(err.response?.data?.message || 'Erro ao registrar. Tente novamente.');
                } finally {
                    setLoading(false);
                }
            };

            return (
                <div className="flex items-center justify-center min-h-screen bg-graphite">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-white">
                        <h2 className="text-3xl font-bold text-center mb-6">Registrar Novo Usuário</h2>
                        {error && <p className="bg-red-500 text-white p-3 rounded mb-4 text-center">{error}</p>}
                        {success && <p className="bg-green-500 text-white p-3 rounded mb-4 text-center">{success}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                                    Nome de Usuário
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
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
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                    Confirmar Senha
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    {loading ? 'Registrando...' : 'Registrar'}
                                </button>
                                <p className="text-sm text-gray-400">
                                    Já tem conta? <Link to="/login" className="text-blue-400 hover:underline">Faça login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            );
        };

        export default RegisterPage;
        