import React, { useState } from 'react';
import { EDUCATION_DATA } from '../constants';
import { EducationRecord } from '../types';
import { ArrowLeft, ChevronDown, Copy, Info, Search, Database } from 'lucide-react';

interface DatabaseDetailsProps {
  onBack: () => void;
}

const DatabaseDetails: React.FC<DatabaseDetailsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('Databases');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const tabs = ['Databases', 'Query editor', 'Performance insights', 'Snapshots', 'Automated backups', 'Reserved instances', 'Tags'];

  return (
    <div className="flex flex-col h-full text-sm">
      {/* Breadcrumb & Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span className="hover:text-cyan-500 cursor-pointer" onClick={onBack}>Database</span>
          <span>{'>'}</span>
          <span className="hover:text-cyan-500 cursor-pointer" onClick={onBack}>RDS</span>
          <span>{'>'}</span>
          <span className="text-gray-300">Databases</span>
        </div>

        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 hover:bg-slate-700 rounded-full mr-1">
              <ArrowLeft size={20} className="text-gray-400" />
            </button>
            <h1 className="text-2xl font-bold text-white">Databases</h1>
            <span className="text-cyan-500 text-xs font-normal ml-1 cursor-pointer">Info</span>
          </div>

          <div className="flex gap-2">
            <button className="bg-white text-gray-900 font-bold px-3 py-1.5 rounded text-xs border border-gray-300 hover:bg-gray-100 flex items-center gap-1">
              Actions <ChevronDown size={14} />
            </button>
            <button className="bg-orange-600 text-white font-bold px-3 py-1.5 rounded text-xs hover:bg-orange-500 flex items-center gap-1">
              Create database
            </button>
          </div>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="bg-[#0f1117] border border-gray-700 rounded-sm mb-6 p-4">
        <div className="flex items-center gap-8 overflow-x-auto">
          <div className="flex flex-col gap-1 min-w-[120px]">
            <span className="text-xs text-gray-400">DB instances</span>
            <span className="text-gray-200 text-lg font-bold">{EDUCATION_DATA.length}</span>
          </div>
          <div className="flex flex-col gap-1 min-w-[120px]">
            <span className="text-xs text-gray-400">Engine</span>
            <span className="text-gray-200 text-xs">{EDUCATION_DATA[0]?.engine}</span>
          </div>
          <div className="flex flex-col gap-1 min-w-[120px]">
            <span className="text-xs text-gray-400">Region</span>
            <span className="text-gray-200 text-xs">eu-west-2 (London)</span>
          </div>
          <div className="flex flex-col gap-1 min-w-[120px]">
            <span className="text-xs text-gray-400">Multi-AZ</span>
            <span className="text-gray-200 text-xs">No</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700 mb-4 flex gap-6 text-sm">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-1 border-b-2 transition-colors ${activeTab === tab ? 'border-orange-500 text-orange-500 font-bold' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1">
        {activeTab === 'Databases' && (
          <div className="space-y-4">
            {/* Search */}
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="Filter databases"
                  className="w-full bg-[#0f1117] border border-gray-600 rounded px-3 py-1.5 pl-9 text-gray-300 focus:border-orange-500 focus:outline-none placeholder-gray-500"
                />
                <Search className="absolute left-2.5 top-2 text-gray-500" size={14} />
              </div>
            </div>

            {/* Databases Table */}
            <div className="border border-gray-700 rounded bg-[#0f1117] overflow-hidden">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-800 text-gray-400 font-semibold border-b border-gray-700 text-xs">
                  <tr>
                    <th className="p-3 w-8"><input type="checkbox" className="rounded bg-gray-700 border-gray-600" /></th>
                    <th className="p-3">DB identifier</th>
                    <th className="p-3">Engine</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Class</th>
                    <th className="p-3">Grade</th>
                    <th className="p-3">Availability Zone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {EDUCATION_DATA.map((edu) => (
                    <React.Fragment key={edu.id}>
                      <tr
                        className="hover:bg-[#1f2937] cursor-pointer group"
                        onClick={() => setExpandedRow(expandedRow === edu.id ? null : edu.id)}
                      >
                        <td className="p-3"><input type="checkbox" className="rounded bg-gray-700 border-gray-600" /></td>
                        <td className="p-3 font-medium text-cyan-500 group-hover:underline flex items-center gap-2">
                          <Database size={14} className="text-blue-400" />
                          {edu.id}
                        </td>
                        <td className="p-3 text-gray-400">{edu.engine}</td>
                        <td className="p-3">
                          <span className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${edu.status === 'available' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-yellow-500'}`}></span>
                            <span className="text-gray-200 capitalize">{edu.status === 'available' ? 'Available' : 'Stopped'}</span>
                          </span>
                        </td>
                        <td className="p-3 text-gray-400 font-mono">{edu.instanceClass}</td>
                        <td className="p-3 text-gray-200 font-medium">{edu.grade}</td>
                        <td className="p-3 text-gray-400">{edu.az}</td>
                      </tr>
                      {expandedRow === edu.id && (
                        <tr>
                          <td colSpan={7} className="p-0">
                            <EducationExpandedPanel edu={edu} />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  <tr className="h-full">
                    <td colSpan={7} className="p-8"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Tags' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="relative max-w-sm w-full">
                <input
                  type="text"
                  placeholder="Find tags by key or value"
                  className="w-full bg-[#0f1117] border border-gray-600 rounded px-3 py-1.5 pl-9 text-gray-300 focus:border-orange-500 focus:outline-none placeholder-gray-500"
                />
                <Search className="absolute left-2.5 top-1.5 text-gray-500" size={16} />
              </div>
              <button className="bg-white text-gray-900 font-bold px-3 py-1.5 rounded text-xs border border-gray-300 hover:bg-gray-100">
                Manage tags
              </button>
            </div>

            <div className="border border-gray-700 rounded bg-[#0f1117] overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800 text-gray-400 font-semibold border-b border-gray-700">
                  <tr>
                    <th className="p-3 border-r border-gray-700 w-1/3">Key</th>
                    <th className="p-3">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {Object.entries(EDUCATION_DATA[0]?.tags ?? {}).map(([key, value]) => (
                    <tr key={key} className="hover:bg-[#1f2937]">
                      <td className="p-3 border-r border-gray-800 font-medium text-gray-300">{key}</td>
                      <td className="p-3 text-gray-400">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== 'Databases' && activeTab !== 'Tags' && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Info size={40} className="mb-4 opacity-50" />
            <p>No {activeTab.toLowerCase()} data available.</p>
            <button className="mt-4 text-cyan-500 hover:underline" onClick={() => setActiveTab('Databases')}>Return to Databases</button>
          </div>
        )}
      </div>
    </div>
  );
};

/* Expanded detail panel for a single education record */
const EducationExpandedPanel: React.FC<{ edu: EducationRecord }> = ({ edu }) => (
  <div className="bg-[#161e2d] border-t border-gray-700 p-6 space-y-6">
    {/* Key-value grid */}
    <div>
      <div className="text-lg font-bold text-white flex items-center gap-2 mb-4">
        <ChevronDown size={20} />
        <h2>Configuration</h2>
        <span className="text-cyan-500 text-xs font-normal ml-2 cursor-pointer">Info</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-12 px-2">
        <div className="space-y-4">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Institution</div>
            <div className="text-sm text-gray-200">{edu.institution}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">DB Identifier</div>
            <div className="flex items-center gap-1 text-gray-200 text-xs font-mono">{edu.id} <Copy size={12} /></div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Degree</div>
            <div className="text-sm text-gray-200">{edu.degree} {edu.field}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Engine</div>
            <div className="text-sm text-gray-200 font-mono">{edu.engine}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Grade</div>
            <div className="text-sm text-gray-200 font-medium">{edu.grade}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Instance class</div>
            <div className="text-sm text-gray-200 font-mono">{edu.instanceClass}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Period</div>
            <div className="text-sm text-gray-200">{edu.startYear} – {edu.endYear}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Availability Zone</div>
            <div className="text-sm text-gray-200">{edu.az}</div>
          </div>
        </div>
      </div>
    </div>

    <hr className="border-gray-700" />

    {/* Modules list styled like Parameter group */}
    <div>
      <div className="text-lg font-bold text-white flex items-center gap-2 mb-4">
        <ChevronDown size={20} />
        <h2>Parameter group (Modules)</h2>
      </div>

      <div className="bg-[#0f1117] border border-gray-700 rounded p-4 font-mono text-xs text-gray-300">
        <div className="text-gray-500 mb-2"># Modules completed</div>
        <ul className="space-y-2">
          {edu.modules.map((mod, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-orange-500 shrink-0">{'>'}</span>
              <span className="leading-relaxed">{mod}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default DatabaseDetails;
