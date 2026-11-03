import React from 'react';
import {
  Calendar,
  CheckSquare,
  FileText,
  Sparkles,
  Target,
  History,
  Settings,
  ArrowLeft,
  Layers,
  Database,
  Cpu,
} from 'lucide-react';
import { NavigationModule } from '../../types/dayflow';

interface RoadmapModulePlaceholderProps {
  module: NavigationModule;
  onBackToDashboard: () => void;
  onOpenQuickCreate: () => void;
}

interface ModuleInfo {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  firestoreTarget: string;
  plannedFeatures: string[];
}

const MODULE_DETAILS: Record<NavigationModule, ModuleInfo> = {
  inicio: {
    title: 'Dashboard DAYFLOW',
    subtitle: 'Visão unificada do seu dia e indicadores de progresso',
    icon: Layers,
    firestoreTarget: '/users/{uid}/dashboard_state',
    plannedFeatures: ['Resumo executivo', 'Tarefas prioritárias', 'Inspiração diária'],
  },
  agenda: {
    title: 'Módulo Agenda Completa',
    subtitle: 'Gestão visual de compromissos por dia, semana e mês com sincronização',
    icon: Calendar,
    firestoreTarget: '/users/{uid}/events/{eventId}',
    plannedFeatures: [
      'Visualização em grade diária, semanal e mensal',
      'Categorias por blocos de tempo (Time-blocking / Deep Work)',
      'Integração futura com Google Calendar via OAuth',
      'Notificações locais PWA para próximos eventos',
    ],
  },
  tarefas: {
    title: 'Módulo Tarefas & Projetos',
    subtitle: 'Listas dinâmicas com métodos Kanban, Matriz de Eisenhower e priorização ágil',
    icon: CheckSquare,
    firestoreTarget: '/users/{uid}/tasks/{taskId}',
    plannedFeatures: [
      'Visualização em lista com ordenação por urgência e impacto',
      'Quadro Kanban com colunas personalizáveis',
      'Filtros por etiquetas e contexto de execução',
      'Arquivamento automático de itens concluídos',
    ],
  },
  anotacoes: {
    title: 'Módulo Anotações & Registro de Ideias',
    subtitle: 'Espaço para pensamentos livres, atas de reuniões e sínteses de leitura',
    icon: FileText,
    firestoreTarget: '/users/{uid}/notes/{noteId}',
    plannedFeatures: [
      'Editor em texto rico com suporte a Markdown',
      'Sistema de tags e busca instantânea de notas',
      'Vinculação de notas a tarefas e compromissos',
      'Exportação em PDF e compartilhamento limpo',
    ],
  },
  inspiracao: {
    title: 'Módulo Inspiração Diária & Filosofia',
    subtitle: 'Biblioteca de sabedoria, reflexões filosóficas e palavras fundamentais',
    icon: Sparkles,
    firestoreTarget: '/daily_inspirations/{inspirationId}',
    plannedFeatures: [
      'Acervo curado de citações clássicas e contemporâneas',
      'Histórico de reflexões e diário de gratidão matinal',
      'Favoritos e coleções temáticas (Estoicismo, Foco, Liderança)',
      'Sugestões inteligentes com base nos hábitos do dia',
    ],
  },
  'objetivos-habitos': {
    title: 'Módulo Objetivos & Hábitos',
    subtitle: 'Acompanhamento de metas de curto, médio e longo prazo com sequência diária',
    icon: Target,
    firestoreTarget: '/users/{uid}/habits & /users/{uid}/goals',
    plannedFeatures: [
      'Rastreador de sequência diária (Habit Streaks) com micro-recompensas',
      'Metas OKR (Objetivos e Resultados-Chave)',
      'Gráficos de evolução temporal e consistência',
      'Lembretes suaves configuráveis por horário',
    ],
  },
  historico: {
    title: 'Módulo Histórico & Insights',
    subtitle: 'Análise retrospectiva de produtividade, consistência e tempo de foco',
    icon: History,
    firestoreTarget: '/users/{uid}/activity_logs/{logId}',
    plannedFeatures: [
      'Linha do tempo retrospectiva de tarefas e metas concluídas',
      'Métricas de foco acumulado e horas de deep work',
      'Relatórios semanais de desempenho pessoal',
      'Exportação de dados para conformidade e backup pessoal',
    ],
  },
  configuracoes: {
    title: 'Configurações da Plataforma',
    subtitle: 'Preferências visuais, notificações, perfil e arquitetura de dados',
    icon: Settings,
    firestoreTarget: '/users/{uid}/preferences',
    plannedFeatures: [
      'Ajustes de preferências visuais e tema do sistema',
      'Gerenciamento de perfil e credenciais do usuário',
      'Configuração de notificações PWA e fuso horário',
      'Futura sincronização com Firebase Authentication',
    ],
  },
};

export const RoadmapModulePlaceholder: React.FC<RoadmapModulePlaceholderProps> = ({
  module,
  onBackToDashboard,
  onOpenQuickCreate,
}) => {
  const info = MODULE_DETAILS[module] || MODULE_DETAILS.agenda;
  const Icon = info.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Return to Dashboard */}
      <button
        onClick={onBackToDashboard}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#176044] dark:text-[#A8D5BA] hover:underline mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar ao Dashboard Principal</span>
      </button>

      {/* Main card */}
      <div className="rounded-2xl border border-[#E0E7DC] dark:border-[#223348] bg-white dark:bg-[#15202E] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#F0F2ED] dark:border-[#1F2E40]">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[#E6F0E9] dark:bg-[#173024] text-[#176044] dark:text-[#A8D5BA] shrink-0">
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-[#243047] dark:text-white">
                  {info.title}
                </h2>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF4E8] dark:bg-[#2B2315] text-[#D6A85C] border border-[#F2E0BD] dark:border-[#4E3D21]">
                  Previsto no Roadmap 0.3+
                </span>
              </div>
              <p className="text-sm text-[#556980] dark:text-[#94A3B8] mt-1">
                {info.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenQuickCreate}
            className="px-4 py-2.5 rounded-xl bg-[#176044] hover:bg-[#134e37] text-white text-xs font-semibold shadow-xs shrink-0 self-start cursor-pointer"
          >
            Adicionar Registro
          </button>
        </div>

        {/* Technical Architecture Ready Note */}
        <div className="mt-6 p-4 rounded-xl bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E8ECE4] dark:border-[#223348]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#176044] dark:text-[#A8D5BA] mb-1">
            <Database className="w-4 h-4 text-[#D6A85C]" />
            <span>Arquitetura de Dados Pronta para Cloud Firestore</span>
          </div>
          <p className="text-xs text-[#556980] dark:text-[#94A3B8]">
            Alvo de coleção: <code className="font-mono text-[#243047] dark:text-[#CBD5E1] font-semibold">{info.firestoreTarget}</code>
          </p>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 leading-relaxed">
            Conforme a especificação da versão 0.2, o desenvolvimento está concentrado no Dashboard visual e interativo. Os contratos de dados e esquemas já estão modelados em TypeScript para evolução sem necessidade de reconstrução.
          </p>
        </div>

        {/* Planned Features List */}
        <div className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#243047] dark:text-white mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#176044] dark:text-[#A8D5BA]" />
            <span>Recursos em Desenvolvimento para este Módulo</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {info.plannedFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-[#F0F2ED] dark:border-[#1F2E40] bg-[#FAFBF9] dark:bg-[#121B27] flex items-start gap-2.5 text-xs text-[#334155] dark:text-[#CBD5E1]"
              >
                <span className="w-5 h-5 rounded-md bg-[#E6F0E9] dark:bg-[#193226] text-[#176044] dark:text-[#A8D5BA] flex items-center justify-center font-bold text-[10px] shrink-0 font-mono">
                  {idx + 1}
                </span>
                <span className="leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-4 border-t border-[#F0F2ED] dark:border-[#1F2E40] flex justify-end">
          <button
            onClick={onBackToDashboard}
            className="px-5 py-2.5 rounded-xl bg-[#243047] dark:bg-[#202E42] hover:bg-[#1A2534] text-white text-xs font-semibold cursor-pointer"
          >
            Voltar para o Dashboard Inicial
          </button>
        </div>
      </div>
    </div>
  );
};
