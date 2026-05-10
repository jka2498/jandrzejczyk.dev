import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  Copy,
  Server,
  Activity,
  Key,
  CheckCircle2,
  Search,
} from 'lucide-react';
import Card from './Card';
import { Breadcrumbs, TabBar, KeyValueGrid } from './ui/Layout';
import { PrimaryButton, SecondaryButton } from './ui/Buttons';
import { Badge, StatusDot } from './ui/Pills';
import MetricChart, { MetricPattern } from './ui/MetricChart';
import { Experience } from '../types';

const INSTANCE_METRICS: { title: string; pattern: MetricPattern }[] = [
  { title: 'CPU Utilization',  pattern: 'cpu' },
  { title: 'Network In',       pattern: 'network' },
  { title: 'Disk Reads',       pattern: 'disk' },
  { title: 'Status Check',     pattern: 'status' },
];

interface InstanceDetailsProps {
  instance: Experience;
  onBack: () => void;
}

const InstanceDetails: React.FC<InstanceDetailsProps> = ({ instance, onBack }) => {
  const [tab, setTab] = useState('Details');

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Compute', onClick: onBack },
          { label: 'Instances', onClick: onBack },
          { label: instance.id },
        ]}
      />

      <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
        <div className="min-w-0">
          <h1 className="text-white text-xl font-bold truncate">{instance.role}</h1>
          <div className="text-gray-400 text-[12px] mt-0.5">
            {instance.company} · <span className="font-mono text-gray-500">{instance.id}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SecondaryButton onClick={onBack}><ArrowLeft size={11} />Back</SecondaryButton>
          <SecondaryButton>Connect</SecondaryButton>
          <SecondaryButton>Actions <ChevronDown size={11} /></SecondaryButton>
          <PrimaryButton>Instance state</PrimaryButton>
        </div>
      </div>

      <TabBar tabs={['Details', 'Achievements', 'Tags', 'Monitoring']} active={tab} onChange={setTab} />

      <div key={tab} className="animate-tab-enter">
      {tab === 'Details' && (
        <Card title="Instance summary" icon={<Server size={14} />} showKebab={false}>
          <KeyValueGrid
            cols={4}
            items={[
              ['Instance ID', <span className="font-mono">{instance.id}</span>],
              [
                'State',
                <span className="inline-flex items-center gap-1.5">
                  <StatusDot state={instance.state} />
                  <span className="text-white capitalize">{instance.state}</span>
                </span>,
              ],
              ['Instance type', <span className="font-mono">{instance.type}</span>],
              ['Availability zone', <span className="font-mono">{instance.az}</span>],
              ['Launch time', <span className="font-mono">{instance.launchTime}</span>],
              ['Owner', instance.tags.Owner],
              ['Platform', instance.tags.Platform],
              [
                'Environment',
                <Badge tone={instance.tags.Environment === 'Production' ? 'green' : 'yellow'}>
                  {instance.tags.Environment || '—'}
                </Badge>,
              ],
            ]}
          />
        </Card>
      )}

      {tab === 'Achievements' && (
        <Card title="Achievements (User data)" icon={<Activity size={14} />} showKebab={false}>
          <ul className="space-y-2.5 text-[13px] text-gray-300">
            {instance.description.map((d, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="text-orange-400 mt-1 shrink-0">
                  <CheckCircle2 size={12} />
                </span>
                <span className="leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {tab === 'Tags' && (
        <Card
          title="Tags"
          icon={<Key size={14} />}
          showKebab={false}
          headerAction={
            <>
              <SecondaryButton>Manage tags</SecondaryButton>
            </>
          }
        >
          <div className="-mx-4 -mb-4 overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-left text-gray-500 border-b border-slate-700/80 bg-slate-900/30">
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px] w-1/3">Key</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {Object.entries(instance.tags).map(([k, v]) => (
                  <tr key={k} className="hover:bg-slate-700/30">
                    <td className="px-4 py-2.5 font-mono text-gray-300">{k}</td>
                    <td className="px-4 py-2.5 text-white">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'Monitoring' && (
        <Card title="CloudWatch metrics" icon={<Activity size={14} />} showKebab={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INSTANCE_METRICS.map((m) => (
              <MetricChart key={m.title} title={m.title} pattern={m.pattern} />
            ))}
          </div>
        </Card>
      )}
      </div>
    </div>
  );
};

export default InstanceDetails;
