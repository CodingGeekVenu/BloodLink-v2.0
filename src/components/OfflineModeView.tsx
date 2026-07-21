import React, { useState } from 'react';
import { WifiOff, Radio, Users, Database, CheckCircle2, RefreshCw, Square } from 'lucide-react';
import { motion } from 'motion/react';

interface OfflineModeViewProps {
  nearbyDonorsCount: number;
  pendingSyncCount: number;
  onRetrySync: () => void;
}

export const OfflineModeView: React.FC<OfflineModeViewProps> = ({
  nearbyDonorsCount,
  pendingSyncCount,
  onRetrySync,
}) => {
  const [isBroadcasting, setIsBroadcasting] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-4 py-6 space-y-6"
    >
      {/* Offline Banner */}
      <div className="bg-[#0061a4] text-white flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl shadow-xs">
        <WifiOff className="w-5 h-5 text-amber-300" />
        <span className="font-bold text-xs uppercase tracking-wider">
          No Internet – Offline Mode Active
        </span>
      </div>

      {/* BLE Radar Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden">
          {/* Radar Ripple Animation */}
          <div className="relative mb-2">
            {isBroadcasting && (
              <span className="absolute inset-0 rounded-full bg-blue-400 opacity-75 animate-ping" />
            )}
            <div className="h-16 w-16 bg-blue-100 text-[#0061a4] rounded-full flex items-center justify-center relative z-10 shadow-2xs">
              <Radio className={`w-8 h-8 ${isBroadcasting ? 'animate-pulse' : ''}`} />
            </div>
          </div>

          <h2 className="font-bold text-lg text-[#1a1c1c]">
            {isBroadcasting ? 'BLE Nearby Broadcast ON' : 'BLE Broadcast Paused'}
          </h2>
          <p className="text-xs text-gray-500 max-w-[220px]">
            {isBroadcasting
              ? 'Searching for local peer-to-peer Bluetooth connections.'
              : 'Turn on broadcast to enable offline peer emergency alerts.'}
          </p>
        </div>

        {/* Stats Stack */}
        <div className="flex flex-col gap-3 justify-center">
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex items-center gap-4 shadow-2xs">
            <div className="h-11 w-11 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center shrink-0 font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Nearby Donors
              </p>
              <p className="text-xl font-black text-[#1a1c1c]">{nearbyDonorsCount} Detected</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex items-center gap-4 shadow-2xs">
            <div className="h-11 w-11 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center shrink-0 font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Pending Cloud Sync
              </p>
              <p className="text-xl font-black text-[#1a1c1c]">{pendingSyncCount} Request</p>
            </div>
          </div>
        </div>
      </div>

      {/* Local Save Confirmation Card */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
        <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-sm text-gray-900">Request saved locally (Room DB)</h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Your blood request has been saved securely to your device's local database. It will
            automatically upload to BloodLink cloud when internet connectivity is restored.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
        <button
          onClick={() => setIsBroadcasting(!isBroadcasting)}
          className="h-12 px-6 rounded-full border-2 border-gray-300 text-gray-800 font-bold text-xs hover:bg-gray-100 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Square className="w-4 h-4 text-gray-600" />
          {isBroadcasting ? 'Stop Broadcast' : 'Resume Broadcast'}
        </button>

        <button
          onClick={onRetrySync}
          className="h-12 px-6 rounded-full bg-[#0061a4] text-white font-bold text-xs hover:bg-[#00497d] shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Retry Cloud Sync
        </button>
      </div>
    </motion.div>
  );
};
