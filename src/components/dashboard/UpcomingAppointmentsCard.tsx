import React from 'react';
import { Calendar, Clock, MapPin, Video, Plus, ArrowRight } from 'lucide-react';
import { AppointmentEvent } from '../../types/dayflow';

interface UpcomingAppointmentsCardProps {
  events: AppointmentEvent[];
  onOpenQuickCreate: () => void;
  onSelectEvent?: (event: AppointmentEvent) => void;
}

export const UpcomingAppointmentsCard: React.FC<UpcomingAppointmentsCardProps> = ({
  events,
  onOpenQuickCreate,
}) => {
  // Sort events by date and startTime
  const sortedEvents = [...events].sort((a, b) => {
    return `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`);
  });

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'reuniao':
        return 'Reunião de Alinhamento';
      case 'foco':
        return 'Bloco de Foco';
      case 'saude':
        return 'Saúde & Bem-estar';
      case 'pessoal':
        return 'Pessoal';
      default:
        return 'Compromisso';
    }
  };

  const formatEventDate = (dateStr: string) => {
    if (dateStr === '2026-11-03') return 'Hoje';
    if (dateStr === '2026-11-04') return 'Amanhã';
    const [, month, day] = dateStr.split('-');
    return `${day}/${month}`;
  };

  return (
    <div className="rounded-2xl border border-[#E0E7DC] dark:border-[#223348] bg-white dark:bg-[#15202E] p-5 shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-[#F0F2ED] dark:border-[#1F2E40] mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#E6F0E9] dark:bg-[#193226] text-[#176044] dark:text-[#A8D5BA]">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#243047] dark:text-white uppercase tracking-wider">
              Próximos Compromissos
            </h2>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
              Agenda integrada
            </p>
          </div>
        </div>

        <button
          onClick={onOpenQuickCreate}
          className="text-xs text-[#176044] dark:text-[#A8D5BA] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Agendar</span>
        </button>
      </div>

      {/* Events timeline list */}
      <div className="space-y-3">
        {sortedEvents.length === 0 ? (
          <div className="py-6 text-center text-xs text-[#64748B]">
            Nenhum compromisso agendado.
          </div>
        ) : (
          sortedEvents.map((evt) => {
            const isToday = evt.date === '2026-11-03';
            const isOnline = evt.location?.toLowerCase().includes('meet') || evt.location?.toLowerCase().includes('zoom');

            return (
              <div
                key={evt.id}
                className="p-3 rounded-xl border border-[#F0F2ED] dark:border-[#1F2E40] bg-[#FAFBF9] dark:bg-[#1A2534] hover:border-[#176044]/30 dark:hover:border-[#A8D5BA]/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#176044] dark:text-[#A8D5BA]">
                      <span className="font-mono tabular-nums text-xs">
                        {evt.startTime} — {evt.endTime}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[11px] font-normal text-[#64748B] dark:text-[#94A3B8]">
                        {formatEventDate(evt.date)}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#243047] dark:text-white mt-1 group-hover:text-[#176044] dark:group-hover:text-[#A8D5BA] transition-colors truncate">
                      {evt.title}
                    </h4>

                    {evt.description && (
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5 line-clamp-1">
                        {evt.description}
                      </p>
                    )}

                    {/* Meta info: Location and Tag */}
                    <div className="flex items-center gap-2 mt-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
                      <span>{getEventBadge(evt.type)}</span>
                      {evt.location && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1 truncate">
                            {isOnline ? (
                              <Video className="w-3 h-3 text-[#D6A85C]" />
                            ) : (
                              <MapPin className="w-3 h-3 text-[#176044] dark:text-[#A8D5BA]" />
                            )}
                            {evt.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status label if today */}
                  {isToday && (
                    <span className="shrink-0 text-[10px] font-semibold text-[#B88B42] dark:text-[#D6A85C] uppercase tracking-wider bg-[#FBF4E7] dark:bg-[#2B2315] px-2 py-0.5 rounded">
                      Hoje
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
