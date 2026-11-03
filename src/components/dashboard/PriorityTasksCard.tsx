import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Check,
  Plus,
  Filter,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Task, TaskPriority } from '../../types/dayflow';

interface PriorityTasksCardProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onOpenQuickCreate: () => void;
  onQuickAddTask?: (title: string, priority: TaskPriority) => void;
  activeFilter?: string;
  onFilterChange?: (filter: any) => void;
}

export const PriorityTasksCard: React.FC<PriorityTasksCardProps> = ({
  tasks,
  onToggleTask,
  onOpenQuickCreate,
  onQuickAddTask,
  activeFilter = 'todas',
  onFilterChange,
}) => {
  const [internalFilter, setInternalFilter] = useState<'todas' | 'alta' | 'pendentes' | 'concluidas'>(
    (activeFilter as any) || 'todas'
  );
  const [quickInput, setQuickInput] = useState('');

  const currentFilter = onFilterChange ? (activeFilter as any) : internalFilter;

  const setFilter = (val: 'todas' | 'alta' | 'pendentes' | 'concluidas') => {
    if (onFilterChange) {
      onFilterChange(val);
    } else {
      setInternalFilter(val);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (currentFilter === 'alta') return t.priority === 'alta' && !t.completed;
    if (currentFilter === 'pendentes') return !t.completed;
    if (currentFilter === 'concluidas') return t.completed;
    return true;
  });

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    if (onQuickAddTask) {
      onQuickAddTask(quickInput.trim(), 'alta');
      setQuickInput('');
    }
  };

  const getPriorityLabel = (priority: TaskPriority) => {
    switch (priority) {
      case 'alta':
        return { text: 'Alta prioridade', color: 'text-[#B88B42] dark:text-[#E2BC7A]' };
      case 'media':
        return { text: 'Média prioridade', color: 'text-[#556980] dark:text-[#94A3B8]' };
      case 'baixa':
        return { text: 'Baixa prioridade', color: 'text-[#176044] dark:text-[#A8D5BA]' };
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'foco':
        return 'Foco & Estratégia';
      case 'trabalho':
        return 'Trabalho';
      case 'pessoal':
        return 'Pessoal';
      case 'saude':
        return 'Saúde & Bem-estar';
      default:
        return category;
    }
  };

  return (
    <div className="rounded-2xl border border-[#E0E7DC] dark:border-[#223348] bg-white dark:bg-[#15202E] p-5 shadow-sm transition-all duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#F0F2ED] dark:border-[#1F2E40]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#E6F0E9] dark:bg-[#193226] text-[#176044] dark:text-[#A8D5BA]">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#243047] dark:text-white uppercase tracking-wider">
              Tarefas Prioritárias
            </h2>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
              {filteredTasks.length} {filteredTasks.length === 1 ? 'item exibido' : 'itens exibidos'}
            </p>
          </div>
        </div>

        {/* Filter buttons (Segmented controls complying with design constitution) */}
        <div className="flex items-center gap-1 p-1 bg-[#F5F7F3] dark:bg-[#182333] rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setFilter('todas')}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              currentFilter === 'todas'
                ? 'bg-white dark:bg-[#202E42] text-[#176044] dark:text-[#A8D5BA] shadow-xs font-semibold'
                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#243047] dark:hover:text-white'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('alta')}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              currentFilter === 'alta'
                ? 'bg-white dark:bg-[#202E42] text-[#B88B42] dark:text-[#D6A85C] shadow-xs font-semibold'
                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#243047] dark:hover:text-white'
            }`}
          >
            Prioritárias
          </button>
          <button
            onClick={() => setFilter('pendentes')}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              currentFilter === 'pendentes'
                ? 'bg-white dark:bg-[#202E42] text-[#243047] dark:text-white shadow-xs font-semibold'
                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#243047] dark:hover:text-white'
            }`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFilter('concluidas')}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              currentFilter === 'concluidas'
                ? 'bg-white dark:bg-[#202E42] text-[#176044] dark:text-[#A8D5BA] shadow-xs font-semibold'
                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#243047] dark:hover:text-white'
            }`}
          >
            Concluídas
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="py-2 divide-y divide-[#F0F2ED] dark:divide-[#1F2E40] max-h-96 overflow-y-auto">
        {filteredTasks.length === 0 ? (
          <div className="py-8 text-center">
            <Check className="w-8 h-8 text-[#176044] dark:text-[#A8D5BA] mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium text-[#243047] dark:text-white">
              Nenhuma tarefa nesta visualização
            </p>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
              {currentFilter === 'concluidas'
                ? 'Conclua tarefas da lista para vê-las aqui.'
                : 'Você está em dia com seus compromissos.'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const priorityInfo = getPriorityLabel(task.priority);
            return (
              <div
                key={task.id}
                className="py-3 px-1 flex items-start gap-3 group hover:bg-[#F9FAF7] dark:hover:bg-[#1A2534] rounded-xl transition-colors"
              >
                {/* Checkbox */}
                <button
                  onClick={() => onToggleTask(task.id)}
                  aria-label={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
                  className="mt-0.5 p-1 rounded-lg text-[#64748B] dark:text-[#94A3B8] hover:text-[#176044] dark:hover:text-[#A8D5BA] transition-colors cursor-pointer"
                >
                  {task.completed ? (
                    <div className="w-5 h-5 rounded-md bg-[#176044] text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md border-2 border-[#CBD5E1] dark:border-[#475569] group-hover:border-[#176044] transition-colors" />
                  )}
                </button>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-sm font-medium leading-snug transition-colors ${
                        task.completed
                          ? 'line-through text-[#8C9BAE] dark:text-[#64748B]'
                          : 'text-[#243047] dark:text-[#F1F5F9]'
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>

                  {task.description && (
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5 line-clamp-1">
                      {task.description}
                    </p>
                  )}

                  {/* Unboxed Metadata Line with typographic separators */}
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-[#64748B] dark:text-[#94A3B8]">
                    <span className={`font-semibold ${priorityInfo.color}`}>
                      {priorityInfo.text}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{getCategoryLabel(task.category)}</span>
                    {task.dueTime && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 font-mono tabular-nums">
                          <Clock className="w-3 h-3 text-[#D6A85C]" />
                          {task.dueTime}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Add Form or Action */}
      <div className="pt-3 border-t border-[#F0F2ED] dark:border-[#1F2E40]">
        <form onSubmit={handleQuickSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            placeholder="Adicionar nova tarefa prioritária..."
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E0E7DC] dark:border-[#283C55] rounded-xl text-[#243047] dark:text-white placeholder-[#8C9BAE] dark:placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#176044]"
          />
          <button
            type="submit"
            disabled={!quickInput.trim()}
            className="px-3.5 py-2 rounded-xl bg-[#176044] text-white text-xs sm:text-sm font-semibold disabled:opacity-40 hover:bg-[#134e37] transition-all flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#D6A85C]" />
            <span className="hidden sm:inline">Adicionar</span>
          </button>
          <button
            type="button"
            onClick={onOpenQuickCreate}
            title="Mais opções e detalhes"
            className="p-2 rounded-xl border border-[#E0E7DC] dark:border-[#283C55] text-[#64748B] dark:text-[#CBD5E1] hover:bg-[#F2F5F0] dark:hover:bg-[#1A2534] text-xs"
          >
            Mais
          </button>
        </form>
      </div>
    </div>
  );
};
