        // frontend/src/components/AIPopup.js
        import React, { useState, useEffect, useRef } from 'react';
        import axios from 'axios';
        import { X } from 'lucide-react'; // Ícone de fechar

        const AIPopup = ({ isOpen, onClose, selectedFunction }) => {
            const [userMessage, setUserMessage] = useState('');
            const [chatMessages, setChatMessages] = useState([]);
            const [isLoading, setIsLoading] = useState(false);
            const chatContainerRef = useRef(null); // Referência para o container de mensagens

            // Limpa as mensagens quando a função selecionada muda
            useEffect(() => {
                setChatMessages([]);
            }, [selectedFunction]);

            // Rolagem automática para o final das mensagens
            useEffect(() => {
                if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }
            }, [chatMessages]);

            const handleSubmit = async (e) => {
                e.preventDefault();
                if (!userMessage.trim() || isLoading) return;

                const newUserMessage = { sender: 'user', text: userMessage };
                setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
                setUserMessage(''); // Limpa a caixa de texto

                setIsLoading(true);

                try {
                    // Pega a URL do backend da variável de ambiente REACT_APP_BACKEND_URL
                    // Se não estiver definida (ex: em desenvolvimento local), usa localhost
                    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

                    const response = await axios.post(`${backendUrl}/api/generate-ai-response`, {
                        hiddenPrompt: selectedFunction.prompt, // Envia o prompt oculto
                        userMessage: userMessage, // Envia a mensagem do usuário
                    });

                    if (response.data.success) {
                        const aiResponse = { sender: 'ai', text: response.data.aiResponse };
                        setChatMessages((prevMessages) => [...prevMessages, aiResponse]);
                    } else {
                        setChatMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: 'Ocorreu um erro ao gerar a resposta da IA. Tente novamente.' }]);
                    }
                } catch (error) {
                    console.error('Erro na requisição da IA:', error);
                    console.error(‘Detalhes do erro:’, error.message, error.stack, error.response); // Adicione esta linha para registrar mais detalhes do erro
                    setChatMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: 'Não foi possível conectar com a IA. Verifique o servidor.' }]);
                } finally {
                    setIsLoading(false);
                }
            };

            if (!isOpen) return null;

            return (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl h-full max-h-[90vh] flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900">
                            <h2 className="text-lg font-bold text-white">{selectedFunction.name}</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div
                            ref={chatContainerRef} // Aplica a referência aqui
                            className="flex-1 p-4 overflow-y-auto custom-scrollbar" // Adiciona classe para scrollbar personalizado
                        >
                            {chatMessages.length === 0 && (
                                <p className="text-gray-400 text-center mt-4">
                                    Insira sua solicitação para {selectedFunction.name} e a IA responderá aqui.
                                </p>
                            )}
                            {chatMessages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`mb-4 p-3 rounded-lg max-w-[80%] ${
                                        msg.sender === 'user'
                                            ? 'bg-blue-600 text-white ml-auto'
                                            : 'bg-gray-700 text-white mr-auto'
                                    }`}
                                >
                                    {/* Formatação para a resposta da IA (pode ser mais sofisticada) */}
                                    {msg.sender === 'ai' ? (
                                        <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
                                    ) : (
                                        <p>{msg.text}</p>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="p-3 rounded-lg bg-gray-700 text-white mr-auto animate-pulse">
                                    Digitando...
                                </div>
                            )}
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-900 flex">
                            <input
                                type="text"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                placeholder={`Descreva o que você precisa para ${selectedFunction.name}...`}
                                className="flex-1 p-3 rounded-l-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            );
        };

        export default AIPopup;
        