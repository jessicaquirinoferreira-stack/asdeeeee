import React from 'react';
import { Eye, Shield, Heart, ArrowUp, Lock } from 'lucide-react';
import { SiteContent } from '../services/firebase';

interface FooterProps {
  content: SiteContent;
  onOpenAdmin: () => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ content, onOpenAdmin, onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanPhone = content.whatsappNumber ? content.whatsappNumber.replace(/\D/g, '') : '5541996222432';
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone}`;

  return (
    <footer className="bg-[#f8f9fc] border-t border-slate-200 text-slate-700 pt-16 pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-slate-200">
          
          {/* Column 1: Sobre & Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200 p-1 flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/pdywVngt/Gemini-Generated-Image-vxl628vxl628vxl6.png"
                  alt="Logo Estimulação Visual Brasil"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[17px] font-bold text-slate-900 leading-tight">
                  Estimulação Visual Brasil
                </span>
                <span className="text-[11px] font-bold tracking-[0.16em] text-[#8052ff] uppercase">
                  DARLENE KLOSTER
                </span>
              </div>
            </div>

            <p className="text-[14.5px] text-slate-600 leading-relaxed max-w-md pt-2">
              Atendimento clínico especializado em Estimulação Visual Modulada, Neurovisão, Reeducação Visuopostural (RVP) e Baixa Visão/DVC. Desenvolvendo a visão funcional com respeito, embasamento científico e afeto.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-[#15846e]"></span>
              <span>Curitiba - PR • Consultorias Online para todo o Brasil</span>
            </div>
          </div>

          {/* Column 2: Contato Direto & Links Rápidos */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[15px] font-bold uppercase tracking-wider text-slate-900">
              Contato & Agendamentos
            </h4>

            <ul className="space-y-3 text-[14.5px] text-slate-600">
              <li>
                <strong className="text-slate-800">WhatsApp:</strong>{' '}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8052ff] transition-colors"
                >
                  {content.phoneNumber || '(41) 99622-2432'}
                </a>
              </li>
              <li>
                <strong className="text-slate-800">E-mail:</strong>{' '}
                <a
                  href={`mailto:${content.email || 'contato@estimulacaovisualbrasil.com.br'}`}
                  className="hover:text-[#8052ff] transition-colors"
                >
                  {content.email || 'contato@estimulacaovisualbrasil.com.br'}
                </a>
              </li>
              <li>
                <strong className="text-slate-800">Atendimento:</strong>{' '}
                <span>Presencial com hora marcada & Teleorientação</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Redes Sociais & Navegação */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[15px] font-bold uppercase tracking-wider text-slate-900">
              Redes & Acesso Rápido
            </h4>

            <ul className="space-y-2.5 text-[14px]">
              <li>
                <a
                  href="https://www.instagram.com/darlingkloster"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-[#8052ff] font-medium transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                  <span>Instagram: <strong>@darlingkloster</strong></span>
                </a>
              </li>
              <li>
                <a href="#o-trabalho" className="text-slate-600 hover:text-[#8052ff] font-medium transition-colors">
                  O que é a Estimulação
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-slate-600 hover:text-[#8052ff] font-medium transition-colors">
                  Especialidades Clínicas
                </a>
              </li>
              <li>
                <a href="#artigos" className="text-slate-600 hover:text-[#8052ff] font-medium transition-colors">
                  Artigos e Guias Educativos
                </a>
              </li>
            </ul>

            <button
              onClick={scrollToTop}
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8052ff] hover:text-[#6e3df0]"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Voltar ao topo</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar with discrete Admin Link in the exact center */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} Estimulação Visual Brasil — Darlene Kloster. Todos os direitos reservados.
          </div>

          {/* DISCRETE ADMIN LINK IN THE CENTER */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-400 hover:text-[#8052ff] hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer text-xs font-semibold"
              title="Acesso Restrito da Administração"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-slate-400 hover:text-[#8052ff] hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer text-[11px] font-medium"
                title="Rever animação de abertura"
              >
                <span>Ver Intro 6s</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span>Tema Claro Oficial</span>
            <span>•</span>
            <span>Design Dala Clean</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
