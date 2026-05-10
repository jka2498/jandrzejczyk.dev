import React, { useState } from 'react';
import RecentServicesWidget from './widgets/RecentServicesWidget';
import EC2Widget from './widgets/InstancesWidget';
import S3Widget from './widgets/BucketWidget';
import CostExplorerWidget from './widgets/CostExplorerWidget';
import IAMWidget from './widgets/IAMWidget';
import HealthWidget from './widgets/HealthWidget';
import InfoModal from './InfoModal';
import { PrimaryButton, SecondaryButton, AdminPill } from './ui/Buttons';
import { RefreshCw } from 'lucide-react';
import { Experience, Project } from '../types';

interface DashboardProps {
  onViewInstance: (instance: Experience) => void;
  onViewProject: (project: Project) => void;
  onNavigate?: (serviceId: string) => void;
  experiences: Experience[];
  experiencesLoading: boolean;
  experiencesError: string | null;
  projects: Project[];
  projectsLoading: boolean;
  projectsError: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({
  onViewInstance,
  onViewProject,
  onNavigate,
  experiences,
  experiencesLoading,
  experiencesError,
  projects,
  projectsLoading,
  projectsError,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="pb-8">
      <InfoModal open={showInfo} onClose={() => setShowInfo(false)} />

      <div className="pt-2 pb-3 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.12em] text-gray-500 mb-1.5 font-semibold">
            Console Home
          </div>
          <h1 className="text-white text-[22px] font-bold tracking-tight flex items-center gap-2.5">
            Welcome, jan.andrzejczyk <AdminPill />
            <button
              onClick={() => setShowInfo(true)}
              className="text-[10px] font-normal text-cyan-400 border border-slate-700 rounded px-1.5 py-0.5 cursor-pointer hover:bg-slate-800 hover:text-cyan-300"
            >
              Info
            </button>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <SecondaryButton><RefreshCw size={11} />Reset</SecondaryButton>
          <PrimaryButton>+ Add widgets</PrimaryButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <div className="flex flex-col gap-4">
          <div id="widget-iam"><IAMWidget onOpenDetails={() => onNavigate?.('iam')} /></div>
          <HealthWidget />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <RecentServicesWidget onNavigate={onNavigate} />
          <div id="widget-instances">
            <EC2Widget
              onRowClick={onViewInstance}
              experiences={experiences}
              loading={experiencesLoading}
              error={experiencesError}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div id="widget-buckets">
              <S3Widget
                onProjectClick={onViewProject}
                projects={projects}
                loading={projectsLoading}
                error={projectsError}
              />
            </div>
            <div id="widget-cost"><CostExplorerWidget /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
