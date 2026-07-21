import React from 'react';
import { UserRole } from '../types';
import { X, History, Settings, HelpCircle, ShieldCheck, HeartPulse, Code, UserCheck, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenKotlinCode: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
  onOpenKotlinCode,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
          />

          {/* Slide-out Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-2xl flex flex-col justify-between p-5"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-6 h-6 text-[#af101a]" />
                  <span className="font-black text-xl text-[#af101a] tracking-tight uppercase">
                    BloodLink
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Profile Card */}
              <div className="bg-red-50/60 p-4 rounded-2xl border border-red-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#af101a] text-white flex items-center justify-center font-bold text-lg shadow-2xs">
                  {currentRole === 'health_worker' ? 'DS' : currentRole === 'donor' ? 'RK' : 'AD'}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-gray-900 text-sm">
                    {currentRole === 'health_worker'
                      ? 'Dr. Sharma (HW)'
                      : currentRole === 'donor'
                      ? 'Rajesh Kumar (Donor)'
                      : 'Admin Coordinator'}
                  </div>
                  <div className="text-gray-500">ID: BL-4902</div>
                  <div className="text-[#016619] font-bold flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Station
                  </div>
                </div>
              </div>

              {/* Role Switcher Menu */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-gray-400 px-2 tracking-wider">
                  Switch Active Role
                </p>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {(['donor', 'acceptor', 'health_worker', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        onSelectRole(r);
                        onClose();
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold capitalize text-left transition-all ${
                        currentRole === r
                          ? 'bg-[#af101a] text-white shadow-2xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {r.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Items */}
              <div className="space-y-1 pt-2 border-t">
                <button
                  onClick={() => {
                    onOpenKotlinCode();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-800 hover:bg-red-50 hover:text-[#af101a] transition-all"
                >
                  <Code className="w-4 h-4 text-[#af101a]" />
                  <span>Kotlin Android Source Code</span>
                </button>

                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100">
                  <History className="w-4 h-4 text-gray-500" />
                  <span>Donation History</span>
                </button>

                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100">
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span>Settings & Preferences</span>
                </button>

                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100">
                  <HelpCircle className="w-4 h-4 text-gray-500" />
                  <span>Emergency Help Center</span>
                </button>
              </div>
            </div>

            <div className="text-center text-[11px] text-gray-400 pt-4 border-t">
              BloodLink Android v2.4.0 • Offline BLE Enabled
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
