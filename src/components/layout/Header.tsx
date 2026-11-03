import React from 'react';
import { Plus, Sun, Moon, Sparkles } from 'lucide-react';
import { UserProfile } from '../../types/dayflow';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  user: UserProfile;
  onOpenQuickCreate: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onOpenQuickCreate }) => {
  const { theme, toggleTheme } = useTheme();

  // Dynamic greeting based on hour
  const getGreetingData = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return {
        greeting: 'Bom dia',
        subtext: 'Organize seu foco matinal e viva com intenção.',
      };
    }
    if (hour >= 12 && hour < 18) {
      return {
        greeting: 'Boa tarde',
        subtext: 'Mantenha o ritmo no que realmente gera valor.',
      };
    }
    return {
      greeting: 'Boa noite',
      subtext: 'Revise suas vitórias de hoje e desacelere com paz.',
    };
  };

  const { greeting, subtext } = getGreetingData();

  // Formatted date in pt-BR
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  // Capitalize first letter of weekday
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <header className="border-b border-[#E6E8E2] dark:border-[#243347] bg-[#FFFFFF]/80 dark:bg-[#141E2B]/80 backdrop-blur-md sticky top-0 z-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Greeting & Date Zone */}
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
              <span>{capitalizedDate}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-[#176044] dark:text-[#A8D5BA] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#D6A85C]" />
                Dia 14 de sequência
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#243047] dark:text-white mt-0.5">
              {greeting}, <span className="text-[#176044] dark:text-[#A8D5BA]">{user.name.split(' ')[0]}</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#556980] dark:text-[#94A3B8] mt-0.5">
              {subtext}
            </p>
          </div>

          {/* Action Zone: Demonstration badge, Theme Switch, Quick Create */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Subtle demo badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F2F5F0] dark:bg-[#1B293C] text-[11px] text-[#556980] dark:text-[#94A3B8] border border-[#E0E7DC] dark:border-[#283C55]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85C]" />
              <span>Ambiente Interativo 0.3</span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-[#E6E8E2] dark:border-[#283C55] bg-white dark:bg-[#1A2637] text-[#243047] dark:text-[#CBD5E1] hover:bg-[#F2F5F0] dark:hover:bg-[#202F44] transition-colors"
              title={theme === 'dark' ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
              aria-label="Alternar tema claro/escuro"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#D6A85C]" />
              ) : (
                <Moon className="w-4 h-4 text-[#243047]" />
              )}
            </button>

            {/* Quick Action Button */}
            <button
              onClick={onOpenQuickCreate}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#176044] hover:bg-[#134e37] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#D6A85C] stroke-[2.5]" />
              <span>Criar Rápido</span>
            </button>

            {/* User Avatar */}
            <div className="hidden sm:block">
              <img
                src={user.avatarUrl}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#176044] shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
