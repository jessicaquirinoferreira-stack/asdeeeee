import React from 'react';
import { Eye, Layers, Compass, Brain, ArrowUpRight, CheckCircle } from 'lucide-react';
import { SiteContent } from '../services/firebase';

interface SpecialtiesProps {
  content: SiteContent;
}

export const Specialties: React.FC<SpecialtiesProps> = ({ content }) => {
  const cleanPhone = content.whatsappNumber ? content.whatsappNumber.replace(/\D/g, '') : '5541996222432';

  const specialtiesList = [
    {
      id: "avaliacao",
      icon: Eye,
      title: "Avaliação Funcional da Visão",
      subtitle: "Mapeamento aprofundado do uso da visão",
      desc: "Investigação detalhada de como o paciente processa as informações visuais na prática: fixação, perseguição, campo visual, sensibilidade ao contraste, percepção de profundidade e coordenação olhar-mão.",
      points: [
        "Identificação precoce de atrasos nas respostas visuais",
        "Diferenciação entre acuidade clínica e eficiência funcional",
        "Elaboração do Plano Terapêutico Singular e metas claras",
      ],
      tag: "Diagnóstico Funcional",
      badgeColor: "bg-[#8052ff]/10 text-[#8052ff] border-[#8052ff]/20",
    },
    {
      id: "baixa-visao-dvc",
      icon: Layers,
      title: "Estimulação Visual (Baixa Visão & DVC)",
      subtitle: "Maximizando o potencial visual residual",
      desc: "Intervenção especializada voltada para crianças e adultos com Baixa Visão e Deficiência Visual Cortical/Cerebral (DVC), utilizando luzes de alta intensidade, objetos com saturação específica e recursos de apoio.",
      points: [
        "Estímulo do córtex occipital e das áreas de integração",
        "Adaptação de contrastes, cores âncora e iluminação",
        "Superação da latência e da complexidade visual do ambiente",
      ],
      tag: "Reabilitação Especializada",
      badgeColor: "bg-[#ffb829]/10 text-[#b45309] border-[#ffb829]/20",
    },
    {
      id: "rvp",
      icon: Compass,
      title: "Reeducação Visuopostural (RVP)",
      subtitle: "Alinhamento entre o olhar, corpo e espaço",
      desc: "A visão comanda a postura. A RVP harmoniza as assimetrias posturais, inclinações de cabeça e dificuldades de equilíbrio decorrentes de desequilíbrios na musculatura extraocular ou integração vestibular.",
      points: [
        "Melhora do equilíbrio corporal e da marcha",
        "Redução de dores cervicais, tonturas e cansaço ao ler",
        "Aumento da estabilidade corporal nas atividades do dia a dia",
      ],
      tag: "Postura & Equilíbrio",
      badgeColor: "bg-[#15846e]/10 text-[#15846e] border-[#15846e]/20",
    },
    {
      id: "tea-tdah",
      icon: Brain,
      title: "Neurovisão para TEA e TDAH",
      subtitle: "Atenção, regulação e modulação de estímulos",
      desc: "Abordagem focada nas alterações sensório-visuais frequentes no autismo e déficit de atenção, como sensibilidade excessiva a luzes, instabilidade sacádica e dificuldades em manter a atenção sustentada.",
      points: [
        "Aprimoramento do contato visual natural e sem sobrecarga",
        "Treinamento de rastreio ocular para favorecer a alfabetização",
        "Organização sensorial para reduzir a agitação e dispersão",
      ],
      tag: "Neurodesenvolvimento",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    },
  ];

  return (
    <section id="servicos" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15846e]/10 text-[#15846e] text-[12px] font-bold uppercase tracking-wider">
            <span>Áreas de Excelência</span>
          </div>
          <h2 className="text-[34px] sm:text-[44px] lg:text-[48px] font-normal tracking-tight text-slate-900 leading-[1.15]">
            Especialidades de Atuação
          </h2>
          <p className="text-[17px] sm:text-[18px] text-slate-600 leading-relaxed">
            Metodologias consagradas e individualizadas para acolher as necessidades visuais de cada fase do desenvolvimento.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specialtiesList.map((spec) => {
            const Icon = spec.icon;
            const waText = encodeURIComponent(`Olá! Tenho interesse em saber mais sobre ${spec.title}.`);
            const specWaUrl = `https://wa.me/${cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone}?text=${waText}`;

            return (
              <div
                key={spec.id}
                className="bg-white rounded-[24px] border border-slate-200/90 p-7 sm:p-9 shadow-sm hover:shadow-xl hover:border-[#8052ff]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-[#8052ff]/10 text-[#8052ff] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#8052ff] group-hover:text-white transition-all">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${spec.badgeColor}`}>
                      {spec.tag}
                    </span>
                  </div>

                  <h3 className="text-[22px] sm:text-[24px] font-bold text-slate-900 mb-1 leading-snug group-hover:text-[#8052ff] transition-colors">
                    {spec.title}
                  </h3>
                  
                  <p className="text-[13px] font-medium text-[#15846e] mb-4">
                    {spec.subtitle}
                  </p>

                  <p className="text-[15px] text-slate-600 leading-relaxed mb-6">
                    {spec.desc}
                  </p>

                  <div className="space-y-2.5 pt-2 border-t border-slate-100 mb-6">
                    {spec.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#15846e] shrink-0 mt-0.5" />
                        <span className="text-[13.5px] text-slate-700 leading-tight">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={specWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#8052ff] hover:text-[#6e3df0] uppercase tracking-wider group-hover:translate-x-1 transition-all"
                  >
                    <span>Conversar sobre este serviço</span>
                    <ArrowUpRight className="w-4 h-4" />
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
