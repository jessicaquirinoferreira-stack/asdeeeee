import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, Sparkles } from 'lucide-react';
import { Article } from '../services/firebase';

interface EducationalArticlesProps {
  articles: Article[];
}

export const EducationalArticles: React.FC<EducationalArticlesProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="artigos" className="py-20 lg:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15846e]/10 text-[#15846e] text-[12px] font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Conhecimento & Orientações</span>
          </div>
          <h2 className="text-[34px] sm:text-[44px] lg:text-[48px] font-normal tracking-tight text-slate-900 leading-[1.15]">
            Artigos e Conteúdo Educativo
          </h2>
          <p className="text-[17px] sm:text-[18px] text-slate-600 leading-relaxed">
            Informações embasadas em neurociência para ajudar pais, cuidadores e profissionais a compreenderem a visão funcional.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <div
              key={art.id || idx}
              className="bg-white rounded-[24px] border border-slate-200/90 p-7 shadow-sm hover:shadow-xl hover:border-[#8052ff]/40 transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedArticle(art)}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#8052ff]/10 text-[#8052ff] border border-[#8052ff]/20">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="text-[20px] font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#8052ff] transition-colors">
                  {art.title}
                </h3>

                <p className="text-[14.5px] text-slate-600 leading-relaxed line-clamp-3 mb-6">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[13.5px] font-bold text-[#8052ff] uppercase tracking-wider group-hover:underline flex items-center gap-1">
                  <span>Ler artigo completo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-[28px] max-w-2xl w-full p-6 sm:p-9 shadow-2xl border border-slate-200 relative my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Category & Time */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#8052ff]/10 text-[#8052ff] border border-[#8052ff]/20">
                {selectedArticle.category}
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedArticle.readTime}
              </span>
            </div>

            {/* Modal Title */}
            <h3 className="text-[24px] sm:text-[30px] font-bold text-slate-900 mb-6 leading-tight">
              {selectedArticle.title}
            </h3>

            {/* Modal Body */}
            <div className="text-[16px] text-slate-700 leading-relaxed space-y-4 whitespace-pre-line border-t border-slate-100 pt-6">
              {selectedArticle.content}
            </div>

            {/* Footer inside modal */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Publicado por Estimulação Visual Brasil
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                Fechar Artigo
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
