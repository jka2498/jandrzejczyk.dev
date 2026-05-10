import React from 'react';
import { Experience } from '../../types';
import Card from '../Card';
import { StatusDot } from '../ui/Pills';
import { AlertCircle } from 'lucide-react';

interface EC2WidgetProps {
  onRowClick?: (experience: Experience) => void;
  experiences: Experience[];
  loading: boolean;
  error: string | null;
}

const EC2Widget: React.FC<EC2WidgetProps> = ({ onRowClick, experiences, loading, error }) => {

  return (
    <Card 
        title="Instances (Experience)" 
        headerAction={
            <button className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold py-1.5 px-3 rounded shadow-sm transition-colors">
                Launch instance
            </button>
        }
        className="col-span-1 lg:col-span-2"
    >
      <div className="flex flex-col h-full">
        {/* Filter Bar Simulation */}
        <div className="flex gap-4 mb-4 text-sm">
            <div className="relative flex-1 max-w-sm">
                 <input type="text" placeholder="Filter instances" className="w-full bg-[#0f1117] border border-gray-600 rounded px-3 py-1 text-gray-300 focus:border-orange-500 focus:outline-none" />
            </div>
            <div className="flex items-center gap-2 text-gray-400">
                <span>Region:</span>
                <span className="text-white font-medium">Global</span>
            </div>
        </div>

        <div className="overflow-x-auto border border-gray-700 rounded bg-[#0f1117] min-h-[150px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-800 text-gray-400 font-semibold border-b border-gray-700">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Instance ID</th>
                <th className="p-3">Instance state</th>
                <th className="p-3">Instance type</th>
                <th className="p-3">Availability Zone</th>
                <th className="p-3">Status check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading && Array.from({ length: 3 }).map((_, i) => (
                <tr key={`skeleton-${i}`} aria-hidden>
                  <td className="p-3"><div className="h-3 w-32 bg-slate-700/40 rounded" /></td>
                  <td className="p-3"><div className="h-3 w-48 bg-slate-700/40 rounded" /></td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700/40" />
                      <div className="h-3 w-16 bg-slate-700/40 rounded" />
                    </div>
                  </td>
                  <td className="p-3"><div className="h-3 w-24 bg-slate-700/40 rounded" /></td>
                  <td className="p-3"><div className="h-3 w-20 bg-slate-700/40 rounded" /></td>
                  <td className="p-3"><div className="h-3 w-28 bg-slate-700/40 rounded" /></td>
                </tr>
              ))}
              
              {error && (
                 <tr>
                    <td colSpan={6} className="p-8 text-center text-red-400">
                        <div className="flex items-center justify-center gap-2">
                             <AlertCircle size={20} />
                             <span>{error}</span>
                        </div>
                    </td>
                 </tr>
              )}

              {!loading && !error && experiences.map((exp) => (
                <tr 
                  key={exp.id} 
                  className="hover:bg-[#1f2937] transition-colors group cursor-pointer"
                  onClick={() => onRowClick && onRowClick(exp)}
                >
                  <td className="p-3 text-cyan-500 font-medium group-hover:underline">{exp.role}</td>
                  <td className="p-3 text-gray-300 font-mono text-xs">{exp.id} <span className="text-gray-500">({exp.company})</span></td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                        <StatusDot state={exp.state} />
                        <span className="capitalize">{exp.state}</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-300">{exp.type}</td>
                  <td className="p-3 text-gray-400">{exp.az}</td>
                  <td className="p-3 text-green-500 flex items-center gap-1">
                     <span className="text-xs border border-green-700 bg-green-900/30 px-1 rounded">2/2 checks passed</span>
                  </td>
                </tr>
              ))}
              
              {!loading && !error && experiences.length === 0 && (
                   <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                        No instances found.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
            <span>Showing {experiences.length} instances</span>
            <a href="#" className="text-cyan-500 hover:underline">View all instances</a>
        </div>
      </div>
    </Card>
  );
};

export default EC2Widget;