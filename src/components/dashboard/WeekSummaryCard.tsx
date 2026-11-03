import React, { useState } from 'react';
import { CalendarRange, ChevronLeft, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { Task, AppointmentEvent } from '../../types/dayflow';

interface WeekSummaryCardProps {
  tasks: Task[];
  events: AppointmentEvent[];
}

interface WeekDay {
  dayName: string;
  dayNumber: number;
  dateStr: string;
  isToday: boolean;
}

const CURRENT_WEEK_DAYS: WeekDay[] = [
  { dayName: 'Seg', dayNumber: 2, dateStr: '2026-11-02', isToday: false },
  { dayName: 'Ter', dayNumber: 3, dateStr: '2026-11-03', isToday: true },
  { dayName: 'Qua', dayNumber: 4, dateStr: '2026-11-04', isToday: false },
  { dayName: 'Qui', dayNumber: 5, dateStr: '2026-11-05', isToday: false },
  { dayName: 'Sex', dayNumber: 6, dateStr: '2026-11-06', isToday: false },
  { dayName: 'Sáb', dayNumber: 7, dateStr: '2026-11-07', isToday: false },
  { dayName: 'Dom', dayNumber: 8, dateStr: '2026-11-08', isToday: false },
];

export const WeekSummaryCard: React.FC<WeekSummaryCardProps> = ({ tasks, events }) => {
  const [selectedDate, setSelectedDate] = useState('2026-11-03');

  const selectedDayInfo = CURRENT_WEEK_DAYS.find((d) => d.dateStr === selectedDate) || CURRENT_WEEK_DAYS[1];

  const dayTasks = tasks.filter((t) => t.dueDate === selectedDate);
  const dayEvents = events.filter((e) => e.date === selectedDate);

  return (
    <div className="rounded-2xl border border-[#E0E7DC] dark:border-[#223348] bg-white dark:bg-[#15202E] p-5 shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-[#F0F2ED] dark:border-[#1F2E40] mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#E6F0E9] dark:bg-[#193226] text-[#176044] dark:text-[#A8D5BA]">
            <CalendarRange className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#243047] dark:text-white uppercase tracking-wider">
              Resumo da Semana
            </h2>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
              Novembro de 2026 · Semana 45
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-[#176044] dark:text-[#A8D5BA]">
          Visão Geral
        </span>
      </div>

      {/* Week Day Pills */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-4">
        {CURRENT_WEEK_DAYS.map((day) => {
          const isSelected = selectedDate === day.dateStr;
          const dayTasksCount = tasks.filter((t) => t.dueDate === day.dateStr).length;
          const dayEventsCount = events.filter((e) => e.date === day.dateStr).length;
          const hasActivity = dayTasksCount > 0 || dayEventsCount > 0;

          return (
            <button
              key={day.dateStr}
              onClick={() => setSelectedDate(day.dateStr)}
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl text-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#176044] text-white shadow-xs font-semibold'
                  : day.isToday
                  ? 'bg-[#E6F0E9] dark:bg-[#193326] text-[#176044] dark:text-[#A8D5BA] font-bold border border-[#176044]/30'
                  : 'bg-[#F7F8F4] dark:bg-[#1A2534] text-[#556980] dark:text-[#94A3B8] hover:bg-[#EEF2EA] dark:hover:bg-[#202E42]'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider">{day.dayName}</span>
              <span className="text-base font-bold font-mono tabular-nums mt-0.5">
                {day.dayNumber}
              </span>

              {/* Activity indicator dot */}
              <div className="flex items-center gap-0.5 mt-1 h-1.5">
                {hasActivity && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected
                        ? 'bg-[#D6A85C]'
                        : day.isToday
                        ? 'bg-[#176044] dark:bg-[#A8D5BA]'
                        : 'bg-[#8C9BAE] dark:bg-[#64748B]'
                    }`}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Agenda Snapshot */}
      <div className="p-3.5 rounded-xl bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E8ECE4] dark:border-[#223348]">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-[#243047] dark:text-white">
            Atividades em {selectedDayInfo.dayName}, {selectedDayInfo.dayNumber} de Novembro
            {selectedDayInfo.isToday && ' (Hoje)'}
          </span>
          <span className="text-[#64748B] dark:text-[#94A3B8]">
            {dayTasks.length} tarefas · {dayEvents.length} eventos
          </span>
        </div>

        {dayTasks.length === 0 && dayEvents.length === 0 ? (
          <p className="text-xs text-[#8C9BAE] dark:text-[#64748B] italic py-2">
            Nenhum compromisso registrado para este dia da semana.
          </p>
        ) : (
          <div className="space-y-1.5 max-h-36 overflow-y-auto">
            {dayEvents.map((evt) => (
              <div
                key={evt.id}
                className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-white dark:bg-[#15202E]"
              >
                <div className="flex items-center gap-2 truncate">
                  <Clock className="w-3 h-3 text-[#D6A85C] shrink-0" />
                  <span className="font-mono tabular-nums text-[#64748B] dark:text-[#94A3B8]">
                    {evt.startTime}
                  </span>
                  <span className="font-medium text-[#243047] dark:text-white truncate">
                    {evt.title}
                  </span>
                </div>
                <span className="text-[10px] text-[#176044] dark:text-[#A8D5BA] font-semibold shrink-0">
                  Evento
                </span>
              </div>
            ))}

            {dayTasks.map((tsk) => (
              <div
                key={tsk.id}
                className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-white dark:bg-[#15202E]"
              >
                <div className="flex items-center gap-2 truncate">
                  <CheckCircle2
                    className={`w-3 h-3 shrink-0 ${
                      tsk.completed ? 'text-[#176044] dark:text-[#A8D5BA]' : 'text-[#8C9BAE]'
                    }`}
                  />
                  <span
                    className={`truncate ${
                      tsk.completed ? 'line-through text-[#8C9BAE]' : 'font-medium text-[#243047] dark:text-white'
                    }`}
                  >
                    {tsk.title}
                  </span>
                </div>
                <span className="text-[10px] text-[#D6A85C] font-semibold shrink-0">
                  {tsk.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
