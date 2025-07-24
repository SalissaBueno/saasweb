        // frontend/src/pages/DashboardPage.js
        import React, { useState, useEffect } => 'react';
        import { useNavigate } from 'react-router-dom';
        import Sidebar from '../components/Sidebar'; // O menu lateral
        import AIPopup from '../components/AIPopup';   // O pop-up de chat com a IA
        import axios from 'axios';                   // Para buscar o histórico de conversas

        // Novos ícones para histórico e logout
        import { History, LogOut } from 'lucide-react';

        // Recebe 'authToken' e 'setAuthToken' como props do App.js
        const DashboardPage = ({ authToken, setAuthToken }) => {
            const [isPopupOpen, setIsPopupOpen] = useState(false);
            const [selectedFunction, setSelectedFunction] = useState(null);
            const [conversations, setConversations] = useState([]); // Estado para armazenar o histórico de conversas
            const [activeConversationId, setActiveConversationId] = useState(null); // ID da conversa atualmente aberta no pop-up
            const navigate = useNavigate(); // Hook para navegação

            // Efeito para verificar autenticação e carregar histórico ao montar o componente
            useEffect(() => {
                if (!authToken) {
                    navigate('/login'); // Se não houver token, redireciona para o login
                } else {
                    fetchConversations(); // Se estiver logado, busca o histórico
                }
            }, [authToken, navigate]); // Dependências: executa quando authToken ou navigate mudam

            // Função para buscar o histórico de conversas do backend
            const fetchConversations = async () => {
                try {
                    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
                    const config = {
                        headers: {
                            Authorization: `Bearer ${authToken}`, // Envia o token de autenticação no cabeçalho
                        },
                    };
                    const { data } = await axios.get(`${backendUrl}/api/conversations`, config);
                    setConversations(data); // Atualiza o estado com as conversas recebidas
                } catch (error) {
                    console.error('Erro ao buscar conversas:', error);
                    if (error.response?.status === 401) { // Se o token for inválido/expirado
                        setAuthToken(null); // Limpa o token no estado
                        localStorage.removeItem('authToken'); // Remove do localStorage
                        navigate('/login'); // Redireciona para o login
                    }
                }
            };

            // Função para iniciar uma nova conversa (clique em uma função da sidebar)
            const handleNewConversation = (func) => {
                setSelectedFunction(func);      // Define a função selecionada
                setIsPopupOpen(true);           // Abre o pop-up
                setActiveConversationId(null);  // Zera o ID para indicar uma nova conversa
            };

            // Função para carregar uma conversa existente (clique em um item do histórico)
            const handleLoadConversation = async (conversation) => {
                // Cria um objeto de função simulado para passar ao AIPopup
                setSelectedFunction({
                    name: conversation.functionName,
                    prompt: 'Carregando conversa anterior. Continue a partir daqui.', // Prompt genérico para histórico
                });
                setActiveConversationId(conversation._id); // Define o ID da conversa ativa
                setIsPopupOpen(true); // Abre o pop-up
            };

            // Função para fechar o pop-up
            const handleClosePopup = () => {
                setIsPopupOpen(false);
                setSelectedFunction(null);
                setActiveConversationId(null); // Limpa o ID da conversa ativa
                fetchConversations(); // Recarrega o histórico para mostrar a conversa recém-salva/atualizada
            };

            // Função de Logout
            const handleLogout = () => {
                setAuthToken(null); // Limpa o token no estado
                localStorage.removeItem('authToken'); // Remove o token do localStorage
                navigate('/login'); // Redireciona para a página de login
            };

            return (
                <div className="flex h-screen bg-graphite text-white">
                    {/* Sidebar com funções e histórico */}
                    <div className="w-64 bg-graphite p-6 flex flex-col border-r border-gray-700 h-screen overflow-y-auto">
                        <div className="mb-8 text-2xl font-bold text-white">
                            MyAI SaaS
                        </div>
                        <nav className="w-full">
                            {/* Seção de Funções */}
                            <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase">Funções</h3>
                            {/* O componente Sidebar agora só recebe a função de clique */}
                            <Sidebar onFunctionClick={handleNewConversation} />

                            {/* Seção de Histórico */}
                            <h3 className="text-gray-400 text-sm font-semibold mt-6 mb-2 uppercase">Histórico</h3>
                            {conversations.length === 0 ? (
                                <p className="text-gray-500 text-sm">Nenhuma conversa salva.</p>
                            ) : (
                                <ul className="space-y-2">
                                    {conversations.map((conv) => (
                                        <li key={conv._id}>
                                            <button
                                                className="w-full flex items-center p-2 text-white hover:bg-gray-700 rounded-lg transition-colors duration-200 text-left"
                                                onClick={() => handleLoadConversation(conv)}
                                            >
                                                <History className="w-5 h-5 mr-2 text-gray-400" />
                                                <span className="text-sm">
                                                    {conv.functionName} - {new Date(conv.updatedAt).toLocaleDateString()}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </nav>

                        {/* Botão de Logout */}
                        <div className="mt-auto pt-6 border-t border-gray-700">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center p-3 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
                            >
                                <LogOut className="w-6 h-6 mr-3" />
                                <span className="text-sm font-medium">Sair</span>
                            </button>
                        </div>
                    </div>

                    {/* Dashboard Principal - Conteúdo central */}
                    <div className="flex-1 flex items-center justify-center p-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-4">Bem-vindo ao MyAI SaaS!</h1>
                            <p className="text-lg text-gray-300">
                                Selecione uma função no menu lateral para começar a gerar conteúdo com IA ou veja seu histórico.
                            </p>
                        </div>
                    </div>

                    {/* Pop-up da IA (condicionalmente renderizado) */}
                    {selectedFunction && (
                        <AIPopup
                            isOpen={isPopupOpen}
                            onClose={handleClosePopup}
                            selectedFunction={selectedFunction}
                            authToken={authToken} // Passa o token de autenticação para o pop-up
                            conversationId={activeConversationId} // Passa o ID da conversa ativa
                            setAuthToken={setAuthToken} // Permite ao pop-up deslogar em caso de token inválido
                        />
                    )}
                </div>
            );
        };

        export default DashboardPage;
        