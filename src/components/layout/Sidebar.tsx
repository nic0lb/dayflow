import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
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

interface SidebarProps {
  activeModule: NavigationModule;
  onSelectModule: (module: NavigationModule) => void;
  user: UserProfile;
}

interface NavItemConfig {
  id: NavigationModule;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isReady?: boolean;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'inicio', label: 'Início', icon: LayoutDashboard, isReady: true },
  { id: 'agenda', label: 'Agenda', icon: Calendar, badge: 'Hoje' },
  { id: 'tarefas', label: 'Tarefas', icon: CheckSquare, badge: '4' },
  { id: 'anotacoes', label: 'Anotações', icon: FileText },
  { id: 'inspiracao', label: 'Inspiração', icon: Sparkles },
  { id: 'objetivos-habitos', label: 'Objetivos e hábitos', icon: Target },
  { id: 'historico', label: 'Histórico', icon: History },
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  user,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="hidden lg:flex lg:flex-col w-72 shrink-0 border-r border-[#E6E8E2] dark:border-[#243347] bg-[#FFFFFF] dark:bg-[#141E2B] h-screen sticky top-0 transition-colors duration-200 select-none z-30">
      {/* Brand Header */}
      <div className="p-6 pb-4 border-b border-[#F0F2EC] dark:border-[#1E2C3D]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#176044] text-white flex items-center justify-center shadow-sm">
              <Compass className="w-6 h-6 text-[#D6A85C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-[#176044] dark:text-[#E6F0E9]">
                  DAYFLOW
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#E6F0E9] dark:bg-[#1B3528] text-[#176044] dark:text-[#A8D5BA]">
                  v0.2.1
                </span>
              </div>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-medium leading-none mt-0.5">
                Viva seu dia com clareza
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
        <p className="px-3 text-[11px] font-semibold text-[#8C9BAE] dark:text-[#64748B] uppercase tracking-wider mb-2">
          Módulos
        </p>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectModule(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-[#176044] text-white shadow-sm font-semibold'
                  : 'text-[#243047] dark:text-[#CBD5E1] hover:bg-[#F2F5F0] dark:hover:bg-[#1B283A] hover:text-[#176044] dark:hover:text-[#FFFFFF]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                    isActive
                      ? 'text-[#D6A85C]'
                      : 'text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#176044] dark:group-hover:text-white'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-mono tabular-nums ${
                    isActive
                      ? 'bg-[#134e37] text-[#E6F0E9]'
                      : 'bg-[#E6F0E9] text-[#176044] dark:bg-[#1F332A] dark:text-[#A8D5BA]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Slogan Banner */}
      <div className="mx-4 mb-4 p-3.5 rounded-xl bg-[#F4F7F2] dark:bg-[#182535] border border-[#E4EAE1] dark:border-[#223348]">
        <p className="text-xs font-semibold text-[#176044] dark:text-[#D6A85C] mb-1">
          Manifesto DAYFLOW
        </p>
        <p className="text-[11px] text-[#556980] dark:text-[#94A3B8] leading-relaxed italic">
          &ldquo;Organize seu tempo. Registre suas ideias. Viva seu dia.&rdquo;
        </p>
      </div>

      {/* Bottom Footer User & Settings */}
      <div className="p-4 border-t border-[#F0F2EC] dark:border-[#1E2C3D] bg-[#FAFAF8] dark:bg-[#121B27]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={user.avatarUrl}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border border-[#176044]/30"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#243047] dark:text-white truncate">
                {user.name}
              </p>
              <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] truncate">
                {user.streakDays} dias seguidos
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            className="p-2 rounded-lg text-[#64748B] dark:text-[#94A3B8] hover:bg-[#EAEFE8] dark:hover:bg-[#202E42] transition-colors"
            title={theme === 'dark' ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#D6A85C]" />
            ) : (
              <Moon className="w-4 h-4 text-[#243047]" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
