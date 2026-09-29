import React from 'react';
import { Target, Activity, Zap, Compass, CheckCircle2, HeartHandshake } from 'lucide-react';
import { SiteContent } from '../services/firebase';

interface WhatIsStimulationProps {
  content: SiteContent;
}

export const WhatIsStimulation: React.FC<WhatIsStimulationProps> = ({ content }) => {
  const benefits = [
    {
      icon: Target,
      title: "Fixação e Rastreamento Visual",
      desc: "Fortalece a capacidade de focar em objetos em movimento ou estáticos, aprimorando a precisão do olhar e reduzindo a perda de foco.",
      color: "bg-[#8052ff]/10 text-[#8052ff] border-[#8052ff]/20",
    },
    {
      icon: Activity,
      title: "Integração Visuomotora e Postura",
      desc: "Harmoniza a visão com o equilíbrio corporal, marcha e coordenação motora fina (como segurar lápis, talheres e alcançar brinquedos).",
      color: "bg-[#15846e]/10 text-[#15846e] border-[#15846e]/20",
    },
    {
      icon: Zap,
      title: "Redução da Sobrecarga Sensorial",
      desc: "Adequa os contrastes e luminosidades para evitar estresse, irritabilidade e fadiga visual rápida em ambientes escolares e cotidianos.",
      color: "bg-[#ffb829]/10 text-[#b45309] border-[#ffb829]/20",
    },
    {
      icon: Compass,
      title: "Autonomia e Conexão Social",
      desc: "Proporciona segurança para explorar espaços, interagir visualmente com as pessoas da família e participar ativamente das brincadeiras.",
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
  ];

  return (
    <section id="o-trabalho" className="py-20 lg:py-28 bg-[#f8f9fc] border-y border-slate-200/80">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8052ff]/10 text-[#8052ff] text-[12px] font-bold uppercase tracking-wider">
            <span>Compreendendo o Processo Terapêutico</span>
          </div>
          <h2 className="text-[34px] sm:text-[44px] lg:text-[48px] font-normal tracking-tight text-slate-900 leading-[1.15]">
            O que é a Estimulação Visual Modulada?
          </h2>
          <p className="text-[17px] sm:text-[18px] text-slate-600 leading-relaxed">
            {content.aboutText1 || "A Estimulação Visual Modulada é uma abordagem terapêutica especializada que potencializa a eficiência das vias visuais e das conexões neurais. O cérebro aprende a ver através da neuroplasticidade."}
          </p>
        </div>

        {/* 2-Column Content + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Image of children running / nature / therapy */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-[28px] overflow-hidden border border-slate-200/80 shadow-md bg-white p-2">
              <div className="relative rounded-[22px] overflow-hidden aspect-[4/3] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=1000&auto=format&fit=crop"
                  alt="Crianças brincando ao ar livre com autonomia e visão funcional"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs uppercase tracking-widest font-semibold text-[#ffb829]">Neuroplasticidade Visual</p>
                  <p className="text-base font-semibold">Transformando o potencial da visão em qualidade de vida diária.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Scientific Approach & Explanation */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <h3 className="text-[26px] sm:text-[30px] font-normal text-slate-900 leading-snug">
              Enxergar é um processo cerebral que pode ser estimulado e reabilitado
            </h3>
            
            <p className="text-[16px] text-slate-600 leading-relaxed">
              {content.aboutText2 || "Trabalhamos de forma acolhedora, científica e lúdica para que cada paciente desenvolva o máximo do seu potencial visual funcional nas atividades do dia a dia, escolares e sociais."}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#15846e] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <p className="text-[15px] text-slate-700">
                  <strong className="text-slate-900">Estímulos com controle de intensidade:</strong> Luminosidade, cores contrastantes, filtros ópticos e distâncias adaptadas.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#8052ff] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <p className="text-[15px] text-slate-700">
                  <strong className="text-slate-900">Treinamento específico de vias ópticas:</strong> Fixação, sacadas, perseguição e percepção de profundidade espacial.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#ffb829] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <p className="text-[15px] text-slate-700">
                  <strong className="text-slate-900">Orientação contínua da família e escola:</strong> Adaptações práticas para o ambiente cotidiano potencializar os ganhos clínicos.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#8052ff]/10 text-[#8052ff] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <p className="text-sm text-slate-700 font-medium">
                Protocolos individualizados respeitando o ritmo sensorial e as particularidades neurológicas de cada pessoa.
              </p>
            </div>

          </div>

        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="card-soft p-6 flex flex-col justify-between bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${b.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-[18px] font-semibold text-slate-900 mb-2 leading-snug">
                    {b.title}
                  </h4>
                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
