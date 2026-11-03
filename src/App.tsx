import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { InspirationCard } from './components/dashboard/InspirationCard';
import { TaskSummaryCard } from './components/dashboard/TaskSummaryCard';
import { PriorityTasksCard } from './components/dashboard/PriorityTasksCard';
import { UpcomingAppointmentsCard } from './components/dashboard/UpcomingAppointmentsCard';
import { WeekSummaryCard } from './components/dashboard/WeekSummaryCard';
import { HabitsGoalsCard } from './components/dashboard/HabitsGoalsCard';
import { QuickCreateModal } from './components/modals/QuickCreateModal';
import { RoadmapModulePlaceholder } from './components/modules/RoadmapModulePlaceholder';
import {
  NavigationModule,
  Task,
  AppointmentEvent,
  DailyInspiration,
  Habit,
  GoalIndicator,
  QuickNote,
  TaskPriority,
} from './types/dayflow';
import {
  INITIAL_USER,
  INSPIRATIONS_LIBRARY,
  INITIAL_TASKS,
  INITIAL_EVENTS,
  INITIAL_HABITS,
  INITIAL_GOALS,
  INITIAL_NOTES,
} from './data/initialData';
import { FileText, Plus, Compass, Sparkles } from 'lucide-react';

export default function App() {
  return (
    <ThemeProvider>
      <DayflowDashboard />
    </ThemeProvider>
  );
}

function DayflowDashboard() {
  // Navigation state
  const [activeModule, setActiveModule] = useState<NavigationModule>('inicio');

  // Application Data States
  const [user, setUser] = useState(INITIAL_USER);
  const [inspirations, setInspirations] = useState<DailyInspiration[]>(INSPIRATIONS_LIBRARY);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [events, setEvents] = useState<AppointmentEvent[]>(INITIAL_EVENTS);
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [goals, setGoals] = useState<GoalIndicator[]>(INITIAL_GOALS);
  const [notes, setNotes] = useState<QuickNote[]>(INITIAL_NOTES);

  // Modal State
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [quickCreateTab, setQuickCreateTab] = useState<'tarefa' | 'compromisso' | 'anotacao'>('tarefa');

  // Task Filter State shared between summary and list
  const [taskFilter, setTaskFilter] = useState<'todas' | 'pendentes' | 'concluidas' | 'alta'>('todas');

  // Handlers
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleToggleHabit = (habitId: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const nextCompleted = !h.completedToday;
          return {
            ...h,
            completedToday: nextCompleted,
            currentStreakDays: nextCompleted ? h.currentStreakDays + 1 : Math.max(0, h.currentStreakDays - 1),
          };
        }
        return h;
      })
    );
  };

  const handleToggleFavoriteInspiration = (id: string) => {
    setInspirations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
    );
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `tsk_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleQuickAddTask = (title: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: `tsk_${Date.now()}`,
      title,
      completed: false,
      priority,
      category: 'foco',
      dueDate: '2026-11-03',
      dueTime: '18:00',
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleAddEvent = (eventData: Omit<AppointmentEvent, 'id'>) => {
    const newEvent: AppointmentEvent = {
      ...eventData,
      id: `evt_${Date.now()}`,
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleAddNote = (noteData: Omit<QuickNote, 'id' | 'createdAt'>) => {
    const newNote: QuickNote = {
      ...noteData,
      id: `not_${Date.now()}`,
      createdAt: 'Agora mesmo',
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const openCreateModal = (tab: 'tarefa' | 'compromisso' | 'anotacao' = 'tarefa') => {
    setQuickCreateTab(tab);
    setIsQuickCreateOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F8F4] dark:bg-[#101721] text-[#243047] dark:text-[#E2E8F0] flex transition-colors duration-200">
      {/* Desktop Sidebar Navigation */}
      <Sidebar
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        user={user}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        {/* Top Header */}
        <Header
          user={user}
          onOpenQuickCreate={() => openCreateModal('tarefa')}
        />

        {/* View Routing */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeModule === 'inicio' ? (
            <div className="space-y-6">
              {/* 1. Daily Inspiration Hero Card */}
              <section aria-label="Inspiração Diária">
                <InspirationCard
                  inspirations={inspirations}
                  onToggleFavorite={handleToggleFavoriteInspiration}
                />
              </section>

              {/* 2. Tasks Progress & Priority Task List */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5">
                  <TaskSummaryCard
                    tasks={tasks}
                    activeFilter={taskFilter}
                    onFilterChange={setTaskFilter}
                  />
                </div>
                <div className="lg:col-span-7">
                  <PriorityTasksCard
                    tasks={tasks}
                    onToggleTask={handleToggleTask}
                    onOpenQuickCreate={() => openCreateModal('tarefa')}
                    onQuickAddTask={handleQuickAddTask}
                    activeFilter={taskFilter}
                    onFilterChange={setTaskFilter}
                  />
                </div>
              </section>

              {/* 3. Upcoming Appointments & Week Summary */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-6">
                  <UpcomingAppointmentsCard
                    events={events}
                    onOpenQuickCreate={() => openCreateModal('compromisso')}
                  />
                </div>
                <div className="lg:col-span-6">
                  <WeekSummaryCard
                    tasks={tasks}
                    events={events}
                  />
                </div>
              </section>

              {/* 4. Habits & Goals Tracking */}
              <section aria-label="Objetivos e Hábitos">
                <HabitsGoalsCard
                  habits={habits}
                  goals={goals}
                  onToggleHabit={handleToggleHabit}
                />
              </section>

              {/* 5. Quick Notes Snapshot & Ideas */}
              <section
                aria-label="Anotações e Ideias"
                className="rounded-2xl border border-[#E0E7DC] dark:border-[#223348] bg-white dark:bg-[#15202E] p-5 shadow-sm"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#F0F2ED] dark:border-[#1F2E40] mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#E6F0E9] dark:bg-[#193226] text-[#176044] dark:text-[#A8D5BA]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-[#243047] dark:text-white uppercase tracking-wider">
                        Anotações Rápidas & Ideias
                      </h2>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                        Espaço para pensamentos livres e reflexões
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => openCreateModal('anotacao')}
                    className="text-xs font-semibold text-[#176044] dark:text-[#A8D5BA] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Registrar Ideia</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3.5 rounded-xl border border-[#F0F2ED] dark:border-[#1F2E40] bg-[#FAFBF9] dark:bg-[#1A2534] hover:border-[#176044]/30 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-[#243047] dark:text-white truncate">
                            {note.title}
                          </span>
                          <span className="text-[11px] text-[#D6A85C] font-medium shrink-0 ml-2">
                            {note.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#556980] dark:text-[#94A3B8] leading-relaxed line-clamp-3">
                          {note.content}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#F0F2ED] dark:border-[#1F2E40] text-[11px] text-[#8C9BAE] dark:text-[#64748B]">
                        <span>{note.createdAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Status & Demonstration Context Bar */}
              <footer className="pt-4 border-t border-[#E6E8E2] dark:border-[#243347] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B] dark:text-[#94A3B8]">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#176044] dark:text-[#A8D5BA]" />
                  <span>
                    <strong>DAYFLOW 0.2</strong> — Organize seu tempo. Registre suas ideias. Viva seu dia.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span>Modo Interativo Demonstrativo</span>
                  <span aria-hidden="true">·</span>
                  <span>Arquitetura preparada para Cloud Firestore</span>
                </div>
              </footer>
            </div>
          ) : (
            <RoadmapModulePlaceholder
              module={activeModule}
              onBackToDashboard={() => setActiveModule('inicio')}
              onOpenQuickCreate={() => openCreateModal('tarefa')}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar & Drawer */}
      <MobileNav
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        onOpenQuickCreate={() => openCreateModal('tarefa')}
        user={user}
      />

      {/* Quick Create Modal for Tasks, Events & Notes */}
      <QuickCreateModal
        isOpen={isQuickCreateOpen}
        onClose={() => setIsQuickCreateOpen(false)}
        onAddTask={handleAddTask}
        onAddEvent={handleAddEvent}
        onAddNote={handleAddNote}
        initialTab={quickCreateTab}
      />
    </div>
  );
}
