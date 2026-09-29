import React, { useState } from 'react';
import { MessageCircle, Menu, X, Eye, Phone, Sparkles, Instagram } from 'lucide-react';
import { SiteContent } from '../services/firebase';

interface HeaderProps {
  content: SiteContent;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ content }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanPhone = content.whatsappNumber ? content.whatsappNumber.replace(/\D/g, '') : '5541996222432';
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone}?text=${encodeURIComponent('Olá, Darlene! Gostaria de informações sobre a Estimulação Visual e agendar uma avaliação.')}`;
  const instagramUrl = "https://www.instagram.com/darlingkloster";

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'O Trabalho', href: '#o-trabalho' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Público', href: '#publico' },
    { name: 'Sobre Mim', href: '#sobre-mim' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Artigos', href: '#artigos' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200/80 p-1 flex items-center justify-center group-hover:scale-105 group-hover:border-[#8052ff]/40 transition-all">
              <img
                src="https://i.postimg.cc/pdywVngt/Gemini-Generated-Image-vxl628vxl628vxl6.png"
                alt="Logo Estimulação Visual Brasil - Darlene Kloster"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] font-bold tracking-tight text-slate-900 group-hover:text-[#8052ff] transition-colors leading-tight">
                Estimulação Visual
              </span>
              <span className="text-[11px] font-bold tracking-[0.18em] text-[#8052ff] uppercase">
                DARLENE KLOSTER
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-[14px] font-semibold uppercase tracking-[0.025em] text-slate-600 hover:text-[#8052ff] hover:bg-[#8052ff]/5 rounded-xl transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTA & Instagram */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white text-[13.5px] font-bold shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all"
              title="Instagram Oficial @darlingkloster"
            >
              <Instagram className="w-4 h-4" />
              <span className="hidden xl:inline">@darlingkloster</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8052ff] hover:bg-[#6e3df0] text-white text-[14px] font-semibold tracking-[0.025em] uppercase shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button & Mobile Instagram */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-sm"
              aria-label="Instagram Oficial"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#8052ff] text-white sm:hidden shadow-sm"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4.5 h-4.5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-[14px] font-semibold uppercase tracking-wider text-slate-700 hover:text-[#8052ff] hover:bg-slate-50 rounded-xl"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 space-y-2">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-[13.5px] font-bold shadow-sm"
            >
              <Instagram className="w-4 h-4" />
              <span>Seguir no Instagram @darlingkloster</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#8052ff] text-white text-[14px] font-semibold uppercase tracking-wider shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

