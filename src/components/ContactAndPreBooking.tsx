import React, { useState } from 'react';
import { Phone, Mail, Instagram, MapPin, Send, MessageCircle, CheckCircle2, Clock, Calendar, Sparkles } from 'lucide-react';
import { SiteContent, submitAppointment } from '../services/firebase';
import confetti from 'canvas-confetti';

interface ContactAndPreBookingProps {
  content: SiteContent;
}

export const ContactAndPreBooking: React.FC<ContactAndPreBookingProps> = ({ content }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [caseDescription, setCaseDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cleanPhone = content.whatsappNumber ? content.whatsappNumber.replace(/\D/g, '') : '5541996222432';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !caseDescription.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Submit to Firestore
      await submitAppointment({
        name,
        phone,
        email: email || undefined,
        patientAge: patientAge || undefined,
        caseDescription,
      });

      // 2. Trigger confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8052ff', '#ffb829', '#15846e'],
      });

      setIsSuccess(true);

      // 3. Format message for WhatsApp
      const msg = `*Novo Pré-Agendamento - Site*\n\n` +
        `👤 *Nome:* ${name}\n` +
        `📱 *WhatsApp:* ${phone}\n` +
        (patientAge ? `🎂 *Idade/Paciente:* ${patientAge}\n` : '') +
        (email ? `✉️ *E-mail:* ${email}\n` : '') +
        `📝 *Descrição do Caso:* ${caseDescription}\n\n` +
        `_Enviado pelo formulário oficial de Pré-Agendamento._`;

      const targetWaUrl = `https://wa.me/${cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone}?text=${encodeURIComponent(msg)}`;

      // Open WhatsApp in new tab after 800ms
      setTimeout(() => {
        window.open(targetWaUrl, '_blank');
      }, 700);

    } catch (err) {
      console.error("Error submitting appointment:", err);
      alert("Ocorreu um erro ao enviar seu pré-agendamento. Você pode clicar no botão de WhatsApp diretamente!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/${cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone}?text=${encodeURIComponent('Olá Darlene! Gostaria de agendar uma avaliação.')}`;

  return (
    <section id="contato" className="py-20 lg:py-28 bg-white border-t border-slate-200/80 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8052ff]/10 text-[#8052ff] text-[12px] font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Atendimento & Pré-Agendamento</span>
          </div>
          <h2 className="text-[34px] sm:text-[44px] lg:text-[48px] font-normal tracking-tight text-slate-900 leading-[1.15]">
            Dê o primeiro passo para transformar a visão de quem você ama
          </h2>
          <p className="text-[17px] sm:text-[18px] text-slate-600 leading-relaxed">
            Preencha o formulário abaixo para registrar seu caso e iniciar seu atendimento direto pelo WhatsApp com a nossa equipe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards & Warm info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-[24px] bg-[#f8f9fc] border border-slate-200 space-y-6">
              <h3 className="text-[22px] font-bold text-slate-900 leading-snug">
                Canais de Contato Direto
              </h3>
              
              <p className="text-[15px] text-slate-600 leading-relaxed">
                Estamos à disposição para esclarecer suas dúvidas sobre diagnósticos, procedimentos e disponibilidade de horários.
              </p>

              <div className="space-y-4 pt-2">
                
                {/* WhatsApp */}
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#8052ff] shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#8052ff]/10 text-[#8052ff] flex items-center justify-center shrink-0 group-hover:bg-[#8052ff] group-hover:text-white transition-colors">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[12px] uppercase font-bold text-slate-500">WhatsApp / Avaliações</p>
                    <p className="text-[16px] font-bold text-slate-900">{content.phoneNumber || '(41) 99622-2432'}</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${content.email || 'contato@estimulacaovisualbrasil.com.br'}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#8052ff] shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#15846e]/10 text-[#15846e] flex items-center justify-center shrink-0 group-hover:bg-[#15846e] group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[12px] uppercase font-bold text-slate-500">E-mail Profissional</p>
                    <p className="text-[15px] font-bold text-slate-900 truncate">{content.email || 'contato@estimulacaovisualbrasil.com.br'}</p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/darlingkloster"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#8052ff] shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[12px] uppercase font-bold text-slate-500">Siga no Instagram</p>
                    <p className="text-[15px] font-bold text-slate-900">@darlingkloster</p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[12px] uppercase font-bold text-slate-500">Localização e Atendimentos</p>
                    <p className="text-[14.5px] font-bold text-slate-900 leading-snug">{content.address || 'Atendimento Clínico Especializado'}</p>
                    <p className="text-[13px] text-slate-600">{content.city || 'Curitiba - PR & Teleorientação Brasil'}</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Right Column: Pre-Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[28px] border border-slate-200 p-8 sm:p-10 shadow-xl">
              
              <div className="mb-8">
                <h3 className="text-[24px] sm:text-[28px] font-bold text-slate-900 leading-tight mb-2">
                  Formulário de Pré-Agendamento
                </h3>
                <p className="text-[15px] text-slate-600">
                  Preencha as informações para que possamos entender o quadro e direcionar o melhor formato de atendimento.
                </p>
              </div>

              {isSuccess ? (
                <div className="p-8 rounded-2xl bg-[#e6f7f3] border border-[#ccfbf1] text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#15846e] text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#115e59]">
                    Pré-Agendamento Enviado com Sucesso!
                  </h4>
                  <p className="text-[15px] text-slate-700 max-w-md mx-auto leading-relaxed">
                    Seus dados foram salvos com segurança. Você está sendo redirecionado para o WhatsApp para confirmar seu horário.
                  </p>
                  <div className="pt-3">
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8052ff] hover:bg-[#6e3df0] text-white font-bold text-sm uppercase tracking-wider shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Abrir WhatsApp Agora
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-[13.5px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Nome do Responsável / Solicitante <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Mariana Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-[#8052ff] focus:ring-2 focus:ring-[#8052ff]/20 outline-none text-slate-900 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Phone & Age */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13.5px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Celular / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(41) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-[#8052ff] focus:ring-2 focus:ring-[#8052ff]/20 outline-none text-slate-900 transition-all placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Idade do Paciente
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 3 anos / Adulto"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-[#8052ff] focus:ring-2 focus:ring-[#8052ff]/20 outline-none text-slate-900 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[13.5px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                      E-mail (opcional)
                    </label>
                    <input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-[#8052ff] focus:ring-2 focus:ring-[#8052ff]/20 outline-none text-slate-900 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Case Description */}
                  <div>
                    <label className="block text-[13.5px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Breve Descrição do Caso / Dúvidas <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Descreva o que tem observado: dificuldades visuais, diagnóstico médico (DVC, TEA, estrabismo, prematuridade, etc.) ou objetivos da família..."
                      value={caseDescription}
                      onChange={(e) => setCaseDescription(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-[#8052ff] focus:ring-2 focus:ring-[#8052ff]/20 outline-none text-slate-900 transition-all placeholder:text-slate-400 resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-full bg-[#8052ff] hover:bg-[#6e3df0] text-white text-[15px] font-bold uppercase tracking-wider shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                        <span>Registrando Pré-Agendamento...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Enviar Pré-Agendamento & Conversar no WhatsApp</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-500 pt-1">
                    🔒 Seus dados são confidenciais e utilizados exclusivamente para o contato clínico.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
