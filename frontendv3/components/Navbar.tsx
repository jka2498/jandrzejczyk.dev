import React, { useState } from 'react';
import { Search, Bell, Settings, HelpCircle, Linkedin, ChevronDown } from 'lucide-react';
import InfoModal from './InfoModal';
import { GhostIconButton } from './ui/Buttons';

interface NavbarProps {
  onLogoClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogoClick }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <nav
      className="text-white px-4 flex justify-between items-center h-[52px] fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'linear-gradient(to bottom, #161e2d, #0f1623)',
        borderBottom: '1px solid rgba(249,115,22,0.4)',
        boxShadow: '0 1px 0 0 rgba(249,115,22,0.15), 0 1px 8px 0 rgba(0,0,0,0.5)',
      }}
    >
      <div className="flex items-center gap-5 min-w-0">
        <div
          className="flex items-center gap-2 cursor-pointer group shrink-0"
          onClick={onLogoClick}
          role="button"
          aria-label="Console home"
        >
          <img src="/favicon.svg" alt="Cloud logo" className="w-[28px] h-[28px]" />
          <span className="font-bold tracking-tight text-[14px] hidden sm:inline">jandrzejczyk.dev</span>
        </div>

        <button className="text-[12px] text-gray-300 hover:text-white cursor-pointer hidden lg:flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800/60">
          Services <ChevronDown size={11} />
        </button>

        <div className="hidden md:flex items-center bg-slate-950/50 border border-slate-700/60 rounded-[3px] px-2.5 py-1.5 w-[260px] lg:w-[420px] focus-within:border-orange-500/60 focus-within:bg-slate-950 transition-colors">
          <Search size={13} className="text-gray-500" />
          <input
            className="bg-transparent text-[12px] ml-2 outline-none flex-1 text-white placeholder-gray-500"
            placeholder="Search for services, features, blogs, docs, and more"
          />
          <kbd className="text-[10px] text-gray-500 border border-slate-700 px-1.5 rounded font-mono">⌥S</kbd>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <a
          href="https://www.linkedin.com/in/jan-andrzejczyk-61ba6012a/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white p-1 rounded hover:bg-slate-700 transition-colors"
          title="Connect on LinkedIn"
        >
          <Linkedin size={15} />
        </a>
        <GhostIconButton><Bell size={15} /></GhostIconButton>
        <GhostIconButton onClick={() => setShowInfo(true)}><HelpCircle size={15} /></GhostIconButton>
        <GhostIconButton><Settings size={15} /></GhostIconButton>

        <div className="h-5 w-px bg-slate-700/80 mx-2 hidden sm:block" />

        <button className="text-[12px] text-gray-300 hover:text-white cursor-pointer hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-slate-800/60 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-running" />
          <span className="font-mono">eu-west-2</span>
          <ChevronDown size={11} />
        </button>

        <button className="ml-1 flex items-center gap-2 pl-1 pr-2 py-1 rounded hover:bg-slate-800/60 cursor-pointer whitespace-nowrap">
          <div className="hidden lg:flex flex-col items-end leading-tight">
            <span className="font-semibold text-white text-[11px]">jan.andrzejczyk</span>
            <span className="text-[10px] text-gray-500 font-mono">1024-7593-0512</span>
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)' }}
          >
            JA
          </div>
        </button>
      </div>
      <InfoModal open={showInfo} onClose={() => setShowInfo(false)} />
    </nav>
  );
};

export default Navbar;
