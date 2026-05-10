import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  RefreshCw,
  Database,
  Folder,
  Download,
  Settings,
  Activity,
} from 'lucide-react';
import Card from './Card';
import { Breadcrumbs, TabBar, KeyValueGrid } from './ui/Layout';
import { PrimaryButton, SecondaryButton } from './ui/Buttons';
import { Badge, StatusDot } from './ui/Pills';
import MetricChart, { MetricPattern } from './ui/MetricChart';
import { EDUCATION_CLUSTER } from '../constants';

const DB_METRICS: { title: string; pattern: MetricPattern }[] = [
  { title: 'CPU Utilization',  pattern: 'cpu' },
  { title: 'DB Connections',   pattern: 'connections' },
  { title: 'Read IOPS',        pattern: 'iops' },
  { title: 'Free Storage',     pattern: 'storage' },
];

interface DatabaseDetailsProps {
  onBack: () => void;
}

const DatabaseDetails: React.FC<DatabaseDetailsProps> = ({ onBack }) => {
  const cluster = EDUCATION_CLUSTER;
  const [tab, setTab] = useState('Schemas');
  const [openSchema, setOpenSchema] = useState(cluster.schemas[0].name);
  const schema = cluster.schemas.find((s) => s.name === openSchema) || cluster.schemas[0];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Relational Database', onClick: onBack },
          { label: 'Databases', onClick: onBack },
          { label: cluster.dbIdentifier },
        ]}
      />

      <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-white text-xl font-bold font-mono">{cluster.dbIdentifier}</h1>
            <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-300">
              <StatusDot state={cluster.status} />
              {cluster.status}
            </span>
          </div>
          <div className="text-gray-500 text-[12px] font-mono break-all">
            {cluster.endpoint}:{cluster.port}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SecondaryButton onClick={onBack}><ArrowLeft size={11} />Back</SecondaryButton>
          <SecondaryButton><RefreshCw size={11} />Reboot</SecondaryButton>
          <SecondaryButton>Actions <ChevronDown size={11} /></SecondaryButton>
          <PrimaryButton>Connect</PrimaryButton>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {[
          ['Engine', cluster.engine],
          ['Instance class', cluster.instanceClass],
          ['Multi-AZ', cluster.multiAZ ? 'Yes' : 'No'],
          ['Backup retention', cluster.backupRetention],
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

      <TabBar tabs={['Schemas', 'Configuration', 'Monitoring']} active={tab} onChange={setTab} />

      <div key={tab} className="animate-tab-enter">
      {tab === 'Schemas' && (
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
          <Card title={`Schemas (${cluster.schemas.length})`} icon={<Database size={14} />} showKebab={false}>
            <ul className="-my-1.5 divide-y divide-slate-700/40">
              {cluster.schemas.map((s) => {
                const isOpen = openSchema === s.name;
                return (
                  <li key={s.name}>
                    <button
                      onClick={() => setOpenSchema(s.name)}
                      className={`w-full text-left py-2 px-2 -mx-2 rounded flex items-center gap-2 transition-colors ${
                        isOpen ? 'bg-slate-700/40' : 'hover:bg-slate-700/30'
                      }`}
                    >
                      <Folder size={13} className={isOpen ? 'text-orange-400' : 'text-gray-500'} />
                      <div className="min-w-0 flex-1">
                        <div className={`font-mono text-[12px] truncate ${isOpen ? 'text-white' : 'text-blue-400'}`}>
                          {s.name}
                        </div>
                        <div className="text-[10.5px] text-gray-500 truncate">{s.type}</div>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">{s.tables.length}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card
            title={`${schema.name}.tables`}
            icon={<Database size={14} />}
            showKebab={false}
            headerAction={<SecondaryButton><Download size={11} />Export schema</SecondaryButton>}
          >
            <div key={openSchema} className="animate-tab-enter">
            <KeyValueGrid
              cols={2}
              items={[
                ['Institution', schema.institution],
                ['Period', <span className="font-mono">{schema.period}</span>],
                ['Type', schema.type],
                ['Grade', <Badge tone="green">{schema.grade}</Badge>],
              ]}
            />
            <div className="mt-4 border-t border-slate-700/60 -mx-4 -mb-4 overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-slate-700/80 bg-slate-900/30">
                    <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Table name</th>
                    <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Result</th>
                    <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px] text-right">
                      Credits / Year
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/40">
                  {schema.tables.map((t) => (
                    <tr key={t.name} className="hover:bg-slate-700/30">
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center gap-2">
                          <Database size={12} className="text-orange-400" />
                          <span className="font-mono text-blue-400 hover:underline cursor-pointer">{t.name}</span>
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-gray-300">{t.result}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-gray-300">{t.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </Card>
        </div>
      )}

      {tab === 'Configuration' && (
        <Card title="Configuration" icon={<Settings size={14} />} showKebab={false}>
          <KeyValueGrid
            cols={2}
            items={[
              ['DB identifier', <span className="font-mono">{cluster.dbIdentifier}</span>],
              ['Engine version', <span className="font-mono">{cluster.engine}</span>],
              ['Instance class', <span className="font-mono">{cluster.instanceClass}</span>],
              ['Endpoint', <span className="font-mono break-all">{cluster.endpoint}</span>],
              ['Port', <span className="font-mono">{cluster.port}</span>],
              ['Storage', cluster.storage],
              ['Multi-AZ', cluster.multiAZ ? <Badge tone="green">Enabled</Badge> : <Badge tone="gray">Disabled</Badge>],
              ['Backup retention', cluster.backupRetention],
            ]}
          />
        </Card>
      )}

      {tab === 'Monitoring' && (
        <Card title="CloudWatch metrics" icon={<Activity size={14} />} showKebab={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DB_METRICS.map((m) => (
              <MetricChart key={m.title} title={m.title} pattern={m.pattern} />
            ))}
          </div>
        </Card>
      )}
      </div>
    </div>
  );
};

export default DatabaseDetails;
