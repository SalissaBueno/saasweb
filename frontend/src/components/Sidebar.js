        // frontend/src/components/Sidebar.js
        import React from 'react';
        import { User, Sparkles, ShoppingBag, Lightbulb, FileText, Megaphone, Target, BookOpen, PenTool } from 'lucide-react';

        // Array de funções com seus nomes, ícones e prompts ocultos
        const functions = [
            {
                name: 'Criação de Avatar',
                icon: User,
                prompt: "Você é um especialista em criação de avatares de clientes. Crie um avatar detalhado incluindo: nome fictício, idade, profissão, desafios, objetivos, comportamentos, pontos de dor, faixa etária, estilo de vida, objeções, estratégias de venda, canais ideais, produtos recomendados, tom de linguagem e estética visual recomendada. Formate em tópicos claros e objetivos.",
            },
            {
                name: 'Refinamento de Avatar',
                icon: Sparkles,
                prompt: "Você é um especialista em refinamento de avatares. Dada a seguinte descrição de avatar, refine-a e adicione detalhes para torná-la mais completa e útil para estratégias de marketing. Inclua mais insights sobre suas motivações profundas, como ele se relaciona com a tecnologia e quais gatilhos emocionais podem ser usados para alcançá-lo. Formate em tópicos claros e objetivos.",
            },
            {
                name: 'Produto e Oferta',
                icon: ShoppingBag,
                prompt: "Você é um especialista em desenvolvimento de produtos e ofertas irresistíveis. Dada uma ideia de produto ou serviço, ajude a criar uma oferta única e atraente. Inclua: nome do produto/serviço, problema que resolve, benefício principal, proposta de valor única, diferenciais, bônus (se houver), garantia e call to action. Formate em tópicos.",
            },
            {
                name: 'Mecanismo Único',
                icon: Lightbulb,
                prompt: "Você é um especialista em identificar e descrever mecanismos únicos de produtos e serviços. Descreva o mecanismo único para o seguinte produto/serviço, explicando como ele funciona de forma diferente e superior à concorrência. Foque em clareza, concisão e persuasão, usando analogias se necessário. Formate em tópicos.",
            },
            {
                name: 'Copy para Página de Vendas (Texto)',
                icon: FileText,
                prompt: "Você é um copywriter expert em criar textos persuasivos para páginas de vendas. Crie uma copy completa para uma página de vendas, cobrindo: título chamativo, problema, solução, benefícios, prova social (exemplos), quebra de objeções, bônus (se aplicável), garantia, preço e uma chamada clara para ação. Adapte o tom para ser engajador e direto. Formate com seções claras.",
            },
            {
                name: 'Roteiros de Anúncios',
                icon: Megaphone,
                prompt: "Você é um roteirista de anúncios mestre em capturar a atenção. Crie um roteiro detalhado para um anúncio (ex: vídeo, áudio), incluindo: gancho, problema, solução, benefícios, prova (se aplicável), chamada para ação e duração estimada. Pense na plataforma (ex: Instagram, YouTube). Formate em etapas e falas.",
            },
            {
                name: 'Copy de Anúncios',
                icon: Target,
                prompt: "Você é um copywriter de alta performance para anúncios curtos e impactantes. Crie variações de copy para anúncios (ex: Google Ads, Facebook Ads) com foco em: título, descrição, chamada para ação e URL de exibição. Seja conciso, persuasivo e use gatilhos mentais. Gere pelo menos 3 opções diferentes por solicitação.",
            },
            {
                name: 'Roteiro de Conteúdos',
                icon: BookOpen,
                prompt: "Você é um estrategista de conteúdo. Crie um roteiro detalhado para um conteúdo (ex: blog post, vídeo, podcast) sobre um tema específico. Inclua: título otimizado, introdução, pontos principais a serem abordados (tópicos com breve descrição), conclusão e chamada para ação (se aplicável). Foque em valor e engajamento. Formate em estrutura de tópicos.",
            },
            {
                name: 'Descrição de Post',
                icon: PenTool,
                prompt: "Você é um especialista em criar descrições envolventes para posts em redes sociais. Crie uma descrição criativa e persuasiva para um post, incluindo: gancho inicial, valor/benefício, chamada para ação, hashtags relevantes e emojis adequados. Adapte ao tom da marca e plataforma (ex: Instagram, LinkedIn).",
            },
        ];

        const Sidebar = ({ onFunctionClick }) => {
            return (
                <div className="w-64 bg-graphite p-6 flex flex-col items-center border-r border-gray-700 h-screen overflow-y-auto">
                    <div className="mb-8 text-2xl font-bold text-white">
                        MyAI SaaS
                    </div>
                    <nav className="w-full">
                        {functions.map((func) => (
                            <button
                                key={func.name}
                                className="w-full flex items-center p-3 my-2 text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
                                onClick={() => onFunctionClick(func)} // Passa o objeto completo da função para o pai
                            >
                                <func.icon className="w-6 h-6 mr-3" />
                                <span className="text-sm font-medium">{func.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            );
        };

        export default Sidebar;
        