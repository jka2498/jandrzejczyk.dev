import React from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
}

const widgetMapping = [
  { service: 'Identity & Access', description: 'Identity & profile' },
  { service: 'Instances', description: 'Work experience' },
  { service: 'Buckets', description: 'Projects' },
  { service: 'Cost & Usage', description: 'Skills & proficiency' },
  { service: 'Cloud Health', description: 'System status' },
  { service: 'DNS', description: 'Contact info' },
];

const InfoModal: React.FC<InfoModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-[#161e2d] border border-slate-700 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">About This Project</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6 text-sm">
          {/* What is this? */}
          <section>
            <h3 className="text-cyan-500 font-medium mb-2">What is this?</h3>
            <p className="text-gray-400 leading-relaxed">
              This is a developer portfolio disguised as a cloud management console. Every widget
              you see on the dashboard mirrors a real cloud service, but instead of managing
              infrastructure it presents professional experience, projects, and skills in a
              familiar ops-style interface.
            </p>
          </section>

          {/* Widget mapping */}
          <section>
            <h3 className="text-cyan-500 font-medium mb-2">Widget Mapping</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-slate-700">
                  <th className="pb-2 font-medium">Service</th>
                  <th className="pb-2 font-medium">Actually Shows</th>
                </tr>
              </thead>
              <tbody>
                {widgetMapping.map((row) => (
                  <tr key={row.service} className="border-b border-slate-700/50">
                    <td className="py-2 text-white">{row.service}</td>
                    <td className="py-2 text-gray-400">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Tech stack */}
          <section>
            <h3 className="text-cyan-500 font-medium mb-2">Tech Stack</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-white font-medium mb-1">Frontend</h4>
                <p className="text-gray-400">React 19, TypeScript, Tailwind CSS, Vite, Recharts</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Backend</h4>
                <p className="text-gray-400">AWS CDK, Java 21, Lambda, API Gateway, DynamoDB, S3</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
