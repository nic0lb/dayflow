/**
 * DAYFLOW 0.2 Data Types & Architecture
 * Structured for direct future mapping to Google Cloud Firestore collections:
 * - /users/{userId}
 * - /users/{userId}/tasks/{taskId}
 * - /users/{userId}/events/{eventId}
 * - /users/{userId}/habits/{habitId}
 * - /users/{userId}/goals/{goalId}
 * - /users/{userId}/notes/{noteId}
 * - /daily_inspirations/{dateKey}
 */

export type NavigationModule =
  | 'inicio'
  | 'agenda'
  | 'tarefas'
  | 'anotacoes'
  | 'inspiracao'
  | 'objetivos-habitos'
  | 'historico'
  | 'configuracoes';

export type TaskPriority = 'alta' | 'media' | 'baixa';
export type TaskCategory = 'foco' | 'trabalho' | 'pessoal' | 'saude';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate: string; // ISO date 'YYYY-MM-DD'
  dueTime?: string; // 'HH:mm'
  createdAt: string;
}

export interface AppointmentEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // 'YYYY-MM-DD'
  startTime: string; // '09:00'
  endTime: string; // '10:00'
  location?: string;
  type: 'reuniao' | 'foco' | 'pessoal' | 'saude';
  isImportant?: boolean;
}

export interface DailyInspiration {
  id: string;
  word: string;
  phonetic: string;
  grammaticalClass: string;
  meaning: string;
  quote: string;
  author: string;
  authorRole?: string;
  reflection: string;
  date: string;
  isFavorite: boolean;
}

export interface Habit {
  id: string;
  title: string;
  targetFrequency: string; // e.g. "Todos os dias", "Seg a Sex"
  currentStreakDays: number;
  completedToday: boolean;
  category: 'mente' | 'corpo' | 'foco';
  unit?: string;
  progressToday?: number;
  goalToday?: number;
}

export interface GoalIndicator {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  category: string;
  deadline: string;
}

export interface QuickNote {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  color?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
  streakDays: number;
  focusMinutesToday: number;
}
