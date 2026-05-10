import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Copy, Search, Globe, Settings } from 'lucide-react';
import { CONTACT_HOSTED_ZONE } from '../constants';
import Card from './Card';
import { Breadcrumbs, TabBar, KeyValueGrid } from './ui/Layout';
import { PrimaryButton, SecondaryButton } from './ui/Buttons';
import { DnsBadge, StatusDot } from './ui/Pills';

interface DnsDetailsProps {
  onBack: () => void;
}

const DnsDetails: React.FC<DnsDetailsProps> = ({ onBack }) => {
  const zone = CONTACT_HOSTED_ZONE;
  const [tab, setTab] = useState('Records');

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Networking', onClick: onBack },
          { label: 'DNS', onClick: onBack },
          { label: 'Hosted zones', onClick: onBack },
          { label: zone.domainName },
        ]}
      />

      <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-white text-xl font-bold font-mono">{zone.domainName}</h1>
            <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-300">
              <StatusDot state="insync" />
              INSYNC
            </span>
          </div>
          <div className="text-gray-500 text-[12px] font-mono break-all">{zone.id}</div>
        </div>
        <div className="flex items-center gap-2">
          <SecondaryButton onClick={onBack}><ArrowLeft size={11} />Back</SecondaryButton>
          <SecondaryButton><Copy size={11} />Copy zone ID</SecondaryButton>
          <SecondaryButton>Actions <ChevronDown size={11} /></SecondaryButton>
          <PrimaryButton>Create record</PrimaryButton>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {[
          ['Domain', zone.domainName],
          ['Type', `${zone.type}`],
          ['Records', `${zone.recordCount}`],
          ['Description', zone.description],
        ].map(([k, v]) => (
          <div
            key={k}
            className="bg-slate-800/70 border border-slate-700/80 rounded-md p-3"
            style={{ boxShadow: '0 1px 0 0 rgba(255,255,255,0.04) inset' }}
          >
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{k}</div>
            <div className="text-white font-semibold mt-1 text-[13px] font-mono break-words">{v}</div>
          </div>
        ))}
      </div>

      <TabBar tabs={['Records', 'Hosted zone details']} active={tab} onChange={setTab} />

      <div key={tab} className="animate-tab-enter">
      {tab === 'Records' && (
        <Card
          title="Records"
          icon={<Globe size={14} />}
          showKebab={false}
          headerAction={
            <>
              <SecondaryButton>Export</SecondaryButton>
              <PrimaryButton>Create record</PrimaryButton>
            </>
          }
        >
          <div className="flex gap-3 mb-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Filter records by name, type, or value"
                className="w-full bg-[#0f1117] border border-slate-700 rounded px-3 py-1.5 pl-8 text-[12px] text-gray-300 focus:border-orange-500 focus:outline-none placeholder-gray-500"
              />
              <Search className="absolute left-2.5 top-2 text-gray-500" size={13} />
            </div>
          </div>
          <div className="-mx-4 -mb-4 overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-left text-gray-500 border-b border-slate-700/80 bg-slate-900/30">
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Record name</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Type</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Value</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">TTL</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {zone.records.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-700/30">
                    <td className="px-4 py-2.5 font-mono text-gray-200">{r.name}</td>
                    <td className="px-4 py-2.5">
                      <DnsBadge type={r.type} />
                    </td>
                    <td className="px-4 py-2.5 max-w-[360px]">
                      {r.href ? (
                        <a
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline break-all"
                        >
                          {r.value}
                        </a>
                      ) : (
                        <span className="text-gray-400 break-all font-mono">{r.value}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-gray-300 font-mono">{r.ttl}</td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-1.5 text-gray-300">
                        <StatusDot state="insync" />
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'Hosted zone details' && (
        <Card title="Configuration" icon={<Settings size={14} />} showKebab={false}>
          <KeyValueGrid
            cols={2}
            items={[
              ['Domain name', <span className="font-mono">{zone.domainName}</span>],
              ['Hosted zone ID', <span className="font-mono break-all">{zone.id}</span>],
              ['Type', `${zone.type} hosted zone`],
              ['Record count', <span className="font-mono">{zone.recordCount}</span>],
              ['Description', zone.description],
            ]}
          />
        </Card>
      )}
      </div>
    </div>
  );
};

export default DnsDetails;
