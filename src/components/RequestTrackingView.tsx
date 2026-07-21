import React, { useState } from 'react';
import { BloodRequest, RequestStatus } from '../types';
import { Check, CheckCircle2, Clock, Phone, MapPin, AlertTriangle, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion } from 'motion/react';

interface RequestTrackingViewProps {
  request: BloodRequest;
  onAdvanceStatus?: (requestId: string, nextStatus: RequestStatus) => void;
}

export const RequestTrackingView: React.FC<RequestTrackingViewProps> = ({
  request,
  onAdvanceStatus,
}) => {
  const [currentStatus, setCurrentStatus] = useState<RequestStatus>(request.status || 'accepted');

  const steps: { key: RequestStatus; title: string; subtitle: string }[] = [
    { key: 'created', title: 'Request Created', subtitle: request.createdAt || '09:42 AM' },
    { key: 'notified', title: 'Donors Notified', subtitle: '09:45 AM (12 local donors)' },
    { key: 'accepted', title: 'Donor Accepted', subtitle: '10:15 AM - Donor en route' },
    { key: 'hw_confirmed', title: 'Health Worker Confirmed', subtitle: 'Donor verified at station' },
    { key: 'completed', title: 'Donation Completed', subtitle: 'Life saved successfully' },
  ];

  const statusOrder: RequestStatus[] = ['created', 'notified', 'accepted', 'hw_confirmed', 'completed'];
  const currentIndex = statusOrder.indexOf(currentStatus);

  const handleConfirmNextStep = () => {
    if (currentIndex < statusOrder.length - 1) {
      const nextStatus = statusOrder[currentIndex + 1];
      setCurrentStatus(nextStatus);
      if (onAdvanceStatus) onAdvanceStatus(request.id, nextStatus);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto px-4 py-6 space-y-6"
    >
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-[#1a1c1c]">Request ID: #{request.id}</h1>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <Clock className="w-3.5 h-3.5" />
            Created Today, {request.createdAt}
          </p>
        </div>

        <div className="bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-xl flex items-center gap-1.5 font-bold text-xs border border-emerald-300 w-fit">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span className="capitalize">{currentStatus.replace('_', ' ')}</span>
        </div>
      </section>

      {/* Grid: Timeline & Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Status Timeline */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs flex flex-col justify-between">
          <h2 className="font-bold text-base text-[#1a1c1c] mb-6 border-b border-gray-100 pb-2">
            Status Timeline
          </h2>

          <div className="relative pl-8 space-y-6">
            {/* Vertical Connecting Line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200 rounded-full" />
            <div
              className="absolute left-[11px] top-2 w-0.5 bg-emerald-600 rounded-full transition-all duration-300"
              style={{
                height: `${(currentIndex / (statusOrder.length - 1)) * 100}%`,
              }}
            />

            {steps.map((step, idx) => {
              const isDone = idx < currentIndex;
              const isCurrent = idx === currentIndex;

              return (
                <div key={step.key} className="relative flex items-center group">
                  <div
                    className={`absolute -left-[32px] w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-2xs transition-all ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 animate-pulse'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    ) : (
                      <span className="text-[10px]">{idx + 1}</span>
                    )}
                  </div>

                  <div>
                    <p
                      className={`text-xs font-bold ${
                        isCurrent
                          ? 'text-emerald-800 text-sm'
                          : isDone
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-[11px] text-gray-500">{step.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details Stack */}
        <div className="md:col-span-5 flex flex-col gap-4">
          {/* Patient Info Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <h3 className="font-bold text-sm text-[#1a1c1c] flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-[#af101a]" />
              Patient Details
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Blood Type</span>
                <p className="text-xl font-black text-[#af101a]">{request.bloodGroup}</p>
              </div>

              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Units Needed</span>
                <p className="text-xl font-black text-gray-900">{request.unitsRequired}</p>
              </div>

              <div className="col-span-2 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Urgency</span>
                <p className="text-xs font-bold text-red-600 flex items-center gap-1 mt-0.5 capitalize">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {request.urgency} (Under 4 hours)
                </p>
              </div>
            </div>
          </div>

          {/* Hospital Location Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#1a1c1c] flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#0061a4]" />
                Hospital & Location
              </h3>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-2">
                <p className="text-xs font-bold text-gray-900">{request.hospitalName}</p>
                <p className="text-[11px] text-gray-600">{request.locationWard}</p>

                {/* Map Graphic Preview */}
                <div className="h-28 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-[#0061a4] mx-auto animate-bounce" />
                    <span className="text-[10px] font-bold text-[#0061a4]">GPS Location Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {request.acceptedDonorPhone && (
              <a
                href={`tel:${request.acceptedDonorPhone}`}
                className="w-full h-11 bg-[#33a0fd] hover:bg-[#0061a4] text-[#00355c] hover:text-white rounded-xl font-bold text-xs shadow-2xs transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Contact Donor ({request.acceptedDonorName || 'Assigned'})
              </a>
            )}
          </div>
        </div>

        {/* Emergency Confirm Arrival Button */}
        <div className="md:col-span-12">
          {currentIndex < statusOrder.length - 1 ? (
            <button
              onClick={handleConfirmNextStep}
              className="w-full h-14 bg-[#af101a] hover:bg-[#8b0c14] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <ShieldCheck className="w-6 h-6" />
              Advance Status: Confirm {steps[currentIndex + 1].title}
            </button>
          ) : (
            <div className="w-full p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-center font-bold text-sm flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              Donation Cycle Completed Successfully!
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
