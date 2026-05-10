import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Copy,
  ExternalLink,
  HardDrive,
  Folder,
  FileText,
  FileJson,
  FileCode,
  FileImage,
  Download,
  RefreshCw,
  ChevronDown,
  Github,
  Key,
} from 'lucide-react';
import Card from './Card';
import { Breadcrumbs, TabBar, KeyValueGrid } from './ui/Layout';
import { PrimaryButton, SecondaryButton } from './ui/Buttons';
import { Badge } from './ui/Pills';
import { Project } from '../types';

interface BucketDetailsProps {
  project: Project;
  onBack: () => void;
}

const fileIcon = (type: string) => {
  switch (type) {
    case 'folder':
      return <Folder size={14} className="text-orange-400" />;
    case 'json':
      return <FileJson size={14} className="text-gray-400" />;
    case 'yaml':
    case 'yml':
      return <FileCode size={14} className="text-gray-400" />;
    case 'png':
    case 'jpg':
      return <FileImage size={14} className="text-purple-400" />;
    default:
      return <FileText size={14} className="text-gray-400" />;
  }
};

const BucketDetails: React.FC<BucketDetailsProps> = ({ project, onBack }) => {
  const [tab, setTab] = useState('Objects');

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Object Storage', onClick: onBack },
          { label: 'Buckets', onClick: onBack },
          { label: project.bucketName },
        ]}
      />

      <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-white text-xl font-bold font-mono truncate">{project.bucketName}</h1>
            <Badge tone={project.access === 'Public' ? 'red' : 'green'}>{project.access}</Badge>
          </div>
          <div className="text-gray-500 text-[12px] font-mono break-all">{project.arn}</div>
        </div>
        <div className="flex items-center gap-2">
          <SecondaryButton onClick={onBack}><ArrowLeft size={11} />Back</SecondaryButton>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <SecondaryButton><Github size={11} />Open repo<ExternalLink size={10} /></SecondaryButton>
            </a>
          )}
          <SecondaryButton><Copy size={11} />Copy URI</SecondaryButton>
          <SecondaryButton>Actions <ChevronDown size={11} /></SecondaryButton>
          <PrimaryButton>Upload</PrimaryButton>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {[
          ['Region', project.region],
          ['Size', project.size],
          ['Last modified', project.lastModified],
          ['Created', project.creationDate],
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

      <TabBar tabs={['Objects', 'Properties', 'Tags']} active={tab} onChange={setTab} />

      <div key={tab} className="animate-tab-enter">
      {tab === 'Objects' && (
        <Card
          title="Objects"
          icon={<HardDrive size={14} />}
          showKebab={false}
          headerAction={
            <>
              <SecondaryButton><RefreshCw size={11} /></SecondaryButton>
              <SecondaryButton><Download size={11} />Download</SecondaryButton>
              <PrimaryButton>Upload</PrimaryButton>
            </>
          }
        >
          <div className="flex gap-3 mb-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Find objects by prefix"
                className="w-full bg-[#0f1117] border border-slate-700 rounded px-3 py-1.5 pl-8 text-[12px] text-gray-300 focus:border-orange-500 focus:outline-none placeholder-gray-500"
              />
              <Search className="absolute left-2.5 top-2 text-gray-500" size={13} />
            </div>
          </div>
          <div className="-mx-4 -mb-4 overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-left text-gray-500 border-b border-slate-700/80 bg-slate-900/30">
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Name</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Type</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Last modified</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px] text-right">Size</th>
                  <th className="px-4 py-2 font-semibold uppercase tracking-wide text-[10px]">Storage class</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {project.objects.map((obj, idx) => (
                  <tr key={idx} className="hover:bg-slate-700/30 group cursor-pointer">
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-2">
                        {fileIcon(obj.type)}
                        <span className="font-mono text-blue-400 group-hover:underline">{obj.name}</span>
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-400 font-mono">{obj.type}</td>
                    <td className="px-4 py-2.5 text-gray-300 font-mono">{obj.lastModified}</td>
                    <td className="px-4 py-2.5 text-right text-gray-300 font-mono">{obj.size}</td>
                    <td className="px-4 py-2.5">
                      <Badge tone={obj.storageClass === 'GLACIER' ? 'blue' : 'gray'} mono>
                        {obj.storageClass}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'Properties' && (
        <Card title="Bucket properties" icon={<HardDrive size={14} />} showKebab={false}>
          <p className="text-[13px] text-gray-300 leading-relaxed mb-4">{project.description}</p>
          <KeyValueGrid
            cols={2}
            items={[
              ['Bucket name', <span className="font-mono">{project.bucketName}</span>],
              ['Region', <span className="font-mono">{project.region}</span>],
              ['Resource Name', <span className="font-mono break-all">{project.arn}</span>],
              ['Creation date', <span className="font-mono">{project.creationDate}</span>],
              ['Last modified', <span className="font-mono">{project.lastModified}</span>],
              ['Total size', <span className="font-mono">{project.size}</span>],
              ['Access', <Badge tone={project.access === 'Public' ? 'red' : 'green'}>{project.access}</Badge>],
              ['Status', <Badge tone="green">{project.tags.Status || 'Active'}</Badge>],
            ]}
          />
        </Card>
      )}

      {tab === 'Tags' && (
        <Card
          title="Tags"
          icon={<Key size={14} />}
          showKebab={false}
          headerAction={<SecondaryButton>Manage tags</SecondaryButton>}
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
                {Object.entries(project.tags).map(([k, v]) => (
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
      </div>
    </div>
  );
};

export default BucketDetails;
