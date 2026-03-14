import React, { useState } from 'react';
import { CONTACT_HOSTED_ZONE } from '../constants';
import { DnsRecord } from '../types';
import { ArrowLeft, Copy, Info, Search, ChevronDown } from 'lucide-react';

interface DnsDetailsProps {
  onBack: () => void;
}

const TYPE_BADGE_COLORS: Record<DnsRecord['type'], string> = {
  A: 'bg-green-900/40 text-green-400 border-green-800',
  CNAME: 'bg-blue-900/40 text-blue-400 border-blue-800',
  MX: 'bg-purple-900/40 text-purple-400 border-purple-800',
  TXT: 'bg-yellow-900/40 text-yellow-400 border-yellow-800',
  NS: 'bg-gray-800/60 text-gray-400 border-gray-700',
  SOA: 'bg-gray-800/60 text-gray-400 border-gray-700',
};

const DnsDetails: React.FC<DnsDetailsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('Records');
  const zone = CONTACT_HOSTED_ZONE;

  const tabs = ['Records', 'DNSSEC signing', 'Hosted zone details', 'Tags'];

  return (
    <div className="flex flex-col h-full text-sm">
      {/* Breadcrumb & Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span className="hover:text-cyan-500 cursor-pointer" onClick={onBack}>Networking</span>
          <span>{'>'}</span>
          <span className="hover:text-cyan-500 cursor-pointer" onClick={onBack}>DNS</span>
          <span>{'>'}</span>
          <span className="hover:text-cyan-500 cursor-pointer" onClick={onBack}>Hosted zones</span>
          <span>{'>'}</span>
          <span className="text-gray-300">{zone.domainName}</span>
        </div>

        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 hover:bg-slate-700 rounded-full mr-1">
              <ArrowLeft size={20} className="text-gray-400" />
            </button>
            <h1 className="text-2xl font-bold text-white">{zone.domainName}</h1>
            <span className="text-cyan-500 text-xs font-normal ml-1 cursor-pointer">Info</span>
          </div>

          <div className="flex gap-2">
            <button className="bg-white text-gray-900 font-bold px-3 py-1.5 rounded text-xs border border-gray-300 hover:bg-gray-100 flex items-center gap-1">
              Actions <ChevronDown size={14} />
            </button>
            <button className="bg-orange-600 text-white font-bold px-3 py-1.5 rounded text-xs hover:bg-orange-500 flex items-center gap-1">
              Create record
            </button>
          </div>
        </div>
      </div>

      {/* Zone Details Bar */}
      <div className="bg-[#0f1117] border border-gray-700 rounded-sm mb-6 p-4">
        <div className="flex items-center gap-8 overflow-x-auto">
          <div className="flex flex-col gap-1 min-w-[140px]">
            <span className="text-xs text-gray-400">Hosted zone ID</span>
            <div className="flex items-center gap-1 text-gray-200">
              <span className="font-mono text-xs">{zone.id}</span>
              <Copy size={12} className="text-gray-500 cursor-pointer hover:text-white" />
            </div>
          </div>
          <div className="flex flex-col gap-1 min-w-[120px]">
            <span className="text-xs text-gray-400">Domain name</span>
            <span className="text-gray-200 text-xs">{zone.domainName}</span>
          </div>
          <div className="flex flex-col gap-1 min-w-[100px]">
            <span className="text-xs text-gray-400">Type</span>
            <span className="text-gray-200 text-xs">{zone.type} hosted zone</span>
          </div>
          <div className="flex flex-col gap-1 min-w-[100px]">
            <span className="text-xs text-gray-400">Record count</span>
            <span className="text-gray-200 text-lg font-bold">{zone.recordCount}</span>
          </div>
          <div className="flex flex-col gap-1 min-w-[140px]">
            <span className="text-xs text-gray-400">Description</span>
            <span className="text-gray-200 text-xs">{zone.description}</span>
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
        {activeTab === 'Records' && (
          <div className="space-y-4">
            {/* Search */}
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="Filter records by name, type, or value"
                  className="w-full bg-[#0f1117] border border-gray-600 rounded px-3 py-1.5 pl-9 text-gray-300 focus:border-orange-500 focus:outline-none placeholder-gray-500"
                />
                <Search className="absolute left-2.5 top-2 text-gray-500" size={14} />
              </div>
            </div>

            {/* Records Table */}
            <div className="border border-gray-700 rounded bg-[#0f1117] overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800 text-gray-400 font-semibold border-b border-gray-700 text-xs">
                  <tr>
                    <th className="p-3 w-8"><input type="checkbox" className="rounded bg-gray-700 border-gray-600" /></th>
                    <th className="p-3">Record name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Routing policy</th>
                    <th className="p-3">Value</th>
                    <th className="p-3">TTL</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {zone.records.map((record, idx) => (
                    <tr key={idx} className="hover:bg-[#1f2937]">
                      <td className="p-3"><input type="checkbox" className="rounded bg-gray-700 border-gray-600" /></td>
                      <td className="p-3 font-medium text-gray-200">{record.name}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-mono border ${TYPE_BADGE_COLORS[record.type]}`}>
                          {record.type}
                        </span>
                      </td>
                      <td className="p-3 text-gray-400">Simple</td>
                      <td className="p-3 max-w-[300px]">
                        {record.href ? (
                          <a
                            href={record.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-500 hover:underline hover:text-cyan-400 break-all"
                          >
                            {record.value}
                          </a>
                        ) : (
                          <span className="text-gray-400 break-all font-mono text-xs">{record.value}</span>
                        )}
                      </td>
                      <td className="p-3 text-gray-400 font-mono">{record.ttl}</td>
                      <td className="p-3">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                          <span className="text-gray-200">{record.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="h-full">
                    <td colSpan={7} className="p-8"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Hosted zone details' && (
          <div className="space-y-6 max-w-5xl">
            <div className="border border-gray-700 rounded bg-[#161e2d]">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">Hosted zone configuration</h3>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-y-6">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Domain name</div>
                  <div className="text-sm text-gray-200">{zone.domainName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Hosted zone ID</div>
                  <div className="text-sm text-gray-200 flex items-center gap-2 font-mono">
                    {zone.id} <Copy size={12} className="cursor-pointer text-gray-500 hover:text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Type</div>
                  <div className="text-sm text-gray-200">{zone.type} hosted zone</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Record count</div>
                  <div className="text-sm text-gray-200">{zone.recordCount}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Description</div>
                  <div className="text-sm text-gray-200">{zone.description}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'Records' && activeTab !== 'Hosted zone details' && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Info size={40} className="mb-4 opacity-50" />
            <p>No {activeTab.toLowerCase()} data available.</p>
            <button className="mt-4 text-cyan-500 hover:underline" onClick={() => setActiveTab('Records')}>Return to Records</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DnsDetails;
