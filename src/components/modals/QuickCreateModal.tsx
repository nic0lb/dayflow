import React, { useState } from 'react';
import { X, CheckSquare, Calendar, FileText, Plus, AlertCircle } from 'lucide-react';
import { Task, AppointmentEvent, QuickNote, TaskPriority, TaskCategory } from '../../types/dayflow';

interface QuickCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onAddEvent: (event: Omit<AppointmentEvent, 'id'>) => void;
  onAddNote: (note: Omit<QuickNote, 'id' | 'createdAt'>) => void;
  initialTab?: 'tarefa' | 'compromisso' | 'anotacao';
}

export const QuickCreateModal: React.FC<QuickCreateModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
  onAddEvent,
  onAddNote,
  initialTab = 'tarefa',
}) => {
  const [activeTab, setActiveTab] = useState<'tarefa' | 'compromisso' | 'anotacao'>(initialTab);

  // Form states - Task
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState<TaskPriority>('alta');
  const [taskCategory, setTaskCategory] = useState<TaskCategory>('foco');
  const [taskDate, setTaskDate] = useState('2026-11-03');
  const [taskTime, setTaskTime] = useState('14:00');

  // Form states - Event
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('2026-11-03');
  const [eventStart, setEventStart] = useState('14:00');
  const [eventEnd, setEventEnd] = useState('15:00');
  const [eventLocation, setEventLocation] = useState('Google Meet');
  const [eventType, setEventType] = useState<'reuniao' | 'foco' | 'pessoal' | 'saude'>('reuniao');
  const [timeError, setTimeError] = useState<string | null>(null);

  // Form states - Note
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteTag, setNoteTag] = useState('Estratégia');

  if (!isOpen) return null;

  const handleSubmitTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    onAddTask({
      title: taskTitle.trim(),
      description: taskDescription.trim() || undefined,
      completed: false,
      priority: taskPriority,
      category: taskCategory,
      dueDate: taskDate,
      dueTime: taskTime || undefined,
    });
    setTaskTitle('');
    setTaskDescription('');
    onClose();
  };

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    if (eventEnd <= eventStart) {
      setTimeError('O horário de término deve ser posterior ao horário de início.');
      return;
    }
    setTimeError(null);

    onAddEvent({
      title: eventTitle.trim(),
      description: eventDescription.trim() || undefined,
      date: eventDate,
      startTime: eventStart,
      endTime: eventEnd,
      location: eventLocation.trim() || undefined,
      type: eventType,
      isImportant: true,
    });
    setEventTitle('');
    setEventDescription('');
    onClose();
  };

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;
    onAddNote({
      title: noteTitle.trim(),
      content: noteContent.trim(),
      tag: noteTag.trim() || 'Ideia',
    });
    setNoteTitle('');
    setNoteContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Surface */}
      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#15202E] rounded-2xl shadow-2xl border border-[#E0E7DC] dark:border-[#223348] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 pb-3 border-b border-[#F0F2ED] dark:border-[#1F2E40] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#243047] dark:text-white">
              Novo Registro no DAYFLOW
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
              Organize seu tempo, registre suas ideias
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#243047] dark:hover:text-white hover:bg-[#F2F5F0] dark:hover:bg-[#1A2534] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#F0F2ED] dark:border-[#1F2E40] bg-[#FAFBF9] dark:bg-[#121B27] px-4 pt-2">
          <button
            onClick={() => {
              setActiveTab('tarefa');
              setTimeError(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'tarefa'
                ? 'border-[#176044] text-[#176044] dark:text-[#A8D5BA] dark:border-[#A8D5BA]'
                : 'border-transparent text-[#64748B] hover:text-[#243047] dark:hover:text-white'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Criar Tarefa</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('compromisso');
              setTimeError(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'compromisso'
                ? 'border-[#176044] text-[#176044] dark:text-[#A8D5BA] dark:border-[#A8D5BA]'
                : 'border-transparent text-[#64748B] hover:text-[#243047] dark:hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Compromisso</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('anotacao');
              setTimeError(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'anotacao'
                ? 'border-[#176044] text-[#176044] dark:text-[#A8D5BA] dark:border-[#A8D5BA]'
                : 'border-transparent text-[#64748B] hover:text-[#243047] dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Registrar Ideia</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5">
          {activeTab === 'tarefa' && (
            <form onSubmit={handleSubmitTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                  Título da Tarefa *
                </label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Ex: Concluir revisão estratégica do projeto"
                  className="w-full px-3.5 py-2 text-sm bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E0E7DC] dark:border-[#283C55] rounded-xl text-[#243047] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#176044]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                  Descrição ou notas breves
                </label>
                <input
                  type="text"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Detalhes adicionais (opcional)"
                  className="w-full px-3.5 py-2 text-sm bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E0E7DC] dark:border-[#283C55] rounded-xl text-[#243047] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#176044]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                    Prioridade
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E0E7DC] dark:border-[#283C55] rounded-xl text-[#243047] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#176044]"
                  >
                    <option value="alta">Alta prioridade</option>
                    <option value="media">Média prioridade</option>
                    <option value="baixa">Baixa prioridade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                    Categoria
                  </label>
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value as TaskCategory)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E0E7DC] dark:border-[#283C55] rounded-xl text-[#243047] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#176044]"
                  >
                    <option value="foco">Foco & Estratégia</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="pessoal">Pessoal</option>
                    <option value="saude">Saúde</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                    Data Limite
                  </label>
                  <input
                    type="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E0E7DC] dark:border-[#283C55] rounded-xl text-[#243047] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#176044]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                    Horário (opcional)
                  </label>
                  <input
                    type="time"
                    value={taskTime}
                    onChange={(e) => setTaskTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E0E7DC] dark:border-[#283C55] rounded-xl text-[#243047] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#176044]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-[#F2F5F0] dark:hover:bg-[#1A2534]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#176044] hover:bg-[#134e37] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-[#D6A85C]" />
                  <span>Salvar Tarefa</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'compromisso' && (
            <form onSubmit={handleSubmitEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                  Título do Compromisso *
                </label>
                <input
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Ex: Sessão de Mentoria / Reunião de Equipe"
                  className="w-full px-3.5 py-2 text-sm bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E0E7DC] dark:border-[#283C55] rounded-xl text-[#243047] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#176044]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                    Data
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E0E7DC] dark:border-[#283C55] rounded-xl text-[#243047] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                    Início
                  </label>
                  <input
                    type="time"
                    value={eventStart}
                    onChange={(e) => {
                      setEventStart(e.target.value);
                      if (timeError) setTimeError(null);
                    }}
                    className={`w-full px-2.5 py-2 text-xs bg-[#F7F8F4] dark:bg-[#1A2534] border ${
                      timeError ? 'border-red-400 dark:border-red-500' : 'border-[#E0E7DC] dark:border-[#283C55]'
                    } rounded-xl text-[#243047] dark:text-white`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                    Término
                  </label>
                  <input
                    type="time"
                    value={eventEnd}
                    onChange={(e) => {
                      setEventEnd(e.target.value);
                      if (timeError) setTimeError(null);
                    }}
                    className={`w-full px-2.5 py-2 text-xs bg-[#F7F8F4] dark:bg-[#1A2534] border ${
                      timeError ? 'border-red-400 dark:border-red-500' : 'border-[#E0E7DC] dark:border-[#283C55]'
                    } rounded-xl text-[#243047] dark:text-white`}
                  />
                </div>
              </div>

              {timeError && (
                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
                  <span>{timeError}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                    Local ou Plataforma
                  </label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="Google Meet, Escritório, etc."
                    className="w-full px-3 py-2 text-xs bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E0E7DC] dark:border-[#283C55] rounded-xl text-[#243047] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                    Tipo
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E0E7DC] dark:border-[#283C55] rounded-xl text-[#243047] dark:text-white"
                  >
                    <option value="reuniao">Reunião</option>
                    <option value="foco">Bloco de Foco</option>
                    <option value="pessoal">Pessoal</option>
                    <option value="saude">Saúde</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-[#F2F5F0] dark:hover:bg-[#1A2534]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#176044] hover:bg-[#134e37] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-[#D6A85C]" />
                  <span>Agendar Compromisso</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'anotacao' && (
            <form onSubmit={handleSubmitNote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                  Título da Ideia ou Anotação *
                </label>
                <input
                  type="text"
                  required
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Ex: Insight sobre fluxo de trabalho matinal"
                  className="w-full px-3.5 py-2 text-sm bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E0E7DC] dark:border-[#283C55] rounded-xl text-[#243047] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#176044]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                  Conteúdo da Anotação
                </label>
                <textarea
                  rows={3}
                  required
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Escreva seus pensamentos, ideias ou lembretes livres..."
                  className="w-full px-3.5 py-2 text-sm bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E0E7DC] dark:border-[#283C55] rounded-xl text-[#243047] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#176044]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#243047] dark:text-white mb-1">
                  Categoria / Marcador
                </label>
                <input
                  type="text"
                  value={noteTag}
                  onChange={(e) => setNoteTag(e.target.value)}
                  placeholder="Ex: Estratégia, Filosofia, Criatividade"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F7F8F4] dark:bg-[#1A2534] border border-[#E0E7DC] dark:border-[#283C55] rounded-xl text-[#243047] dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-[#F2F5F0] dark:hover:bg-[#1A2534]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#176044] hover:bg-[#134e37] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-[#D6A85C]" />
                  <span>Salvar Anotação</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
