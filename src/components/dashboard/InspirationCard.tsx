import React, { useState } from 'react';
import { Sparkles, Heart, RefreshCw, Quote, Compass } from 'lucide-react';
import { DailyInspiration } from '../../types/dayflow';

interface InspirationCardProps {
  inspirations: DailyInspiration[];
  onToggleFavorite?: (id: string) => void;
}

export const InspirationCard: React.FC<InspirationCardProps> = ({
  inspirations,
  onToggleFavorite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = inspirations[currentIndex] || inspirations[0];

  const handleNextInspiration = () => {
    setCurrentIndex((prev) => (prev + 1) % inspirations.length);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#E0E7DC] dark:border-[#223348] bg-white dark:bg-[#15202E] shadow-sm transition-all duration-200">
      {/* Editorial Backdrop with Soft Scrim */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden">
        <img
          src="/src/assets/images/morning_serenity_inspiration_1793714026476.jpg"
          alt="Alvorada inspiradora DAYFLOW"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15202E] via-[#176044]/70 to-[#176044]/30" />

        {/* Top Badges & Actions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-black/30 backdrop-blur-xs text-[#D6A85C]">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold tracking-wide uppercase text-[#E6F0E9]">
              Inspiração do Dia
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleFavorite && onToggleFavorite(current.id)}
              className="p-2 rounded-lg bg-black/30 backdrop-blur-xs hover:bg-black/50 text-white transition-colors"
              title={current.isFavorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
              aria-label="Favoritar reflexão"
            >
              <Heart
                className={`w-4 h-4 ${
                  current.isFavorite ? 'fill-[#D6A85C] text-[#D6A85C]' : 'text-white'
                }`}
              />
            </button>

            <button
              onClick={handleNextInspiration}
              className="p-2 rounded-lg bg-black/30 backdrop-blur-xs hover:bg-black/50 text-white transition-colors flex items-center gap-1 text-xs"
              title="Ver outra reflexão inspiradora"
              aria-label="Ver outra reflexão"
            >
              <RefreshCw className="w-4 h-4 text-[#D6A85C]" />
              <span className="hidden sm:inline text-xs font-medium">Outra</span>
            </button>
          </div>
        </div>

        {/* Word of the Day Title Overlay */}
        <div className="absolute bottom-4 left-5 right-5 z-10 text-white">
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-serif sm:font-sans">
              {current.word}
            </span>
            <span className="text-xs text-[#E6F0E9]/80 font-mono">
              {current.phonetic}
            </span>
            <span className="text-xs text-[#D6A85C] italic">
              · {current.grammaticalClass}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#E6F0E9] mt-1 max-w-2xl line-clamp-2">
            {current.meaning}
          </p>
        </div>
      </div>

      {/* Quote & Reflection Body */}
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5 divide-y md:divide-y-0 md:divide-x divide-[#EAEFE8] dark:divide-[#243448]">
        {/* Quote section */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#176044] dark:text-[#D6A85C] mb-2">
              <Quote className="w-3.5 h-3.5" />
              <span>Frase para o dia</span>
            </div>
            <blockquote className="text-sm sm:text-base text-[#243047] dark:text-[#F1F5F9] font-medium leading-relaxed italic">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
          </div>
          <div className="mt-3 pt-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
            <span className="font-semibold text-[#243047] dark:text-white">{current.author}</span>
            {current.authorRole && (
              <span className="ml-1 text-[11px]">· {current.authorRole}</span>
            )}
          </div>
        </div>

        {/* Provocative Reflection */}
        <div className="pt-4 md:pt-0 md:pl-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#176044] dark:text-[#A8D5BA] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D6A85C]" />
              <span>Reflexão Prática</span>
            </div>
            <p className="text-sm text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
              {current.reflection}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[#8C9BAE] dark:text-[#64748B]">
            <span>Reflexão #{currentIndex + 1} de {inspirations.length}</span>
            <span className="text-[#176044] dark:text-[#A8D5BA] font-medium">
              DAYFLOW Inspiração
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
