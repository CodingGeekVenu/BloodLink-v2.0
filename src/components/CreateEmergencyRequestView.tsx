import React, { useState } from 'react';
import { BloodGroup, UrgencyLevel, BloodRequest } from '../types';
import { Building2, MapPin, Clock, ShieldCheck, Radar, Radio, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface CreateEmergencyRequestViewProps {
  onCreateRequest: (
    request: Omit<BloodRequest, 'id' | 'status' | 'createdAt'>,
    broadcastOffline: boolean
  ) => void;
}

export const CreateEmergencyRequestView: React.FC<CreateEmergencyRequestViewProps> = ({
  onCreateRequest,
}) => {
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>('O+');
  const [unitsRequired, setUnitsRequired] = useState<number>(2);
  const [urgency, setUrgency] = useState<UrgencyLevel>('critical');
  const [hospitalName, setHospitalName] = useState('');
  const [locationWard, setLocationWard] = useState('');
  const [requiredByTime, setRequiredByTime] = useState('14:00');
  const [doctorHwVerified, setDoctorHwVerified] = useState(false);
  const [hwId, setHwId] = useState('');

  const handleSubmit = (broadcastOffline: boolean) => {
    if (!bloodGroup || !hospitalName || !locationWard) return;

    onCreateRequest(
      {
        patientName: patientName || 'Emergency Patient',
        bloodGroup: bloodGroup as BloodGroup,
        unitsRequired: Number(unitsRequired) || 1,
        urgency,
        hospitalName,
        locationWard,
        requiredByTime,
        doctorHwVerified,
        hwId: doctorHwVerified ? hwId || 'BL-HW-AUTO' : undefined,
      },
      broadcastOffline
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto px-4 py-6 space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-[#1a1c1c]">Create Emergency Request</h1>
        <p className="text-sm text-gray-600 mt-1">
          Quickly broadcast a need for blood to nearby donors and stations.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(false);
        }}
        className="space-y-5 bg-white p-6 rounded-2xl border border-gray-200/90 shadow-xs"
      >
        {/* Patient Name */}
        <div>
          <label className="block text-sm font-semibold text-[#1a1c1c] mb-1">
            Patient Name (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Ramesh Verma"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#af101a] focus:bg-white outline-none"
          />
        </div>

        {/* Blood Group & Units */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1a1c1c] mb-1">
              Patient Blood Group *
            </label>
            <select
              required
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-bold text-sm text-[#af101a] focus:ring-2 focus:ring-[#af101a] focus:bg-white outline-none cursor-pointer"
            >
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1a1c1c] mb-1">
              Units Required *
            </label>
            <input
              type="number"
              min={1}
              max={20}
              required
              value={unitsRequired}
              onChange={(e) => setUnitsRequired(Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-bold text-sm text-gray-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* Urgency Level Segmented Button */}
        <div>
          <label className="block text-sm font-semibold text-[#1a1c1c] mb-2">
            Urgency Level *
          </label>
          <div className="grid grid-cols-3 rounded-xl border border-gray-300 overflow-hidden p-1 bg-gray-100 gap-1">
            <button
              type="button"
              onClick={() => setUrgency('critical')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                urgency === 'critical'
                  ? 'bg-[#d32f2f] text-white shadow-2xs'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Critical
            </button>
            <button
              type="button"
              onClick={() => setUrgency('high')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                urgency === 'high'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              High
            </button>
            <button
              type="button"
              onClick={() => setUrgency('normal')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                urgency === 'normal'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Normal
            </button>
          </div>
        </div>

        {/* Hospital & Location */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1a1c1c] mb-1">
              Hospital / Clinic Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Building2 className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                placeholder="e.g. Kurnool District Government Hospital"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#af101a] focus:bg-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1a1c1c] mb-1">
              Location / Ward *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                placeholder="e.g. Ward 4, Bed 12 / ICU Block B"
                value={locationWard}
                onChange={(e) => setLocationWard(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#af101a] focus:bg-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Required By Time */}
        <div>
          <label className="block text-sm font-semibold text-[#1a1c1c] mb-1">
            Required By (Time) *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Clock className="w-5 h-5" />
            </div>
            <input
              type="time"
              required
              value={requiredByTime}
              onChange={(e) => setRequiredByTime(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#af101a] focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* Health Worker Verification Container */}
        <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#016619]">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-bold text-sm">Doctor / Health Worker Verification</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={doctorHwVerified}
                onChange={(e) => setDoctorHwVerified(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#016619]" />
            </label>
          </div>

          {doctorHwVerified && (
            <div className="pt-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Health Worker ID / Doctor Reg No.
              </label>
              <input
                type="text"
                placeholder="e.g. BL-4902 / AP-MC-8812"
                value={hwId}
                onChange={(e) => setHwId(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#016619] outline-none"
              />
              <p className="text-[11px] text-emerald-800 mt-1">
                Verified requests receive top broadcast priority across district networks.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 pt-2">
          <button
            type="submit"
            className="w-full h-13 bg-[#af101a] hover:bg-[#8b0c14] text-white font-bold text-sm rounded-full uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <Radar className="w-5 h-5 animate-pulse" />
            Find Matching Donors
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(true)}
            className="w-full h-13 bg-[#33a0fd] text-[#00355c] hover:bg-[#1f8ce9] hover:text-white font-bold text-sm rounded-full uppercase tracking-wider flex items-center justify-center gap-2 border border-blue-400 transition-all active:scale-95"
          >
            <Radio className="w-5 h-5" />
            Save Offline & Broadcast Nearby (BLE)
          </button>
        </div>
      </form>
    </motion.div>
  );
};
