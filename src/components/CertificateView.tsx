import React, { useState } from 'react';
import { Award, Download, Share2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface CertificateViewProps {
  donorName: string;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ donorName }) => {
  const [downloading, setDownloading] = useState(false);
  const [shared, setShared] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Certificate for ${donorName || 'Alex'} downloaded successfully as PDF!`);
    }, 1500);
  };

  const handleShare = () => {
    setShared(true);
    if (navigator.share) {
      navigator.share({
        title: 'BloodLink Donation Recognition Certificate',
        text: `I contributed to life-saving blood emergency response with BloodLink!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto px-4 py-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-[#af101a]" />
          <h1 className="text-xl font-bold text-[#1a1c1c]">Verified Recognition Certificate</h1>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
          SRM & UBA Authorized
        </span>
      </div>

      {/* Certificate Framed Card */}
      <div className="bg-gradient-to-b from-amber-50/40 via-white to-red-50/30 p-6 sm:p-10 rounded-3xl border-2 border-red-200/90 shadow-md relative overflow-hidden text-center space-y-6">
        {/* Certificate Decorative Corner Lines */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#af101a]/40" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#af101a]/40" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#af101a]/40" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#af101a]/40" />

        {/* Institutional Logos Header */}
        <div className="flex items-center justify-around max-w-sm mx-auto border-b border-red-100 pb-4">
          {/* SRM Logo graphic */}
          <div className="flex items-center gap-2 text-left">
            <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-black text-xs shadow-2xs border-2 border-amber-400">
              SRM
            </div>
            <div className="text-[10px] font-bold text-gray-800 leading-tight">
              SRM INSTITUTE OF<br />SCIENCE & TECH
            </div>
          </div>

          <div className="h-8 w-px bg-gray-300" />

          {/* Unnat Bharat Abhiyan Logo graphic */}
          <div className="flex items-center gap-2 text-left">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-black text-xs shadow-2xs border-2 border-amber-300">
              UBA
            </div>
            <div className="text-[10px] font-bold text-gray-800 leading-tight">
              UNNAT BHARAT<br />ABHIYAN
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#af101a] tracking-tight uppercase">
            Donation Recognition Certificate
          </h2>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">
            Official Emergency Blood Donor Honor
          </p>
        </div>

        {/* Recipient Name */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-600">This certificate is proudly presented to</p>
          <div className="text-2xl sm:text-3xl font-black text-[#1a1c1c] border-b-2 border-[#af101a]/30 inline-block px-8 py-1">
            {donorName || 'Alex'}
          </div>
        </div>

        {/* Citation text */}
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-lg mx-auto font-serif italic">
          "In formal recognition and deepest appreciation for your life-saving blood donation.
          Your commitment to community health and selfless contribution serves as an inspiration
          to others."
        </p>

        {/* Signatures & Verification */}
        <div className="grid grid-cols-2 gap-4 pt-6 max-w-md mx-auto border-t border-gray-200">
          <div>
            <div className="h-8 flex items-center justify-center font-serif text-sm font-bold text-gray-800 italic">
              {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pt-1 border-t border-gray-300">
              Date Issued
            </p>
          </div>

          <div>
            <div className="h-8 flex items-center justify-center text-xs font-bold text-[#0061a4]">
              <ShieldCheck className="w-4 h-4 mr-1 text-[#016619]" />
              Dr. Sharma (Hub Admin)
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pt-1 border-t border-gray-300">
              Authorized Signature
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="bg-[#af101a] hover:bg-[#8b0c14] text-white font-bold text-xs h-12 rounded-full flex items-center justify-center gap-2 flex-1 shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {downloading ? 'Generating PDF...' : 'Download PDF Certificate'}
        </button>

        <button
          onClick={handleShare}
          className="border border-gray-300 text-[#af101a] font-bold text-xs h-12 rounded-full flex items-center justify-center gap-2 flex-1 hover:bg-red-50 transition-all active:scale-95"
        >
          <Share2 className="w-4 h-4" />
          {shared ? 'Link Copied / Shared!' : 'Share Certificate'}
        </button>
      </div>
    </motion.div>
  );
};
