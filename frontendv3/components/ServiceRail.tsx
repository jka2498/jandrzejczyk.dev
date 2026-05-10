import React from 'react';
import { Server, HardDrive, Shield, Activity, Database, Globe, MoreVertical, Folder } from 'lucide-react';
import { ServiceLink } from '../types';

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Server, HardDrive, Shield, Activity, Database, Globe, Folder,
};

interface ServiceRailProps {
  services: ServiceLink[];
  active: string | null;
  onOpen: (id: string) => void;
}

const ServiceRail: React.FC<ServiceRailProps> = ({ services, active, onOpen }) => {
  return (
    <aside
      className="hidden md:flex w-12 bg-slate-900/80 border-r border-slate-800/80 flex-col items-center py-2 gap-0.5 sticky top-[52px] shrink-0"
      style={{ height: 'calc(100vh - 52px)' }}
    >
      {services.map((s) => {
        const Icon = ICONS[s.icon] || Folder;
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onOpen(s.id)}
            title={s.name}
            className={`group relative w-9 h-9 flex items-center justify-center rounded-[4px] transition-colors ${
              isActive ? 'bg-slate-800 text-orange-400' : 'text-gray-400 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <Icon size={16} />
            {isActive && <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-orange-500 rounded-r" />}
            <span className="absolute left-12 ml-2 px-2 py-1 bg-slate-800 border border-slate-700 text-white text-[11px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
              {s.name}
            </span>
          </button>
        );
      })}
      <div className="flex-1" />
      <button className="w-9 h-9 flex items-center justify-center rounded-[4px] text-gray-500 hover:bg-slate-800/70 hover:text-white">
        <MoreVertical size={14} />
      </button>
    </aside>
  );
};

export default ServiceRail;
