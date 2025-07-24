// frontend/src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AIPopup from './components/AIPopup';

function App() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedFunction, setSelectedFunction] = useState(null);

    // Função para lidar com o clique em uma função da sidebar
    const handleFunctionClick = (func) => {
        setSelectedFunction(func); // Define a função selecionada (com nome, ícone e prompt)
        setIsPopupOpen(true);      // Abre o pop-up
    };

    // Função para fechar o pop-up
    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedFunction(null); // Limpa a função selecionada
    };

    return (
        <div className="flex h-screen bg-graphite text-white">
            {/* Sidebar */}
            <Sidebar onFunctionClick={handleFunctionClick} />

            {/* Dashboard Principal - Conteúdo central */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Bem-vindo ao MyAI SaaS!</h1>
                    <p className="text-lg text-gray-300">
                        Selecione uma função no menu lateral para começar a gerar conteúdo com IA.
                    </p>
                </div>
            </div>

            {/* Pop-up da IA (condicionalmente renderizado) */}
            {selectedFunction && ( // Renderiza o pop-up apenas se uma função for selecionada
                <AIPopup
                    isOpen={isPopupOpen}
                    onClose={handleClosePopup}
                    selectedFunction={selectedFunction}
                />
            )}
        </div>
    );
}

export default App;