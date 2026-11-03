import React from 'react';
import { Target, Flame, Check, Sparkles, TrendingUp, Compass } from 'lucide-react';
import { Habit, GoalIndicator } from '../../types/dayflow';

interface HabitsGoalsCardProps {
  habits: Habit[];
  goals: GoalIndicator[];
  onToggleHabit: (habitId: string) => void;
}

export const HabitsGoalsCard: React.FC<HabitsGoalsCardProps> = ({
  habits,
  goals,
  onToggleHabit,
}) => {
  const completedHabitsCount = habits.filter((h) => h.completedToday).length;

  return (
    <div className="rounded-2xl border border-[#E0E7DC] dark:border-[#223348] bg-white dark:bg-[#15202E] p-5 shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-[#F0F2ED] dark:border-[#1F2E40] mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#E6F0E9] dark:bg-[#193226] text-[#176044] dark:text-[#A8D5BA]">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#243047] dark:text-white uppercase tracking-wider">
              Objetivos & Hábitos Diários
            </h2>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
              Desenvolvimento contínuo
            </p>
          </div>
        </div>

        <span className="text-xs font-mono tabular-nums text-[#176044] dark:text-[#A8D5BA] font-semibold">
          {completedHabitsCount}/{habits.length} hábitos hoje
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Hábitos do Dia */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#176044] dark:text-[#A8D5BA]">
              Hábitos de Hoje
            </h3>
            <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
              Clique para registrar
            </span>
          </div>

          <div className="space-y-2">
            {habits.map((habit) => (
              <div
                key={habit.id}
                onClick={() => onToggleHabit(habit.id)}
                className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  habit.completedToday
                    ? 'border-[#176044]/40 bg-[#E6F0E9]/30 dark:bg-[#163326]/30'
                    : 'border-[#F0F2ED] dark:border-[#1F2E40] bg-[#FAFBF9] dark:bg-[#1A2534] hover:border-[#176044]/30'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    type="button"
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                      habit.completedToday
                        ? 'bg-[#176044] text-white'
                        : 'border-2 border-[#CBD5E1] dark:border-[#475569]'
                    }`}
                  >
                    {habit.completedToday && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div className="min-w-0">
                    <p
                      className={`text-xs sm:text-sm font-medium truncate ${
                        habit.completedToday
                          ? 'line-through text-[#64748B] dark:text-[#8C9BAE]'
                          : 'text-[#243047] dark:text-white'
                      }`}
                    >
                      {habit.title}
                    </p>
                    <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                      {habit.targetFrequency}
                    </p>
                  </div>
                </div>

                {/* Streak Badge */}
                <div className="flex items-center gap-1 text-xs font-mono tabular-nums text-[#D6A85C] font-semibold shrink-0">
                  <Flame className="w-3.5 h-3.5 fill-[#D6A85C]" />
                  <span>{habit.currentStreakDays}d</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Metas e Objetivos Estratégicos */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#243047] dark:text-[#CBD5E1]">
              Metas em Andamento
            </h3>
            <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
              Visão Mensal
            </span>
          </div>

          <div className="space-y-3">
            {goals.map((goal) => {
              const progressPct = Math.min(100, Math.round((goal.current / goal.target) * 100));

              return (
                <div
                  key={goal.id}
                  className="p-3 rounded-xl border border-[#F0F2ED] dark:border-[#1F2E40] bg-[#FAFBF9] dark:bg-[#1A2534]"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[#243047] dark:text-white truncate">
                      {goal.title}
                    </span>
                    <span className="font-mono tabular-nums text-[#176044] dark:text-[#A8D5BA] font-bold">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#EAEFE8] dark:bg-[#1F2E40] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#176044] to-[#D6A85C] h-full rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-1.5">
                    <span>{goal.category}</span>
                    <span>Prazo: {goal.deadline}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
