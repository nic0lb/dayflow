import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Plus,
  Menu,
  X,
  FileText,
  Sparkles,
  Target,
  History,
  Settings,
  Sun,
  Moon,
  Compass,
} from 'lucide-react';
import { NavigationModule, UserProfile } from '../../types/dayflow';
import { useTheme } from '../../context/ThemeContext';

interface MobileNavProps {
  activeModule: NavigationModule;
  onSelectModule: (module: NavigationModule) => void;
  onOpenQuickCreate: () => void;
  user: UserProfile;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeModule,
  onSelectModule,
  onOpenQuickCreate,
  user,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleSelect = (module: NavigationModule) => {
    onSelectModule(module);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Bottom Floating/Dock Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#141E2B]/95 backdrop-blur-md border-t border-[#E6E8E2] dark:border-[#243347] px-3 py-1.5 shadow-lg select-none">
        <div className="flex items-center justify-around h-12 max-w-md mx-auto">
          {/* Início */}
          <button
            onClick={() => handleSelect('inicio')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              activeModule === 'inicio'
                ? 'text-[#176044] dark:text-[#A8D5BA] font-semibold'
                : 'text-[#64748B] dark:text-[#94A3B8]'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Início</span>
          </button>

          {/* Agenda */}
          <button
            onClick={() => handleSelect('agenda')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              activeModule === 'agenda'
                ? 'text-[#176044] dark:text-[#A8D5BA] font-semibold'
                : 'text-[#64748B] dark:text-[#94A3B8]'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Agenda</span>
          </button>

          {/* Quick Create Action (+) */}
          <button
            onClick={onOpenQuickCreate}
            aria-label="Criar novo item rapidamente"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-[#176044] text-[#D6A85C] shadow-md -mt-4 active:scale-95 transition-transform border-2 border-white dark:border-[#141E2B]"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Tarefas */}
          <button
            onClick={() => handleSelect('tarefas')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              activeModule === 'tarefas'
                ? 'text-[#176044] dark:text-[#A8D5BA] font-semibold'
                : 'text-[#64748B] dark:text-[#94A3B8]'
            }`}
          >
            <CheckSquare className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Tarefas</span>
          </button>

          {/* Menu Drawer Toggle */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              drawerOpen ? 'text-[#176044] dark:text-[#A8D5BA]' : 'text-[#64748B] dark:text-[#94A3B8]'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Mais</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop and Sheet */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="relative z-10 bg-white dark:bg-[#141E2B] rounded-t-2xl p-6 shadow-2xl border-t border-[#E6E8E2] dark:border-[#243347] max-h-[85vh] overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#F0F2EC] dark:border-[#1E2C3D] mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#176044] text-white flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#D6A85C]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#176044] dark:text-[#E6F0E9]">DAYFLOW</h3>
                  <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">Módulos adicionais</p>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F2F5F0] dark:hover:bg-[#1E2C3D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User profile row in drawer */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F7F8F4] dark:bg-[#1A2534] mb-4">
              <img
                src={user.avatarUrl}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#243047] dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] truncate">{user.email}</p>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white dark:bg-[#223348] text-[#243047] dark:text-[#D6A85C] shadow-xs"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Menu List */}
            <div className="space-y-1.5">
              <button
                onClick={() => handleSelect('anotacoes')}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium ${
                  activeModule === 'anotacoes'
                    ? 'bg-[#176044] text-white'
                    : 'text-[#243047] dark:text-[#CBD5E1] hover:bg-[#F2F5F0] dark:hover:bg-[#1B283A]'
                }`}
              >
                <FileText className="w-4 h-4 text-[#D6A85C]" />
                <span>Anotações e Ideias</span>
              </button>

              <button
                onClick={() => handleSelect('inspiracao')}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium ${
                  activeModule === 'inspiracao'
                    ? 'bg-[#176044] text-white'
                    : 'text-[#243047] dark:text-[#CBD5E1] hover:bg-[#F2F5F0] dark:hover:bg-[#1B283A]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#D6A85C]" />
                <span>Inspiração Diária</span>
              </button>

              <button
                onClick={() => handleSelect('objetivos-habitos')}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium ${
                  activeModule === 'objetivos-habitos'
                    ? 'bg-[#176044] text-white'
                    : 'text-[#243047] dark:text-[#CBD5E1] hover:bg-[#F2F5F0] dark:hover:bg-[#1B283A]'
                }`}
              >
                <Target className="w-4 h-4 text-[#D6A85C]" />
                <span>Objetivos e Hábitos</span>
              </button>

              <button
                onClick={() => handleSelect('historico')}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium ${
                  activeModule === 'historico'
                    ? 'bg-[#176044] text-white'
                    : 'text-[#243047] dark:text-[#CBD5E1] hover:bg-[#F2F5F0] dark:hover:bg-[#1B283A]'
                }`}
              >
                <History className="w-4 h-4 text-[#D6A85C]" />
                <span>Histórico de Produtividade</span>
              </button>

              <button
                onClick={() => handleSelect('configuracoes')}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium ${
                  activeModule === 'configuracoes'
                    ? 'bg-[#176044] text-white'
                    : 'text-[#243047] dark:text-[#CBD5E1] hover:bg-[#F2F5F0] dark:hover:bg-[#1B283A]'
                }`}
              >
                <Settings className="w-4 h-4 text-[#D6A85C]" />
                <span>Configurações da Conta</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
