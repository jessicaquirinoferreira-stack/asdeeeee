import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// Initialize Google GenAI client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `Você é a Assistente Virtual Oficial da Dra. Darlene Kloster - Estimulação Visual & Neurovisão Brasil.
Sua missão é responder dúvidas comuns de pacientes, pais e familiares com muita empatia, clareza científica acessível e acolhimento humano.

Sobre Darlene Kloster e o Trabalho:
- Especialista em Estimulação Visual Modulada, Neurovisão, Percepção Visual e Processamento Sensorial.
- Atua com Deficiência Visual Cortical/Cerebral (DVC), Baixa Visão, TEA (Autismo), TDAH, Síndromes Genéticas (como Síndrome de West, Dup15q, Down), Prematuridade, Ambliopia, Estrabismo e Reeducação Visuopostural (RVP).
- Atende bebês, crianças, adolescentes e adultos.
- Localização: Atendimento presencial em Curitiba - PR e Consultorias/Teleorientação online para famílias de todo o Brasil e exterior.

DIRETRIZ MANDATÓRIA:
- Seja sempre clara, acolhedora, objetiva e encorajadora.
- Responda em Português do Brasil com tom profissional e afetuoso.
- No final de TODA resposta, SEMPRE convide e recomende com carinho que a pessoa entre em contato diretamente pelo WhatsApp com a Darlene para conversar sobre o caso específico, esclarecer dúvidas detalhadas ou agendar uma avaliação personalizada.`;

// Assistant chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensagem inválida' });
    }

    if (ai) {
      const formattedContents = [];
      
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item.sender === 'user') {
            formattedContents.push({ role: 'user', parts: [{ text: item.text }] });
          } else if (item.sender === 'bot') {
            formattedContents.push({ role: 'model', parts: [{ text: item.text }] });
          }
        }
      }

      formattedContents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'Olá! Ficou alguma dúvida? Recomendo muito chamar a Darlene no WhatsApp para conversarem sobre seu caso!';
      return res.json({ reply: replyText });
    }

    // Fallback intelligent responder if API key is not attached
    const lower = message.toLowerCase();
    let reply = '';

    if (lower.includes('o que é') || lower.includes('como funciona') || lower.includes('estimulacao') || lower.includes('estimulação')) {
      reply = 'A Estimulação Visual Modulada é uma terapia especializada baseada na neuroplasticidade cerebral. Ela potencializa as conexões neurais e ensina o cérebro a interpretar e processar melhor os estímulos visuais, promovendo autonomia no dia a dia, no aprendizado e na coordenação motora.\n\n👉 Para entender exatamente como aplicar no seu caso ou no de seu filho, chame a Darlene agora mesmo no WhatsApp para um acolhimento personalizado!';
    } else if (lower.includes('dvc') || lower.includes('cortical') || lower.includes('cerebral')) {
      reply = 'A Deficiência Visual Cortical/Cerebral (DVC) é uma alteração nas vias cerebrais responsáveis por processar a visão, mesmo quando a estrutura dos olhos está íntegra. Com os estímulos visuais modulados corretos (cores contrastantes, controle de complexidade e iluminação específica), o cérebro cria novas sinapses funcionais.\n\n👉 Você pode conversar diretamente com a Darlene pelo WhatsApp para enviar exames e tirar dúvidas!';
    } else if (lower.includes('quem') || lower.includes('indicado') || lower.includes('publico') || lower.includes('idade') || lower.includes('criança') || lower.includes('bebe') || lower.includes('bebê') || lower.includes('adulto')) {
      reply = 'A Estimulação Visual é indicada para bebês, crianças, jovens e adultos com:\n• Prematuridade ou atrasos no desenvolvimento visual;\n• DVC (Deficiência Visual Cortical);\n• TEA (Autismo) e TDAH;\n• Síndromes genéticas e paralisia cerebral;\n• Baixa visão, ambliopia e estrabismo;\n• Reabilitação pós-AVC ou trauma neurológico.\n\n👉 Para agendar uma avaliação clínica ou teleorientação, clique no botão do WhatsApp!';
    } else if (lower.includes('onde') || lower.includes('endereço') || lower.includes('cidade') || lower.includes('curitiba') || lower.includes('online')) {
      reply = 'A Dra. Darlene Kloster realiza atendimentos clínicos presenciais em Curitiba - PR e também presta Consultorias e Teleorientações especializadas para famílias de todo o Brasil e exterior!\n\n👉 Chame agora no WhatsApp para verificar os horários disponíveis e agendar sua sessão!';
    } else if (lower.includes('preço') || lower.includes('valor') || lower.includes('custo') || lower.includes('consulta') || lower.includes('agendar') || lower.includes('horario') || lower.includes('horário')) {
      reply = 'Para consultar valores, formatos de avaliação e a disponibilidade de agenda (presencial ou online), nossa equipe te atende diretamente pelo WhatsApp com todas as informações!\n\n👉 Clique no botão do WhatsApp aqui abaixo para falar diretamente conosco.';
    } else {
      reply = 'Olá! Estou aqui para ajudar com informações sobre Estimulação Visual, Neurovisão, DVC e desenvolvimento funcional.\n\nCada caso é único e merece um olhar individualizado. Convido você a chamar a Darlene no WhatsApp para conversarem em detalhes sobre seu caso e darem esse passo juntos!';
    }

    return res.json({ reply });

  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(500).json({
      reply: 'Olá! No momento estou com uma pequena instabilidade, mas a Darlene está pronta para te atender diretamente no WhatsApp com todo carinho e atenção! Clique no botão abaixo para falar com ela.',
    });
  }
});

// Vite SSR/Dev middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
