import React from 'react';
import { MessageCircle, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Brain, Eye } from 'lucide-react';
import { SiteContent } from '../services/firebase';

interface HeroProps {
  content: SiteContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const cleanPhone = content.whatsappNumber ? content.whatsappNumber.replace(/\D/g, '') : '5541996222432';
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone}?text=${encodeURIComponent('Olá! Gostaria de agendar uma Avaliação Funcional da Visão com a Darlene Kloster.')}`;

  return (
    <section id="inicio" className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-white via-[#f8f9fc] to-white">
      {/* Subtle background ambient elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8052ff]/5 rounded-full blur-3xl pointer-events-none -mr-40 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#ffb829]/5 rounded-full blur-3xl pointer-events-none -ml-32 -mb-20"></div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Small Badge with Logo */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#ffb829]/10 border border-[#ffb829]/30 text-[#b45309] text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.05em]">
              <img
                src="https://i.postimg.cc/pdywVngt/Gemini-Generated-Image-vxl628vxl628vxl6.png"
                alt="Logo"
                className="w-5 h-5 object-contain rounded-full bg-white p-0.5 border border-[#ffb829]/40"
              />
              <span>{content.heroBadge || "ESTIMULAÇÃO VISUAL MODULADA & NEUROVISÃO"}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[38px] sm:text-[50px] md:text-[56px] lg:text-[62px] font-normal tracking-[-0.035em] text-slate-900 leading-[1.08]">
              {content.heroTitle || "Estimulação Visual para uma vida com mais clareza e autonomia"}
            </h1>

            {/* Subtitle */}
            <p className="text-[17px] sm:text-[19px] text-slate-600 font-normal leading-relaxed max-w-[620px]">
              {content.heroSubtitle || "Avaliação funcional da visão, reabilitação neurovisual e estimulação modulada individualizada para bebês, crianças, neurodivergentes (TEA/TDAH) e adultos."}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#8052ff] hover:bg-[#6e3df0] text-white text-[15px] font-semibold uppercase tracking-[0.025em] shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Agendar Avaliação pelo WhatsApp</span>
              </a>

              <a
                href="#o-trabalho"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#8052ff] text-slate-700 hover:text-[#8052ff] text-[15px] font-semibold uppercase tracking-[0.025em] transition-all"
              >
                <span>Conhecer meu trabalho</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/80 w-full grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#15846e]/10 text-[#15846e] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-[13px] font-medium text-slate-700 leading-tight">Neurociência Aplicada</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#8052ff]/10 text-[#8052ff] flex items-center justify-center shrink-0">
                  <Brain className="w-4 h-4" />
                </div>
                <span className="text-[13px] font-medium text-slate-700 leading-tight">Especialista em DVC & TEA</span>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-full bg-[#ffb829]/10 text-[#b45309] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[13px] font-medium text-slate-700 leading-tight">Presencial & Teleorientação</span>
              </div>
            </div>

          </div>

          {/* Right Column - Visual Graphic with Realistic Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[480px] lg:max-w-none">
              
              {/* Main Card Container */}
              <div className="relative rounded-[28px] overflow-hidden p-2 bg-gradient-to-b from-slate-100 to-slate-200 border border-slate-200 shadow-xl">
                <div className="relative rounded-[22px] overflow-hidden bg-slate-900 aspect-[4/4.2]">
                  
                  {/* High Quality Photorealistic Placeholder */}
                  <img
                    src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop"
                    alt="Criança em atividade de estimulação e desenvolvimento neurovisual"
                    className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent"></div>

                  {/* Highlight text on photo */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/50 text-slate-900 shadow-lg">
                    <div className="flex items-center gap-2 text-[#8052ff] text-xs font-bold uppercase tracking-wider mb-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Atendimento Humanizado</span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 leading-snug">
                      Desenvolvendo o potencial da visão funcional através da neuroplasticidade e do brincar terapêutico.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card Top-Left */}
              <div className="hidden sm:flex absolute -top-4 -left-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-lg items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-[#8052ff] text-white flex items-center justify-center font-bold text-sm">
                  +10
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Anos de Prática</p>
                  <p className="text-[14px] font-bold text-slate-900">Saúde Neurovisual</p>
                </div>
              </div>

              {/* Floating Stat Card Bottom-Right with Official Logo */}
              <div className="hidden sm:flex absolute -bottom-6 -right-6 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xl items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center">
                  <img
                    src="https://i.postimg.cc/pdywVngt/Gemini-Generated-Image-vxl628vxl628vxl6.png"
                    alt="Emblema"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Estimulação Oficial</p>
                  <p className="text-[14px] font-bold text-slate-900">Método Modulado</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
