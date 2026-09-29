import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { SiteContent } from '../services/firebase';

interface FAQSectionProps {
  content: SiteContent;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ content }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const cleanPhone = content.whatsappNumber ? content.whatsappNumber.replace(/\D/g, '') : '5541996222432';
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone}?text=${encodeURIComponent('Olá! Tenho uma dúvida sobre a estimulação visual.')}`;

  const faqs = [
    {
      q: "1. A partir de qual idade a Estimulação Visual pode ser iniciada?",
      a: "A estimulação visual pode e deve ser iniciada desde os primeiros meses de vida (bebês a partir de 0 a 3 meses), especialmente em casos de prematuridade, diagnósticos neurológicos precoces ou percepção de que o bebê não fixa o olhar. Quanto mais cedo o estímulo começar, maior é o aproveitamento da neuroplasticidade cerebral."
    },
    {
      q: "2. Qual a diferença entre a consulta oftalmológica e a estimulação visual?",
      a: "O médico oftalmologista é o responsável por avaliar a saúde anatômica e a refração dos olhos (se precisa de óculos, colírios ou cirurgias). Já a Estimulação Visual / Terapeuta Neurovisual atua na função: ensina o cérebro a usar, interpretar e integrar essa imagem visual com o corpo, o equilíbrio e as atividades do dia a dia. São abordagens complementares essenciais."
    },
    {
      q: "3. Como a Neurovisão ajuda pessoas com Autismo (TEA) e TDAH?",
      a: "Muitas pessoas no espectro ou com TDAH sofrem de hipersensibilidade à luz, dificuldades de rastreio contínuo e estresse sensorial em ambientes carregados. A estimulação visual modulada trabalha a estabilização do olhar, o controle de sacadas e o equilíbrio sensorial, resultando em menor fadiga, melhor contato visual e aumento da capacidade de foco e aprendizagem."
    },
    {
      q: "4. Como funciona o atendimento online / teleorientação?",
      a: "Para famílias de outras cidades ou estados, oferecemos sessões de Teleorientação Clínica. Realizamos a anamnese detalhada, analisamos vídeos do comportamento visual do paciente e estruturamos um plano personalizado com orientações práticas para que os pais apliquem os estímulos corretos em casa no dia a dia, com suporte contínuo."
    },
    {
      q: "5. Quanto tempo dura o acompanhamento e como são as sessões?",
      a: "Cada sessão dura em média de 45 a 50 minutos. A frequência e duração total do plano dependem do diagnóstico funcional inicial e da resposta individual do paciente. Realizamos reavaliações periódicas para mensurar os ganhos de eficiência visual e ajustar os desafios gradualmente."
    }
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#f8f9fc] border-t border-slate-200/80">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffb829]/15 text-[#b45309] text-[12px] font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="text-[34px] sm:text-[44px] lg:text-[48px] font-normal tracking-tight text-slate-900 leading-[1.15]">
            Dúvidas mais comuns
          </h2>
          <p className="text-[17px] sm:text-[18px] text-slate-600 leading-relaxed">
            Reunimos as respostas para as principais dúvidas de famílias e profissionais antes de iniciar o processo de estimulação.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-[20px] border border-slate-200/80 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-[17px] sm:text-[18px] font-semibold text-slate-900 leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#8052ff] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-7 sm:px-7 text-[15.5px] text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra question helper */}
        <div className="mt-12 text-center">
          <p className="text-[15px] text-slate-600 mb-4">
            Ainda tem alguma dúvida específica sobre o caso do seu filho ou familiar?
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#8052ff] text-[#8052ff] font-bold text-sm uppercase tracking-wider shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tirar dúvidas diretamente no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
