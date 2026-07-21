import React from 'react';
import { Home, Droplet, Users, Radio, User, Award, Code } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  pendingSyncCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  pendingSyncCount,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'requests', label: 'Requests', icon: Droplet },
    { id: 'donors', label: 'Donors', icon: Users },
    { id: 'offline', label: 'Offline', icon: Radio, badge: pendingSyncCount > 0 ? pendingSyncCount : null },
    { id: 'certificate', label: 'Certificate', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg px-2 h-16 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all relative ${
              isActive
                ? 'text-[#af101a] font-bold scale-105'
                : 'text-gray-500 hover:text-gray-900 active:scale-95'
            }`}
          >
            <div className={`p-1 rounded-lg relative ${isActive ? 'bg-red-50' : ''}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              {item.badge !== null && item.badge !== undefined && (
                <span className="absolute -top-1 -right-1 bg-[#d32f2f] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] tracking-tight mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
