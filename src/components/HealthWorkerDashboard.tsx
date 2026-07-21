import React from 'react';
import { BloodRequest, ActivityItem } from '../types';
import { Droplet, Users, ShieldCheck, Radio, Plus, CheckCircle2, UserPlus, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface HealthWorkerDashboardProps {
  activeRequests: BloodRequest[];
  verifiedDonorsCount: number;
  pendingVerificationsCount: number;
  activities: ActivityItem[];
  onCreateNewRequest: () => void;
  onViewRequestDetails: (req: BloodRequest) => void;
}

export const HealthWorkerDashboard: React.FC<HealthWorkerDashboardProps> = ({
  activeRequests,
  verifiedDonorsCount,
  pendingVerificationsCount,
  activities,
  onCreateNewRequest,
  onViewRequestDetails,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-4 py-6 space-y-6"
    >
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a1c1c]">
          Welcome, Dr. Sharma
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Kurnool District Health Hub & Emergency Command
        </p>
      </div>

      {/* Offline Sync Banner */}
      <div className="bg-blue-50 border border-blue-200 text-[#00355c] p-4 rounded-2xl flex items-start gap-3 shadow-2xs">
        <Radio className="w-5 h-5 text-[#0061a4] shrink-0 mt-0.5 animate-pulse" />
        <div className="text-xs leading-relaxed">
          <span className="font-bold block text-sm">Offline Mode Active</span>
          Data is being saved locally in Room DB. 1 item pending sync. It will automatically upload when connectivity is restored.
        </div>
      </div>

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Primary Active Requests Card */}
        <div
          onClick={() => activeRequests.length > 0 && onViewRequestDetails(activeRequests[0])}
          className="bg-[#d32f2f] text-white rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all active:scale-[0.98] col-span-1 md:col-span-2 row-span-2 flex flex-col justify-between min-h-[220px]"
        >
          <div className="absolute top-0 right-0 -mr-6 -mt-6 opacity-15 group-hover:scale-110 transition-transform duration-500">
            <Droplet className="w-48 h-48 fill-current text-white" />
          </div>

          <div className="relative z-10 flex justify-between items-start">
            <Droplet className="w-8 h-8 fill-current text-white" />
            <div className="bg-white text-[#d32f2f] px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              Urgent Priority
            </div>
          </div>

          <div className="relative z-10 mt-6">
            <div className="text-4xl sm:text-5xl font-black">{activeRequests.length}</div>
            <div className="font-bold text-lg mt-1">Active Emergency Requests</div>
            <p className="text-xs text-red-100 mt-1 opacity-90 max-w-[85%]">
              O- and B+ required immediately at District Main Hospital. Click to manage tracking timeline.
            </p>
          </div>
        </div>

        {/* Verified Donors */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-center items-center text-center shadow-2xs">
          <Users className="w-8 h-8 text-[#016619] mb-2" />
          <div className="text-2xl font-black text-[#1a1c1c]">{verifiedDonorsCount}</div>
          <div className="text-xs font-bold text-gray-500 mt-1">Verified Local Donors</div>
        </div>

        {/* Pending Verifications */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-center items-center text-center shadow-2xs">
          <ShieldCheck className="w-8 h-8 text-[#0061a4] mb-2" />
          <div className="text-2xl font-black text-[#1a1c1c]">{pendingVerificationsCount}</div>
          <div className="text-xs font-bold text-gray-500 mt-1">Pending Verifications</div>
        </div>

        {/* Offline Sync */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex items-center justify-center text-center col-span-1 md:col-span-2 shadow-2xs">
          <div className="flex items-center gap-4 text-left">
            <Radio className="w-8 h-8 text-[#0061a4]" />
            <div>
              <div className="font-bold text-sm text-[#1a1c1c]">Offline BLE Peer Sync</div>
              <div className="text-xs text-gray-500 mt-0.5">
                Waiting for cloud connection... 3 nearby donors detected over BLE.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Requests List */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1a1c1c] flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#af101a]" />
            Active Emergency Pipeline
          </h2>
          <button
            onClick={onCreateNewRequest}
            className="text-xs font-bold text-[#af101a] hover:underline"
          >
            + Create Request
          </button>
        </div>

        <div className="space-y-3">
          {activeRequests.map((req) => (
            <div
              key={req.id}
              onClick={() => onViewRequestDetails(req)}
              className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-red-100 text-[#af101a] font-black text-lg flex items-center justify-center shrink-0">
                  {req.bloodGroup}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">
                      #{req.id} - {req.patientName}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 uppercase">
                      {req.urgency}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {req.hospitalName} • {req.unitsRequired} Unit(s) needed
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-[#0061a4] group-hover:translate-x-1 transition-transform">
                <span>View Timeline</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#1a1c1c]">Recent Activity Log</h2>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xs">
          <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex justify-between items-center text-xs font-bold text-gray-700">
            <span>Completed Cases Today: 45</span>
            <span className="text-[#0061a4]">Audit Log</span>
          </div>

          <div className="divide-y divide-gray-100">
            {activities.map((act) => (
              <div key={act.id} className="p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors">
                <div className="p-2 rounded-full bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                  {act.type === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <UserPlus className="w-4 h-4 text-[#0061a4]" />
                  )}
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-900 text-sm">{act.title}</span>
                    <span className="text-gray-400">{act.timeAgo}</span>
                  </div>
                  <p className="text-gray-600 mt-0.5">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <button
        onClick={onCreateNewRequest}
        aria-label="New Emergency Request"
        className="fixed bottom-20 right-6 md:bottom-8 md:right-8 bg-[#af101a] hover:bg-[#8b0c14] text-white w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-transform active:scale-90 z-30"
      >
        <Plus className="w-7 h-7 stroke-[2.5]" />
      </button>
    </motion.div>
  );
};
