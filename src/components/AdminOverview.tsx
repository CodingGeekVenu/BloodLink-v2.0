import React, { useState } from 'react';
import { SystemAlert } from '../types';
import { Users, CheckCircle2, Droplet, CheckCheck, Download, MessageSquare, AlertTriangle, RefreshCw, X } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminOverviewProps {
  alerts: SystemAlert[];
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ alerts }) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [reportExported, setReportExported] = useState(false);

  const handleExport = () => {
    setReportExported(true);
    setTimeout(() => setReportExported(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-6 space-y-6"
    >
      <section>
        <h1 className="text-2xl font-bold text-[#1a1c1c]">Admin Overview</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          District-wide system health, metrics & emergency stock levels.
        </p>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-2 gap-4">
        {/* Total Donors */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs flex flex-col justify-between aspect-square sm:aspect-auto sm:min-h-[140px]">
          <div className="p-2.5 rounded-xl bg-blue-100 text-[#0061a4] w-fit">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500">Total Donors</p>
            <p className="text-2xl font-black text-[#1a1c1c] mt-0.5">1,240</p>
          </div>
        </div>

        {/* Active Donors */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs flex flex-col justify-between aspect-square sm:aspect-auto sm:min-h-[140px]">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-[#016619] w-fit">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500">Active Donors</p>
            <p className="text-2xl font-black text-[#1a1c1c] mt-0.5">850</p>
          </div>
        </div>

        {/* Requests This Month */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs flex flex-col justify-between aspect-square sm:aspect-auto sm:min-h-[140px]">
          <div className="p-2.5 rounded-xl bg-red-100 text-[#af101a] w-fit">
            <Droplet className="w-5 h-5 fill-current" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500">Requests This Month</p>
            <p className="text-2xl font-black text-[#1a1c1c] mt-0.5">42</p>
          </div>
        </div>

        {/* Fulfilled */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs flex flex-col justify-between aspect-square sm:aspect-auto sm:min-h-[140px]">
          <div className="p-2.5 rounded-xl bg-gray-100 text-gray-700 w-fit">
            <CheckCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500">Fulfilled</p>
            <p className="text-2xl font-black text-[#1a1c1c] mt-0.5">38</p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleExport}
          className="bg-[#af101a] hover:bg-[#8b0c14] text-white font-bold text-xs h-12 rounded-full flex items-center justify-center gap-2 flex-1 shadow-md transition-all active:scale-95"
        >
          <Download className="w-4 h-4" />
          {reportExported ? 'Report Downloaded (CSV)' : 'Export Monthly Report'}
        </button>

        <button
          onClick={() => setShowFeedbackModal(true)}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300 font-bold text-xs h-12 rounded-full flex items-center justify-center gap-2 flex-1 transition-all active:scale-95"
        >
          <MessageSquare className="w-4 h-4" />
          View Field Feedback
        </button>
      </section>

      {/* Recent System Alerts */}
      <section className="space-y-3">
        <h3 className="font-bold text-base text-[#1a1c1c]">Recent System Alerts</h3>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-2xl border flex items-start gap-3 shadow-2xs ${
                alert.type === 'warning'
                  ? 'bg-red-50 text-red-900 border-red-200'
                  : 'bg-blue-50 text-blue-900 border-blue-200'
              }`}
            >
              {alert.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              ) : (
                <RefreshCw className="w-5 h-5 text-[#0061a4] shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <p className="font-bold text-sm">{alert.title}</p>
                <p className="mt-1 leading-relaxed opacity-90">{alert.description}</p>
                <p className="mt-2 text-[10px] font-bold opacity-60">{alert.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg text-gray-900">Health Worker Field Feedback</h3>
              <button onClick={() => setShowFeedbackModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700 max-h-60 overflow-y-auto">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <p className="font-bold text-gray-900">Dr. Sharma (Kurnool Hub)</p>
                <p className="mt-1">"BLE broadcast saved 2 critical emergency cases during last week's cellular tower outage."</p>
                <span className="text-[10px] text-gray-400 mt-1 block">Yesterday at 16:20</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <p className="font-bold text-gray-900">Nurse Anitha (Block C)</p>
                <p className="mt-1">"Verification badges increase patient trust immensely. All 124 donors verified."</p>
                <span className="text-[10px] text-gray-400 mt-1 block">3 days ago</span>
              </div>
            </div>

            <button
              onClick={() => setShowFeedbackModal(false)}
              className="w-full h-10 bg-[#af101a] text-white font-bold rounded-xl text-xs"
            >
              Close Feedback
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
