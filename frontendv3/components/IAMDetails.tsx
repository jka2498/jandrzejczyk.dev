import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  Copy,
  Shield,
  Users,
  Key,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import Card from './Card';
import { Breadcrumbs, TabBar, KeyValueGrid } from './ui/Layout';
import { PrimaryButton, SecondaryButton } from './ui/Buttons';
import { Badge, StatusDot } from './ui/Pills';
import { IAM_PROFILE } from '../constants';

interface IAMDetailsProps {
  onBack: () => void;
}

const IAMDetails: React.FC<IAMDetailsProps> = ({ onBack }) => {
  const [tab, setTab] = useState('Permissions');
  const iam = IAM_PROFILE;

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'IAM', onClick: onBack },
          { label: 'Users', onClick: onBack },
          { label: iam.userName },
        ]}
      />

      <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold border border-slate-600"
            style={{ background: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)' }}
          >
            JA
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">{iam.userName}</h1>
            <div className="text-gray-500 text-[12px] font-mono mt-0.5 break-all">{iam.userArn}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SecondaryButton onClick={onBack}><ArrowLeft size={11} />Back</SecondaryButton>
          <SecondaryButton><Copy size={11} />Copy ARN</SecondaryButton>
          <SecondaryButton>Actions <ChevronDown size={11} /></SecondaryButton>
          <PrimaryButton>Add permissions</PrimaryButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <Card title="Summary" icon={<Shield size={14} />} showKebab={false}>
            <p className="text-gray-300 text-[13px] leading-relaxed mb-4">{iam.summary}</p>
            <KeyValueGrid
              cols={2}
              items={[
                ['User ARN', <span className="font-mono break-all">{iam.userArn}</span>],
                ['Account ID', <span className="font-mono">{iam.accountId}</span>],
                ['Created', <span className="font-mono">{iam.created}</span>],
                ['Location', iam.location],
                ['Languages', iam.languages.join(' · ')],
                [
                  'MFA',
                  <span className="inline-flex items-center gap-1.5 text-gray-300">
                    <CheckCircle2 size={12} className="text-green-400" />
                    Enabled
                  </span>,
                ],
              ]}
            />
          </Card>
        </div>
        <Card
          title="Groups"
          icon={<Users size={14} />}
          showKebab={false}
          headerAction={<SecondaryButton>Add to group</SecondaryButton>}
        >
          <ul className="divide-y divide-slate-700/40 -my-1.5">
            {iam.groups.map((g) => (
              <li key={g.name} className="py-2 flex items-center justify-between text-[12px]">
                <div>
                  <span className="text-blue-400 hover:underline font-mono cursor-pointer">{g.name}</span>
                  <div className="text-gray-500 text-[11px] mt-0.5">Joined {g.joined}</div>
                </div>
                <span className="text-gray-400 font-mono tabular-nums">{g.members.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <TabBar tabs={['Permissions', 'Access keys', 'Tags']} active={tab} onChange={setTab} />

      <div key={tab} className="animate-tab-enter">
      {tab === 'Permissions' && (
        <Card
          title="Attached policies"
          icon={<Key size={14} />}
          showKebab={false}
          headerAction={
            <>
              <SecondaryButton><RefreshCw size={11} /></SecondaryButton>
              <PrimaryButton>Attach policy</PrimaryButton>
            </>
          }
        >
          <div className="-mx-4 -mb-4 overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-left text-gray-500 border-b border-slate-700/80 bg-slate-900/30">
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Policy name</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Type</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Attached</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Permissions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {iam.policies.map((p) => (
                  <tr key={p.name} className="hover:bg-slate-700/30 cursor-pointer group">
                    <td className="px-4 py-2.5">
                      <span className="font-mono text-blue-400 group-hover:underline">{p.name}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge tone={p.type === 'AWS managed' ? 'blue' : p.type === 'Inline' ? 'yellow' : 'gray'}>
                        {p.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-2.5 text-gray-300 font-mono">{p.attached}</td>
                    <td className="px-4 py-2.5">
                      <Badge tone={p.perms === 'Full' ? 'green' : p.perms === 'ReadWrite' ? 'yellow' : 'gray'}>
                        {p.perms}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'Access keys' && (
        <Card
          title="Access keys"
          icon={<Key size={14} />}
          showKebab={false}
          headerAction={<PrimaryButton>Create access key</PrimaryButton>}
        >
          <div className="-mx-4 -mb-4 overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-left text-gray-500 border-b border-slate-700/80 bg-slate-900/30">
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Access key ID</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Created</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Last used</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Status</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {iam.accessKeys.map((k) => (
                  <tr key={k.id} className="hover:bg-slate-700/30">
                    <td className="px-4 py-2.5 font-mono text-blue-400">{k.id}</td>
                    <td className="px-4 py-2.5 text-gray-300 font-mono">{k.created}</td>
                    <td className="px-4 py-2.5 text-gray-300">{k.lastUsed}</td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-1.5 text-gray-300">
                        <StatusDot state={k.status === 'Active' ? 'running' : 'stopped'} />
                        {k.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      {k.href && (
                        <a
                          href={k.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-cyan-400 inline-flex items-center"
                          title="Open"
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'Tags' && (
        <Card title="Tags" icon={<Key size={14} />} showKebab={false}>
          <div className="flex flex-wrap gap-2">
            {[
              ['Role', 'Cloud Engineer'],
              ['Status', 'Open to chat'],
              ['Tea', 'Strong, no sugar'],
              ['Location', 'London, UK'],
            ].map(([k, v]) => (
              <span key={k} className="text-[11px] bg-slate-900 border border-slate-700 rounded px-2 py-1">
                <span className="text-gray-500 mr-1.5">{k}:</span>
                <span className="text-white font-mono">{v}</span>
              </span>
            ))}
          </div>
        </Card>
      )}
      </div>
    </div>
  );
};

export default IAMDetails;
