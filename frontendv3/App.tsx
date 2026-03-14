import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import InstanceDetails from './components/InstanceDetails';
import BucketDetails from './components/BucketDetails';
import DatabaseDetails from './components/DatabaseDetails';
import DnsDetails from './components/DnsDetails';
import { useExperiences } from './hooks/useExperiences';
import { useProjects } from './hooks/useProjects';
import { Experience, Project } from './types';

type ActivePage = 'db' | 'dns' | null;

const SCROLL_TARGETS: Record<string, string> = {
  instance: 'widget-instances',
  bucket: 'widget-buckets',
  iam: 'widget-iam',
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
    if (serviceId === 'db' || serviceId === 'dns') {
      setActivePage(serviceId);
    } else {
      const targetId = SCROLL_TARGETS[serviceId];
      if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Layout>
      {activePage === 'db' ? (
        <DatabaseDetails onBack={handleBack} />
      ) : activePage === 'dns' ? (
        <DnsDetails onBack={handleBack} />
      ) : selectedInstance ? (
        <InstanceDetails
          instance={selectedInstance}
          onBack={handleBack}
        />
      ) : selectedProject ? (
        <BucketDetails
          project={selectedProject}
          onBack={handleBack}
        />
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
    </Layout>
  );
};

export default App;