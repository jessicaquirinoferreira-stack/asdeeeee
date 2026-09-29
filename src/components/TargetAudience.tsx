import React from 'react';
import { Baby, Sparkles, UserCheck, Check, ArrowRight } from 'lucide-react';
import { SiteContent } from '../services/firebase';

interface TargetAudienceProps {
  content: SiteContent;
}

export const TargetAudience: React.FC<TargetAudienceProps> = ({ content }) => {
  const cleanPhone = content.whatsappNumber ? content.whatsappNumber.replace(/\D/g, '') : '5541996222432';

  const audiences = [
    {
      icon: Baby,
      title: "Bebês e Crianças",
      subtitle: "Da primeira infância à idade escolar",
      desc: "Ideal para bebês com atraso nos marcos visuais (não fixam o olhar, não acompanham rostos), prematuros, crianças com estrabismo, nistagmo, ambliopia (olho preguiçoso) ou dificuldades de aprendizagem na leitura e escrita.",
      highlights: [
        "Estimulação precoce para aproveitar picos de neuroplasticidade",
        "Apoio no desenvolvimento psicomotor e alfabetização",
        "Jogos e dinâmicas terapêuticas lúdicas e envolventes",
      ],
      color: "border-blue-200 bg-blue-50/40 text-blue-700",
      btnText: "Avaliação Infantil",
    },
    {
      icon: Sparkles,
      title: "Neurodivergentes (TEA & TDAH)",
      subtitle: "Regulação sensorial e suporte visual individual",
      desc: "Indicado para crianças e adolescentes com Transtorno do Espectro Autista, TDAH, Síndrome de Down e alterações genéticas que apresentam sobrecarga sensorial, aversão à luz, desorganização corporal ou desvio constante do olhar.",
      highlights: [
        "Redução da irritabilidade provocada por estímulos visuais",
        "Fortalecimento da atenção compartilhada e interação",
        "Adaptações sob medida para a rotina familiar e escolar",
      ],
      color: "border-[#8052ff]/30 bg-[#8052ff]/5 text-[#8052ff]",
      btnText: "Neurovisão TEA / TDAH",
      featured: true,
    },
    {
      icon: UserCheck,
      title: "Adultos e Idosos",
      subtitle: "Reabilitação pós-trauma e manutenção da visão",
      desc: "Para pessoas que sofreram AVC, Traumatismo Cranioencefálico (TCE), que convivem com Baixa Visão adquirida (Glaucoma, Retinopatia, Degeneração Macular) ou que sofrem com vertigens e fadiga visual excessiva em telas.",
      highlights: [
        "Reeducação do campo visual e compensação espacial",
        "Treino de orientação, mobilidade e leitura adaptada",
        "Alívio de sintomas de fadiga e desequilíbrio postural",
      ],
      color: "border-[#15846e]/30 bg-[#15846e]/5 text-[#15846e]",
      btnText: "Reabilitação Adulto",
    },
  ];

  return (
    <section id="publico" className="py-20 lg:py-28 bg-[#f8f9fc] border-t border-slate-200/80">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffb829]/10 text-[#b45309] text-[12px] font-bold uppercase tracking-wider">
            <span>Para Quem é Indicado?</span>
          </div>
          <h2 className="text-[34px] sm:text-[44px] lg:text-[48px] font-normal tracking-tight text-slate-900 leading-[1.15]">
            Público-Alvo do Atendimento
          </h2>
          <p className="text-[17px] sm:text-[18px] text-slate-600 leading-relaxed">
            Cada fase da vida e condição neurológica exige um olhar singular. Descubra como a estimulação visual atua em cada contexto.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {audiences.map((aud, idx) => {
            const Icon = aud.icon;
            const waUrl = `https://wa.me/${cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone}?text=${encodeURIComponent(`Olá, gostaria de agendar uma avaliação para ${aud.title}.`)}`;

            return (
              <div
                key={idx}
                className={`rounded-[24px] bg-white border p-8 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl ${
                  aud.featured ? 'border-[#8052ff] ring-2 ring-[#8052ff]/20 -translate-y-1' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${aud.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {aud.featured && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#8052ff] text-white">
                        Alta Demanda
                      </span>
                    )}
                  </div>

                  <h3 className="text-[24px] font-bold text-slate-900 mb-1 leading-snug">
                    {aud.title}
                  </h3>
                  
                  <p className="text-[13px] font-medium text-slate-500 mb-4">
                    {aud.subtitle}
                  </p>

                  <p className="text-[15px] text-slate-600 leading-relaxed mb-6">
                    {aud.desc}
                  </p>

                  <div className="space-y-3 pt-3 border-t border-slate-100 mb-6">
                    {aud.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#15846e]/10 text-[#15846e] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-[13.5px] text-slate-700 leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-[14px] font-bold uppercase tracking-wider transition-all ${
                      aud.featured
                        ? 'bg-[#8052ff] hover:bg-[#6e3df0] text-white shadow-md'
                        : 'bg-slate-50 hover:bg-[#8052ff] text-slate-700 hover:text-white border border-slate-200 hover:border-[#8052ff]'
                    }`}
                  >
                    <span>{aud.btnText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
