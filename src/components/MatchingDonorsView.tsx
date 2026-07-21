import React, { useState } from 'react';
import { DonorProfile, BloodGroup } from '../types';
import { Phone, Bell, BookmarkCheck, CheckCircle2, MapPin, Filter, Droplet } from 'lucide-react';
import { motion } from 'motion/react';

interface MatchingDonorsViewProps {
  donors: DonorProfile[];
  selectedBloodGroup: BloodGroup;
  onSelectBloodGroup: (bg: BloodGroup) => void;
  onCallDonor: (donor: DonorProfile) => void;
  onNotifyDonor: (donor: DonorProfile) => void;
}

export const MatchingDonorsView: React.FC<MatchingDonorsViewProps> = ({
  donors,
  selectedBloodGroup,
  onSelectBloodGroup,
  onCallDonor,
  onNotifyDonor,
}) => {
  const [filterAvailableOnly, setFilterAvailableOnly] = useState(false);
  const [backupDonorIds, setBackupDonorIds] = useState<Set<string>>(new Set());

  const bloodGroups: BloodGroup[] = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'];

  const filteredDonors = donors.filter((d) => {
    if (d.bloodGroup !== selectedBloodGroup) return false;
    if (filterAvailableOnly && !d.isAvailable) return false;
    return true;
  });

  const toggleBackup = (id: string) => {
    setBackupDonorIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-6 space-y-6"
    >
      {/* Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1c1c] flex items-center gap-2">
            Matching Donors
            <span className="bg-red-100 text-[#af101a] px-3 py-1 rounded-full text-base font-extrabold border border-red-200">
              {selectedBloodGroup}
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Verified local donor network ready for immediate response.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedBloodGroup}
            onChange={(e) => onSelectBloodGroup(e.target.value as BloodGroup)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-xl font-bold text-xs text-[#af101a] focus:ring-2 focus:ring-[#af101a] outline-none cursor-pointer shadow-2xs"
          >
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                Group {bg}
              </option>
            ))}
          </select>

          <button
            onClick={() => setFilterAvailableOnly(!filterAvailableOnly)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs ${
              filterAvailableOnly
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{filterAvailableOnly ? 'Available Only' : 'All Donors'}</span>
          </button>
        </div>
      </div>

      {/* Donors List */}
      <div className="flex flex-col gap-4">
        {filteredDonors.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center text-gray-500">
            <Droplet className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="font-bold text-gray-700">No matching donors found for {selectedBloodGroup}</p>
            <p className="text-xs mt-1">Try toggling the "Available Only" filter or select another blood group.</p>
          </div>
        ) : (
          filteredDonors.map((donor) => {
            const isBackup = backupDonorIds.has(donor.id);
            return (
              <article
                key={donor.id}
                className={`bg-white rounded-2xl border ${
                  donor.isAvailable ? 'border-gray-200/90 shadow-2xs' : 'border-gray-200 opacity-80'
                } p-5 flex flex-col gap-4 relative overflow-hidden group hover:shadow-md transition-all`}
              >
                {/* Status Bar Top */}
                <div
                  className={`absolute top-0 left-0 w-full h-1.5 ${
                    donor.isAvailable ? 'bg-[#016619]' : 'bg-gray-300'
                  }`}
                />

                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0061a4] font-bold text-lg flex items-center justify-center shrink-0 shadow-2xs">
                      {donor.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-base text-[#1a1c1c]">
                          Initials: {donor.initials}
                        </h3>
                        {donor.isVerified && (
                          <CheckCircle2 className="w-4 h-4 text-[#0061a4] fill-blue-50 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {donor.distanceKm} km ({donor.area})
                        </span>
                        <span>•</span>
                        <span
                          className={`flex items-center gap-1 font-semibold ${
                            donor.isAvailable ? 'text-[#016619]' : 'text-gray-500'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              donor.isAvailable ? 'bg-[#016619]' : 'bg-gray-400'
                            }`}
                          />
                          {donor.isAvailable ? 'Available Now' : `Last donated ${donor.lastDonationDate}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-xl px-3 py-1.5 flex flex-col items-center justify-center border border-gray-200 shrink-0">
                    <span className="text-[10px] font-medium text-gray-500 uppercase">Group</span>
                    <span className="text-lg font-black text-[#af101a]">{donor.bloodGroup}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => onCallDonor(donor)}
                    className="flex-1 h-11 bg-[#af101a] text-white rounded-xl flex items-center justify-center gap-2 font-bold text-xs hover:bg-[#8b0c14] transition-all shadow-2xs active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </button>
                  <button
                    onClick={() => onNotifyDonor(donor)}
                    className="flex-1 h-11 bg-[#0061a4] text-white rounded-xl flex items-center justify-center gap-2 font-bold text-xs hover:bg-[#00497d] transition-all shadow-2xs active:scale-95"
                  >
                    <Bell className="w-4 h-4" />
                    Notify
                  </button>
                  <button
                    onClick={() => toggleBackup(donor.id)}
                    className={`h-11 px-4 border rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 whitespace-nowrap ${
                      isBackup
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <BookmarkCheck className="w-4 h-4" />
                    {isBackup ? 'Backed Up' : 'Mark as Backup'}
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </motion.div>
  );
};
