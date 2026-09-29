import React, { useState } from 'react';
import { Star, Quote, MessageSquareHeart, Play, Video, Sparkles, Heart } from 'lucide-react';
import { Testimonial } from '../services/firebase';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  // Find featured video testimonial if available
  const videoTestimonial = testimonials.find(t => Boolean(t.videoUrl));
  const otherTestimonials = testimonials.filter(t => t.id !== videoTestimonial?.id);

  const [isPlaying, setIsPlaying] = useState(false);

  // Clean Vimeo URL with optimal streaming flags
  const rawVideoUrl = videoTestimonial?.videoUrl || "https://player.vimeo.com/video/1231288791";
  const cleanVideoBase = rawVideoUrl.split('?')[0];
  const activeVideoUrl = `${cleanVideoBase}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=0&dnt=1&playsinline=1`;

  return (
    <section id="depoimentos" className="py-20 lg:py-28 bg-[#f8f9fc] border-t border-slate-200/80 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#8052ff]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#ffb829]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8052ff]/10 text-[#8052ff] text-[12px] font-bold uppercase tracking-wider">
            <MessageSquareHeart className="w-4 h-4" />
            <span>Histórias Reais & Transformações</span>
          </div>
          <h2 className="text-[34px] sm:text-[44px] lg:text-[48px] font-normal tracking-tight text-slate-900 leading-[1.15]">
            O que dizem as famílias atendidas
          </h2>
          <p className="text-[17px] sm:text-[18px] text-slate-600 leading-relaxed">
            Cada evolução visual representa um passo gigante na independência, no aprendizado e no bem-estar dos nossos pacientes.
          </p>
        </div>

        {/* FEATURED VIDEO TESTIMONIAL (Rafael & Michele) */}
        {videoTestimonial && (
          <div className="mb-14">
            <div className="bg-white rounded-[32px] border-2 border-[#8052ff]/30 p-6 sm:p-10 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group">
              
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8052ff] via-[#ffb829] to-[#15846e]"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Responsive High-Performance Video Player */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  <div className="relative rounded-[24px] overflow-hidden bg-slate-950 border-2 border-slate-200/80 shadow-lg group-hover:border-[#8052ff]/50 transition-all">
                    
                    {/* Badge on top of video */}
                    <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white border border-white/20 text-xs font-bold uppercase tracking-wider pointer-events-none">
                      <Video className="w-3.5 h-3.5 text-[#ffb829]" />
                      <span>Vídeo Depoimento</span>
                    </div>

                    {/* Responsive Container */}
                    <div className="relative w-full pb-[75%] sm:pb-[70%] bg-slate-900 overflow-hidden">
                      {isPlaying ? (
                        <iframe
                          src={activeVideoUrl}
                          className="absolute top-0 left-0 w-full h-full border-0"
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                          allowFullScreen
                          loading="eager"
                          title={`Depoimento de ${videoTestimonial.name}`}
                        ></iframe>
                      ) : (
                        /* Smooth Instant-Play Poster Screen - Zero Page Lag */
                        <div
                          onClick={() => setIsPlaying(true)}
                          className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#1a1033] to-slate-950 text-white p-6 transition-all group-hover:scale-105"
                        >
                          {/* Radial Glow */}
                          <div className="absolute w-48 h-48 bg-[#8052ff]/30 rounded-full blur-2xl pointer-events-none"></div>

                          {/* Large Animated Play Button */}
                          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#8052ff] to-[#6e3df0] flex items-center justify-center shadow-2xl border-2 border-white/40 group-hover:scale-110 group-hover:shadow-[#8052ff]/50 transition-transform">
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                          </div>

                          <div className="relative z-10 text-center mt-4 space-y-1">
                            <p className="text-base font-bold text-white tracking-wide">
                              Assistir ao Depoimento em Vídeo
                            </p>
                            <p className="text-xs text-slate-300">
                              Clique para reproduzir com áudio cristalino
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-medium px-1">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#8052ff]" />
                      <span>Evolução Real • 9 Anos de História</span>
                    </span>
                    <span>Michele, Rafa e família</span>
                  </div>
                </div>

                {/* Right Column: Narrative & Detailed Text */}
                <div className="lg:col-span-6 space-y-5 flex flex-col justify-between">
                  
                  <div>
                    {/* Rating and Quote */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-1 text-[#ffb829]">
                        {[...Array(videoTestimonial.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4.5 h-4.5 fill-[#ffb829]" />
                        ))}
                      </div>
                      <Quote className="w-9 h-9 text-[#8052ff]/20" />
                    </div>

                    {/* Formatted Text */}
                    <div className="text-[15px] sm:text-[15.5px] text-slate-700 leading-relaxed space-y-3.5 whitespace-pre-line italic">
                      "{videoTestimonial.text}"
                    </div>
                  </div>

                  {/* Author Card */}
                  <div className="pt-5 border-t border-slate-100 flex items-center gap-4">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#8052ff] to-[#15846e] text-white flex items-center justify-center font-bold text-base shadow-md shrink-0">
                      <Heart className="w-6 h-6 fill-white" />
                    </div>
                    <div>
                      <h4 className="text-[18px] font-bold text-slate-900 leading-tight">
                        {videoTestimonial.name}
                      </h4>
                      <p className="text-[13.5px] text-[#8052ff] font-semibold">
                        {videoTestimonial.role}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* Other Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherTestimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="bg-white rounded-[24px] border border-slate-200/80 p-8 shadow-sm hover:shadow-xl hover:border-[#8052ff]/30 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-[#ffb829]">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#ffb829]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#8052ff]/20 group-hover:text-[#8052ff]/40 transition-colors" />
                </div>

                {/* Body Text */}
                <p className="text-[15.5px] text-slate-700 leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-5 border-t border-slate-100 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#8052ff] to-[#15846e] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                  {t.name ? t.name.charAt(0).toUpperCase() : 'P'}
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-slate-900 leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-[13px] text-slate-500 font-medium">
                    {t.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
