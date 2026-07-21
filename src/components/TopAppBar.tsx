import React from 'react';
import { UserRole } from '../types';
import { Menu, Wifi, WifiOff, Code, Smartphone, ShieldCheck } from 'lucide-react';

interface TopAppBarProps {
  currentRole: UserRole;
  isOffline: boolean;
  onToggleOffline: () => void;
  viewMode: 'app' | 'kotlin_code';
  onToggleViewMode: (mode: 'app' | 'kotlin_code') => void;
  onOpenDrawer: () => void;
  onSelectRole: (role: UserRole) => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentRole,
  isOffline,
  onToggleOffline,
  viewMode,
  onToggleViewMode,
  onOpenDrawer,
  onSelectRole,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#f9f9f9] border-b border-gray-200/80 px-4 h-14 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenDrawer}
          aria-label="Open Navigation Menu"
          className="p-2 rounded-full text-gray-700 hover:bg-gray-200/60 active:scale-95 transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          onClick={() => onSelectRole('select')}
          className="flex items-center gap-1 text-left group"
        >
          <span className="font-extrabold text-xl tracking-tight text-[#af101a] uppercase">
            BloodLink
          </span>
          {currentRole !== 'select' && (
            <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-[#af101a] capitalize ml-1 border border-red-200">
              {currentRole.replace('_', ' ')}
            </span>
          )}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {/* Offline / Online Toggle Simulator */}
        <button
          onClick={onToggleOffline}
          title={isOffline ? 'Offline Mode Active - Click to connect' : 'Online Mode Active - Click to test offline'}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-2xs ${
            isOffline
              ? 'bg-amber-100 text-amber-800 border border-amber-300'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          }`}
        >
          {isOffline ? (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden xs:inline">Offline Mode</span>
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden xs:inline">Online</span>
            </>
          )}
        </button>

        {/* Mode Switcher: App UI vs Kotlin Android Source Code */}
        <div className="flex bg-gray-200/80 p-0.5 rounded-lg border border-gray-300/60">
          <button
            onClick={() => onToggleViewMode('app')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              viewMode === 'app'
                ? 'bg-white text-gray-900 shadow-2xs font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-[#af101a]" />
            <span className="hidden sm:inline">Live App</span>
          </button>
          <button
            onClick={() => onToggleViewMode('kotlin_code')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              viewMode === 'kotlin_code'
                ? 'bg-[#af101a] text-white shadow-2xs font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kotlin Code</span>
          </button>
        </div>
      </div>
    </header>
  );
};
