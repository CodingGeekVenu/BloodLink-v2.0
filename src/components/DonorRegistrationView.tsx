import React, { useState } from 'react';
import { BloodGroup, DonorProfile } from '../types';
import { User, Phone, Droplet, Cake, MapPin, Calendar, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface DonorRegistrationProps {
  onRegister: (donor: Omit<DonorProfile, 'id' | 'initials' | 'isAvailable' | 'distanceKm' | 'isVerified'>) => void;
  onCancel?: () => void;
}

export const DonorRegistrationView: React.FC<DonorRegistrationProps> = ({ onRegister, onCancel }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>('');
  const [age, setAge] = useState<number | ''>('');
  const [area, setArea] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [consent, setConsent] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !bloodGroup || !age || !area) return;

    onRegister({
      name: fullName,
      phone,
      bloodGroup: bloodGroup as BloodGroup,
      age: Number(age),
      area,
      lastDonationDate: lastDonationDate || 'Never',
      consent,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto px-4 py-6"
    >
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-xl font-bold text-[#af101a] uppercase tracking-tight flex-1 text-center">
          BloodLink
        </h2>
        <div className="w-9" />
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[#1a1c1c] mb-1">Donor Registration</h1>
        <p className="text-sm text-gray-600">
          Join the verified donor network to save lives in your area.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-[#1a1c1c] mb-1" htmlFor="fullName">
            Full Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <User className="w-5 h-5" />
            </div>
            <input
              id="fullName"
              type="text"
              required
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-medium text-sm text-gray-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-[#1a1c1c] mb-1" htmlFor="phone">
            Phone Number *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Phone className="w-5 h-5" />
            </div>
            <input
              id="phone"
              type="tel"
              required
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-medium text-sm text-gray-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Blood Group */}
          <div>
            <label className="block text-sm font-semibold text-[#1a1c1c] mb-1" htmlFor="bloodGroup">
              Blood Group *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#af101a]">
                <Droplet className="w-5 h-5 fill-current" />
              </div>
              <select
                id="bloodGroup"
                required
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-medium text-sm text-gray-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="" disabled>Select group</option>
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-semibold text-[#1a1c1c] mb-1" htmlFor="age">
              Age *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Cake className="w-5 h-5" />
              </div>
              <input
                id="age"
                type="number"
                min={18}
                max={65}
                required
                placeholder="Years (18-65)"
                value={age}
                onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-medium text-sm text-gray-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Village / Area */}
        <div>
          <label className="block text-sm font-semibold text-[#1a1c1c] mb-1" htmlFor="area">
            Village / Area *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <MapPin className="w-5 h-5" />
            </div>
            <input
              id="area"
              type="text"
              required
              placeholder="Current locality / sector"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-medium text-sm text-gray-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none"
            />
          </div>
        </div>

        {/* Last Donation Date */}
        <div>
          <label className="block text-sm font-semibold text-[#1a1c1c] mb-1" htmlFor="lastDonation">
            Last Donation Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Calendar className="w-5 h-5" />
            </div>
            <input
              id="lastDonation"
              type="date"
              value={lastDonationDate}
              onChange={(e) => setLastDonationDate(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-medium text-sm text-gray-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Leave blank if never donated before.</p>
        </div>

        {/* Consent Checkbox */}
        <div className="bg-red-50/60 p-4 rounded-xl border border-red-100 flex items-start gap-3 mt-4">
          <input
            id="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-1 w-5 h-5 text-[#af101a] border-gray-300 rounded focus:ring-[#af101a] cursor-pointer"
          />
          <div>
            <label htmlFor="consent" className="text-sm font-medium text-gray-900 cursor-pointer">
              I consent to be contacted during verified blood emergencies.
            </label>
            <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Your details are secure and only visible to verified health workers.
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-[#af101a] hover:bg-[#8b0c14] active:scale-[0.99] text-white font-bold h-12 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Droplet className="w-5 h-5 fill-current" />
          Register as Donor
        </button>
      </form>
    </motion.div>
  );
};
