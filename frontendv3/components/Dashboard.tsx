import React, { useState } from 'react';
import RecentServicesWidget from './widgets/RecentServicesWidget';
import EC2Widget from './widgets/InstancesWidget';
import S3Widget from './widgets/BucketWidget';
import CostExplorerWidget from './widgets/CostExplorerWidget';
import IAMWidget from './widgets/IAMWidget';
import HealthWidget from './widgets/HealthWidget';
import { Experience, Project } from '../types';
import InfoModal from './InfoModal';

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

const Dashboard: React.FC<DashboardProps> = ({ onViewInstance, onViewProject, onNavigate, experiences, experiencesLoading, experiencesError, projects, projectsLoading, projectsError }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="pb-8">
      <InfoModal open={showInfo} onClose={() => setShowInfo(false)} />
      <h1 className="text-2xl font-bold text-white mb-6 px-1 flex items-center gap-2">
        Console Home <span onClick={() => setShowInfo(true)} className="text-xs font-normal text-cyan-500 border border-slate-600 rounded px-1.5 py-0.5 cursor-pointer hover:bg-slate-800">Info</span>
      </h1>

      {/* Main Grid Layout - Split into Personal (Left) and Work/Tech (Right) columns for better vertical stacking without gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Identity & Status (1/3 width) */}
        <div className="flex flex-col gap-6">
           <div id="widget-iam"><IAMWidget /></div>
           <HealthWidget />
        </div>

        {/* Right Column: Work, Projects, Tools (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <RecentServicesWidget onNavigate={onNavigate} />
           <div id="widget-instances"><EC2Widget onRowClick={onViewInstance} experiences={experiences} loading={experiencesLoading} error={experiencesError} /></div>

           {/* Nested Grid for Projects and Skills */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div id="widget-buckets"><S3Widget onProjectClick={onViewProject} projects={projects} loading={projectsLoading} error={projectsError} /></div>
               <div id="widget-cost"><CostExplorerWidget /></div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;