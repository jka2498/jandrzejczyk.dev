import React from 'react';
import { RECENT_SERVICES } from '../../constants';
import { Server, HardDrive, Shield, Activity, Database, Globe } from 'lucide-react';
import Card from '../Card';

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server size={16} />,
  HardDrive: <HardDrive size={16} />,
  Shield: <Shield size={16} />,
  Activity: <Activity size={16} />,
  Database: <Database size={16} />,
  Globe: <Globe size={16} />,
};

interface RecentServicesWidgetProps {
  onNavigate?: (serviceId: string) => void;
}

const RecentServicesWidget: React.FC<RecentServicesWidgetProps> = ({ onNavigate }) => {
  return (
    <Card title="Recently visited" showKebab={false}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-1.5 gap-x-6">
        {RECENT_SERVICES.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => onNavigate?.(service.id)}
            className="group flex items-start gap-2.5 p-2 -mx-1 rounded hover:bg-slate-800/60 cursor-pointer transition-colors text-left"
          >
            <span className="mt-0.5 p-1.5 rounded bg-slate-900/60 text-orange-400 group-hover:text-orange-300 group-hover:bg-slate-900 border border-slate-700/60">
              {iconMap[service.icon]}
            </span>
            <span className="min-w-0">
              <span className="block text-cyan-400 font-semibold text-[13px] group-hover:underline group-hover:text-cyan-300 truncate">
                {service.name}
              </span>
              <span className="block text-[11px] text-gray-500 mt-0.5 truncate">{service.description}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-slate-700/60">
        <a
          href="#"
          className="text-cyan-400 text-[12px] font-medium hover:underline hover:text-cyan-300 inline-flex items-center gap-1"
        >
          View all services
        </a>
      </div>
    </Card>
  );
};

export default RecentServicesWidget;
