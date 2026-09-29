import React from 'react';
import { Award, CheckCircle2, MessageCircle, Heart, BookOpen, Sparkles, GraduationCap } from 'lucide-react';
import { SiteContent } from '../services/firebase';

interface AboutSpecialistProps {
  content: SiteContent;
}

export const AboutSpecialist: React.FC<AboutSpecialistProps> = ({ content }) => {
  const cleanPhone = content.whatsappNumber ? content.whatsappNumber.replace(/\D/g, '') : '5541996222432';
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone}?text=${encodeURIComponent('Olá Darlene! Gostaria de agendar uma consulta diretamente com você.')}`;

  const credentials = [
    "Especialista em Estimulação Visual Modulada e Reabilitação Visual",
    "Formação em Neurovisão, Percepção Visual e Processamento Sensorial",
    "Capacitação em Deficiência Visual Cortical/Cerebral (DVC)",
    "Abordagens personalizadas para TEA, TDAH e Atrasos Globais do Desenvolvimento",
    "Certificação em Reeducação Visuopostural (RVP)",
    "Membro atuante em pesquisa clínica e aprimoramento contínuo em Neurociências",
  ];

  return (
    <section id="sobre-mim" className="py-20 lg:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait & Visual Badge */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[420px]">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-[#8052ff]/20 via-[#ffb829]/20 to-[#15846e]/20 blur-xl opacity-70"></div>
              
              {/* Main Card */}
              <div className="relative rounded-[32px] overflow-hidden bg-white p-3 border border-slate-200 shadow-xl">
                <div className="relative rounded-[26px] overflow-hidden aspect-[4/5] bg-slate-100">
                  <img
                    src="https://i.postimg.cc/2ysWzV2L/Chat-GPT-Image-23-de-jun-de-2026-18-29-04.png"
                    alt="Darlene Kloster - Especialista em Estimulação Visual"
                    className="w-full h-full object-cover object-[center_15%] transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/10 to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xl font-bold">Darlene Kloster</p>
                    <p className="text-xs text-white/95 uppercase tracking-widest font-semibold text-[#ffb829]">
                      Estimulação Visual & Neurovisão
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge with Logo */}
              <div className="absolute -bottom-5 -left-4 sm:left-4 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xl flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0">
                  <img
                    src="https://i.postimg.cc/pdywVngt/Gemini-Generated-Image-vxl628vxl628vxl6.png"
                    alt="Selo Estimulação Visual"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold text-slate-500">Compromisso Clínico</p>
                  <p className="text-[14px] font-bold text-slate-900">Acolhimento & Ciência</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Credentials */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8052ff]/10 text-[#8052ff] text-[12px] font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Conheça a Especialista</span>
            </div>

            <h2 className="text-[34px] sm:text-[44px] font-normal tracking-tight text-slate-900 leading-[1.15]">
              Darlene Kloster
            </h2>

            {/* Quote Block */}
            <blockquote className="p-5 rounded-2xl bg-[#f8f9fc] border-l-4 border-[#8052ff] text-slate-700 italic text-[16px] leading-relaxed">
              "{content.specialistQuote || 'Enxergar não é apenas receber luz nos olhos, é permitir que o cérebro compreenda, interaja e se encante com o mundo.'}"
            </blockquote>

            <p className="text-[16px] sm:text-[17px] text-slate-600 leading-relaxed font-normal">
              {content.aboutSpecialist || "Com anos de dedicação à saúde visual e neurodesenvolvimento, Darlene Kloster é especialista em Estimulação Visual e Reabilitação Neurofuncional. Seu trabalho une precisão técnica, sensibilidade humana e protocolos modernos baseados em neurociência para transformar o futuro visual de seus pacientes e trazer tranquilidade às famílias."}
            </p>

            <div className="pt-2">
              <h3 className="text-[17px] font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#8052ff]" />
                <span>Qualificações e Abordagem Clínica</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {credentials.map((cred, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f8f9fc] border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-[#15846e] shrink-0 mt-0.5" />
                    <span className="text-[13px] text-slate-700 leading-snug font-medium">{cred}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#8052ff] hover:bg-[#6e3df0] text-white text-[15px] font-semibold uppercase tracking-wider shadow-sm hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Agendar com a Especialista</span>
              </a>

              <span className="text-[13px] text-slate-500 font-medium">
                Atendimento presencial em Curitiba e consultoria online para todo o Brasil
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
