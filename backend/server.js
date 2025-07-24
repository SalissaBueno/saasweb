// backend/server.js

// Importa as bibliotecas necessárias
const express = require('express'); // Framework web para Node.js
const cors = require('cors');     // Para lidar com requisições de diferentes origens (frontend e backend)
const axios = require('axios');   // Cliente HTTP para fazer requisições à API da DeepSeek
require('dotenv').config();       // Carrega variáveis de ambiente do arquivo .env

// Inicializa o aplicativo Express
const app = express();
const port = process.env.PORT || 5000; // Define a porta do servidor, ou usa 5000 por padrão

// Configura o CORS para permitir requisições do seu frontend
// Em desenvolvimento local, será 'http://localhost:3000'
// Em produção, será a URL do seu frontend no Vercel
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

// Habilita o Express a receber JSON no corpo das requisições
app.use(express.json());

// --- Rotas da API ---

// Rota principal para testes
app.get('/', (req, res) => {
    res.send('API do SaaS com IA está funcionando!');
});

// Rota genérica para interagir com a DeepSeek API
// Esta rota receberá o prompt oculto e a mensagem do usuário
app.post('/api/generate-ai-response', async (req, res) => {
    const { hiddenPrompt, userMessage } = req.body; // Pega o prompt oculto e a mensagem do usuário do corpo da requisição

    // Verifica se a chave da API está configurada
    if (!process.env.DEEPSEEK_API_KEY) {
        return res.status(500).json({ error: 'DeepSeek API Key not configured.' });
    }

    // Combina o prompt oculto com a mensagem do usuário
    const fullPrompt = `${hiddenPrompt}\n\n${userMessage}`;

    try {
        // Faz a requisição para a API da DeepSeek
        const response = await axios.post('https://api.deepseek.com/chat/completions', {
            model: 'deepseek-chat', // Modelo de IA da DeepSeek. Verifique a documentação para outros modelos.
            messages: [
                { role: 'user', content: fullPrompt } // Envia a mensagem combinada para a IA
            ],
            stream: false // Não usar streaming para este MVP, mas pode ser adicionado depois
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}` // Autenticação com sua chave de API
            }
        });

        // Extrai a resposta da IA
        const aiResponse = response.data.choices[0].message.content;

        // Envia a resposta da IA de volta para o frontend
        res.json({ success: true, aiResponse });

    } catch (error) {
        console.error('Erro ao chamar a DeepSeek API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to generate AI response', details: error.response ? error.response.data : error.message });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor backend rodando em http://localhost:${port}`);
});