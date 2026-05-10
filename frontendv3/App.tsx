import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import InstanceDetails from './components/InstanceDetails';
import BucketDetails from './components/BucketDetails';
import DatabaseDetails from './components/DatabaseDetails';
import DnsDetails from './components/DnsDetails';
import IAMDetails from './components/IAMDetails';
import { useExperiences } from './hooks/useExperiences';
import { useProjects } from './hooks/useProjects';
import { Experience, Project } from './types';

type ActivePage = 'db' | 'dns' | 'iam' | null;

const SCROLL_TARGETS: Record<string, string> = {
  bucket: 'widget-buckets',
  cost: 'widget-cost',
};

const App: React.FC = () => {
  const [selectedInstance, setSelectedInstance] = useState<Experience | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activePage, setActivePage] = useState<ActivePage>(null);

  const { experiences, loading: experiencesLoading, error: experiencesError } = useExperiences();
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();

  const handleBack = () => {
    setSelectedInstance(null);
    setSelectedProject(null);
    setActivePage(null);
  };

  const handleNavigate = (serviceId: string) => {
    setSelectedInstance(null);
    setSelectedProject(null);
    if (serviceId === 'db' || serviceId === 'dns' || serviceId === 'iam') {
      setActivePage(serviceId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (serviceId === 'instance' && experiences.length > 0) {
      setActivePage(null);
      const targetId = 'widget-instances';
      requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }));
    } else {
      setActivePage(null);
      const targetId = SCROLL_TARGETS[serviceId];
      if (targetId) {
        requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }));
      }
    }
  };

  const activeServiceId: string | null = selectedInstance
    ? 'instance'
    : selectedProject
    ? 'bucket'
    : activePage === 'db'
    ? 'db'
    : activePage === 'dns'
    ? 'dns'
    : activePage === 'iam'
    ? 'iam'
    : null;

  const viewKey =
    activePage ?? selectedInstance?.id ?? selectedProject?.bucketName ?? 'dashboard';

  return (
    <Layout activeServiceId={activeServiceId} onServiceOpen={handleNavigate} onLogoClick={handleBack}>
      <div key={viewKey} className="animate-view-enter">
        {activePage === 'db' ? (
          <DatabaseDetails onBack={handleBack} />
        ) : activePage === 'dns' ? (
          <DnsDetails onBack={handleBack} />
        ) : activePage === 'iam' ? (
          <IAMDetails onBack={handleBack} />
        ) : selectedInstance ? (
          <InstanceDetails instance={selectedInstance} onBack={handleBack} />
        ) : selectedProject ? (
          <BucketDetails project={selectedProject} onBack={handleBack} />
        ) : (
          <Dashboard
            onViewInstance={(instance) => setSelectedInstance(instance)}
            onViewProject={(project) => setSelectedProject(project)}
            onNavigate={handleNavigate}
            experiences={experiences}
            experiencesLoading={experiencesLoading}
            experiencesError={experiencesError}
            projects={projects}
            projectsLoading={projectsLoading}
            projectsError={projectsError}
          />
        )}
      </div>
    </Layout>
  );
};

export default App;
