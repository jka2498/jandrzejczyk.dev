import React from 'react';
import Navbar from './Navbar';
import ServiceRail from './ServiceRail';
import { RECENT_SERVICES } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeServiceId: string | null;
  onServiceOpen: (id: string) => void;
  onLogoClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeServiceId, onServiceOpen, onLogoClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen text-gray-300 font-sans">
      <Navbar onLogoClick={onLogoClick} />
      <div className="pt-[52px] flex">
        <ServiceRail
          services={RECENT_SERVICES}
          active={activeServiceId}
          onOpen={onServiceOpen}
        />
        <main className="flex-1 min-w-0 overflow-y-auto min-h-[calc(100vh-52px)]">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4">{children}</div>

          <footer className="mt-12 border-t border-slate-800 pt-4 pb-8 px-6 text-[11px] text-gray-500 flex flex-wrap gap-6 max-w-[1600px] mx-auto">
            <a href="#" className="hover:underline hover:text-orange-400">Feedback</a>
            <a href="#" className="hover:underline hover:text-orange-400">Support</a>
            <a href="#" className="hover:underline hover:text-orange-400">Privacy</a>
            <a href="#" className="hover:underline hover:text-orange-400">Terms</a>
            <a href="#" className="hover:underline hover:text-orange-400">Cookie Preferences</a>
            <span className="ml-auto">&copy; {currentYear}, jandrzejczyk.dev or its affiliates. All rights reserved.</span>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Layout;
