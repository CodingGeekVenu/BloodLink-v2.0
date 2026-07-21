import React from 'react';
import { DonorProfile, BloodRequest } from '../types';
import { Droplet, Calendar, AlertTriangle, Edit, History, Award, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface DonorHomeViewProps {
  donor: DonorProfile;
  activeRequestsCount: number;
  onToggleAvailability: (isAvailable: boolean) => void;
  onUpdateProfile: () => void;
  onViewRequests: () => void;
  onViewCertificate: () => void;
}

export const DonorHomeView: React.FC<DonorHomeViewProps> = ({
  donor,
  activeRequestsCount,
  onToggleAvailability,
  onUpdateProfile,
  onViewRequests,
  onViewCertificate,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-6 space-y-6"
    >
      {/* Welcome & Availability Toggle Card */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-5 rounded-2xl shadow-xs border border-gray-200/80 gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1a1c1c]">
            Welcome back, {donor.name}
          </h2>
          <p className="text-sm text-gray-600 mt-0.5">
            Manage your status and emergency availability.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-gray-100/80 px-4 py-2 rounded-xl w-fit border border-gray-200">
          <span className={`text-sm font-semibold ${donor.isAvailable ? 'text-emerald-700' : 'text-gray-600'}`}>
            {donor.isAvailable ? 'Available' : 'Not Available'}
          </span>
          <button
            onClick={() => onToggleAvailability(!donor.isAvailable)}
            aria-label="Toggle availability"
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              donor.isAvailable ? 'bg-[#016619]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                donor.isAvailable ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </section>

      {/* Grid: Blood Info & Emergency Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blood Info Card */}
        <section className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/80 relative overflow-hidden group">
          <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Droplet className="w-28 h-28 text-[#af101a] fill-current" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-full bg-red-100 text-[#af101a]">
                <Droplet className="w-5 h-5 fill-current" />
              </span>
              <h3 className="font-bold text-lg text-[#1a1c1c]">My Blood Group</h3>
            </div>
            <div className="text-5xl font-extrabold text-[#af101a] tracking-tight">
              {donor.bloodGroup}
            </div>
            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200/80 w-fit text-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>Last Donation: {donor.lastDonationDate}</span>
            </div>
          </div>
        </section>

        {/* Emergency Alerts Card */}
        <section className="bg-red-50/80 border-2 border-[#af101a] p-6 rounded-2xl shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#af101a] opacity-5 rounded-bl-full pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-[#af101a] animate-pulse" />
              <h3 className="font-bold text-lg text-[#af101a]">Emergency Alerts</h3>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-2xs flex items-center justify-between border border-red-200">
              <div>
                <p className="font-bold text-gray-900 text-sm">
                  {activeRequestsCount > 0
                    ? `${activeRequestsCount} Active Emergency Request${activeRequestsCount > 1 ? 's' : ''}`
                    : 'No Urgent Requests Nearby'}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {activeRequestsCount > 0
                    ? `${donor.bloodGroup} needed within 5km area`
                    : 'We will notify you when a match occurs'}
                </p>
              </div>
              {activeRequestsCount > 0 && (
                <button
                  onClick={onViewRequests}
                  className="bg-[#af101a] hover:bg-[#8b0c14] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all active:scale-95 shadow-2xs"
                >
                  View
                </button>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <button
          onClick={onUpdateProfile}
          className="border border-gray-300 text-[#af101a] font-bold text-sm px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-red-50 hover:border-[#af101a] transition-all active:scale-95 shadow-2xs"
        >
          <Edit className="w-4 h-4" />
          Update Profile
        </button>
        <button
          onClick={onViewRequests}
          className="text-gray-700 font-bold text-sm px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 transition-all active:scale-95 border border-gray-300"
        >
          <History className="w-4 h-4" />
          Donation Requests
        </button>
        <button
          onClick={onViewCertificate}
          className="bg-[#0061a4] text-white font-bold text-sm px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#00497d] transition-all active:scale-95 shadow-2xs"
        >
          <Award className="w-4 h-4" />
          View Certificate
        </button>
      </section>
    </motion.div>
  );
};
