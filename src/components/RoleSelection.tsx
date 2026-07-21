import React from 'react';
import { UserRole } from '../types';
import { Droplet, User, Stethoscope, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  const roles = [
    {
      id: 'donor' as UserRole,
      title: 'Donor',
      description: 'Register, manage availability & save lives nearby',
      icon: Droplet,
      iconBg: 'bg-red-100 text-[#af101a]',
      hoverBorder: 'hover:border-[#af101a]',
    },
    {
      id: 'acceptor' as UserRole,
      title: 'Acceptor / Patient Family',
      description: 'Create urgent blood requests & match local donors',
      icon: User,
      iconBg: 'bg-blue-100 text-[#0061a4]',
      hoverBorder: 'hover:border-[#0061a4]',
    },
    {
      id: 'health_worker' as UserRole,
      title: 'Health Worker / Hospital Staff',
      description: 'Verify emergency requests, hospital units & donors',
      icon: Stethoscope,
      iconBg: 'bg-emerald-100 text-[#016619]',
      hoverBorder: 'hover:border-[#016619]',
    },
    {
      id: 'admin' as UserRole,
      title: 'Admin',
      description: 'System metrics, blood reserves & operational reports',
      icon: ShieldCheck,
      iconBg: 'bg-gray-200 text-gray-700',
      hoverBorder: 'hover:border-gray-600',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="max-w-2xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1c1c] tracking-tight mb-2">
          Continue as
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
          Select your primary role to customize your dashboard and features.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className={`group flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white border border-gray-200/80 ${role.hoverBorder} hover:bg-gray-50/80 transition-all duration-200 min-h-[160px] active:scale-[0.98] shadow-xs hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#af101a]`}
            >
              <div
                className={`w-14 h-14 rounded-full ${role.iconBg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-2xs`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <h2 className="font-bold text-lg text-[#1a1c1c] group-hover:text-[#af101a] transition-colors">
                {role.title}
              </h2>
              <p className="text-xs text-gray-500 mt-1 max-w-[200px] leading-relaxed">
                {role.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 text-center flex items-center justify-center gap-2 text-sm text-[#0061a4] font-medium">
        <CheckCircle2 className="w-4 h-4" />
        <span>Verified emergency blood coordination platform.</span>
      </div>
    </motion.div>
  );
};
