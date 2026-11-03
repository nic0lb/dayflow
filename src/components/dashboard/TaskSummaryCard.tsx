import React from 'react';
import { CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react';
import { Task } from '../../types/dayflow';

interface TaskSummaryCardProps {
  tasks: Task[];
  onFilterChange?: (filter: 'todas' | 'pendentes' | 'concluidas' | 'alta') => void;
  activeFilter?: string;
}

export const TaskSummaryCard: React.FC<TaskSummaryCardProps> = ({
  tasks,
  onFilterChange,
  activeFilter = 'todas',
}) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const highPriorityPending = tasks.filter((t) => !t.completed && t.priority === 'alta').length;

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  // SVG circular calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="rounded-2xl border border-[#E0E7DC] dark:border-[#223348] bg-white dark:bg-[#15202E] p-5 shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#E6F0E9] dark:bg-[#193226] text-[#176044] dark:text-[#A8D5BA]">
            <ListTodo className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#243047] dark:text-white uppercase tracking-wider">
            Progresso das Tarefas
          </h2>
        </div>

        <span className="text-xs text-[#64748B] dark:text-[#94A3B8] font-mono tabular-nums">
          {completed}/{total} concluídas
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* Progress Ring */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-24 h-24 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="7"
              className="text-[#EAEFE8] dark:text-[#1F2E40]"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-[#176044] dark:text-[#A8D5BA] transition-all duration-500 ease-out"
              fill="transparent"
            />
          </svg>

          {/* Central Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold font-mono tabular-nums text-[#243047] dark:text-white">
              {percentage}%
            </span>
            <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider">
              taxa
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex-1 grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onFilterChange && onFilterChange('pendentes')}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeFilter === 'pendentes'
                ? 'border-[#176044] bg-[#E6F0E9]/50 dark:bg-[#193226]/50'
                : 'border-[#F0F2ED] dark:border-[#223348] bg-[#F7F8F4] dark:bg-[#1A2534] hover:border-[#176044]/40'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#94A3B8]">
              <Clock className="w-3.5 h-3.5 text-[#243047] dark:text-[#CBD5E1]" />
              <span>Pendentes</span>
            </div>
            <p className="text-lg font-bold font-mono tabular-nums text-[#243047] dark:text-white mt-0.5">
              {pending}
            </p>
          </button>

          <button
            onClick={() => onFilterChange && onFilterChange('concluidas')}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeFilter === 'concluidas'
                ? 'border-[#176044] bg-[#E6F0E9]/50 dark:bg-[#193226]/50'
                : 'border-[#F0F2ED] dark:border-[#223348] bg-[#F7F8F4] dark:bg-[#1A2534] hover:border-[#176044]/40'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#94A3B8]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#176044] dark:text-[#A8D5BA]" />
              <span>Concluídas</span>
            </div>
            <p className="text-lg font-bold font-mono tabular-nums text-[#176044] dark:text-[#A8D5BA] mt-0.5">
              {completed}
            </p>
          </button>

          <button
            onClick={() => onFilterChange && onFilterChange('alta')}
            className={`col-span-2 p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              activeFilter === 'alta'
                ? 'border-[#D6A85C] bg-[#FBF4E7] dark:bg-[#2B2315]'
                : 'border-[#F0F2ED] dark:border-[#223348] bg-[#F7F8F4] dark:bg-[#1A2534] hover:border-[#D6A85C]/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-[#D6A85C]" />
              <span className="text-xs font-medium text-[#243047] dark:text-[#CBD5E1]">
                Prioridades Altas Pendentes
              </span>
            </div>
            <span className="text-sm font-bold font-mono tabular-nums text-[#B88B42] dark:text-[#D6A85C]">
              {highPriorityPending}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
