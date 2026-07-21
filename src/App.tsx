import React, { useState, useEffect } from 'react';
import {
  UserRole,
  BloodGroup,
  DonorProfile,
  BloodRequest,
  SystemAlert,
  ActivityItem,
  RequestStatus,
} from './types';
import {
  INITIAL_DONORS,
  INITIAL_REQUESTS,
  INITIAL_ALERTS,
  INITIAL_ACTIVITIES,
} from './data/initialData';

import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { NavigationDrawer } from './components/NavigationDrawer';
import { RoleSelection } from './components/RoleSelection';
import { DonorRegistrationView } from './components/DonorRegistrationView';
import { DonorHomeView } from './components/DonorHomeView';
import { MatchingDonorsView } from './components/MatchingDonorsView';
import { CreateEmergencyRequestView } from './components/CreateEmergencyRequestView';
import { OfflineModeView } from './components/OfflineModeView';
import { RequestTrackingView } from './components/RequestTrackingView';
import { HealthWorkerDashboard } from './components/HealthWorkerDashboard';
import { AdminOverview } from './components/AdminOverview';
import { CertificateView } from './components/CertificateView';
import { KotlinCodeViewer } from './components/KotlinCodeViewer';

import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Phone, Bell, Radio } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('select');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [viewMode, setViewMode] = useState<'app' | 'kotlin_code'>('app');
  const [isOffline, setIsOffline] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // App Data State (hydrated from localStorage if present)
  const [donors, setDonors] = useState<DonorProfile[]>(() => {
    const saved = localStorage.getItem('bloodlink_donors');
    return saved ? JSON.parse(saved) : INITIAL_DONORS;
  });

  const [requests, setRequests] = useState<BloodRequest[]>(() => {
    const saved = localStorage.getItem('bloodlink_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [selectedBloodGroupFilter, setSelectedBloodGroupFilter] = useState<BloodGroup>('O+');
  const [selectedTrackingRequest, setSelectedTrackingRequest] = useState<BloodRequest | null>(null);
  const [isRegisteringDonor, setIsRegisteringDonor] = useState(false);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('bloodlink_donors', JSON.stringify(donors));
  }, [donors]);

  useEffect(() => {
    localStorage.setItem('bloodlink_requests', JSON.stringify(requests));
  }, [requests]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'acceptor') {
      setActiveTab('donors');
    } else if (role === 'donor') {
      setActiveTab('home');
    } else if (role === 'health_worker') {
      setActiveTab('home');
    } else if (role === 'admin') {
      setActiveTab('home');
    }
  };

  const handleRegisterDonor = (
    newDonorData: Omit<DonorProfile, 'id' | 'initials' | 'isAvailable' | 'distanceKm' | 'isVerified'>
  ) => {
    const initials = newDonorData.name
      .split(' ')
      .map((n) => n[0])
      .join('.')
      .toUpperCase();

    const newDonor: DonorProfile = {
      ...newDonorData,
      id: `d_${Date.now()}`,
      initials: initials.length === 1 ? `${initials}.` : initials,
      isAvailable: true,
      distanceKm: 1.2,
      isVerified: true,
    };

    setDonors((prev) => [newDonor, ...prev]);
    setIsRegisteringDonor(false);
    showToast(`Registered successfully as a verified ${newDonor.bloodGroup} donor!`);
  };

  const handleCreateRequest = (
    reqData: Omit<BloodRequest, 'id' | 'status' | 'createdAt'>,
    broadcastOffline: boolean
  ) => {
    const newReq: BloodRequest = {
      ...reqData,
      id: `BL${Math.floor(100 + Math.random() * 900)}`,
      status: 'created',
      createdAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setRequests((prev) => [newReq, ...prev]);
    setIsCreatingRequest(false);
    setSelectedTrackingRequest(newReq);

    if (broadcastOffline) {
      setIsOffline(true);
      setActiveTab('offline');
      showToast(`Emergency request #${newReq.id} saved locally & broadcasting via BLE radar!`);
    } else {
      setActiveTab('requests');
      showToast(`Emergency Request #${newReq.id} created! Finding matching donors...`);
    }
  };

  const handleCallDonor = (donor: DonorProfile) => {
    showToast(`Initiating emergency call to ${donor.name} (${donor.phone})...`);
    window.location.href = `tel:${donor.phone}`;
  };

  const handleNotifyDonor = (donor: DonorProfile) => {
    showToast(`Pushed high-priority emergency SMS/push notification to ${donor.name}!`);
  };

  const handleAdvanceStatus = (requestId: string, nextStatus: RequestStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: nextStatus } : r))
    );
    if (selectedTrackingRequest && selectedTrackingRequest.id === requestId) {
      setSelectedTrackingRequest((prev) => (prev ? { ...prev, status: nextStatus } : null));
    }
    showToast(`Request #${requestId} status updated to "${nextStatus.replace('_', ' ')}"!`);
  };

  // Logged in donor profile reference
  const currentDonorProfile = donors[0] || INITIAL_DONORS[0];

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-sans flex flex-col pb-20 md:pb-6 selection:bg-[#af101a] selection:text-white">
      {/* Top App Bar */}
      <TopAppBar
        currentRole={currentRole}
        isOffline={isOffline}
        onToggleOffline={() => setIsOffline(!isOffline)}
        viewMode={viewMode}
        onToggleViewMode={(mode) => setViewMode(mode)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onSelectRole={handleSelectRole}
      />

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
        onOpenKotlinCode={() => {
          setViewMode('kotlin_code');
          setIsDrawerOpen(false);
        }}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold max-w-md w-[90%] border border-gray-700"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="flex-1">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Screen Content */}
      <main className="flex-1">
        {viewMode === 'kotlin_code' ? (
          <KotlinCodeViewer />
        ) : currentRole === 'select' ? (
          <RoleSelection onSelectRole={handleSelectRole} />
        ) : (
          <div>
            {/* Donor Registration Screen Override */}
            {isRegisteringDonor ? (
              <DonorRegistrationView
                onRegister={handleRegisterDonor}
                onCancel={() => setIsRegisteringDonor(false)}
              />
            ) : isCreatingRequest ? (
              <CreateEmergencyRequestView onCreateRequest={handleCreateRequest} />
            ) : (
              <div>
                {/* TAB SWITCHING */}
                {activeTab === 'home' && (
                  <div>
                    {currentRole === 'donor' ? (
                      <DonorHomeView
                        donor={currentDonorProfile}
                        activeRequestsCount={requests.filter((r) => r.status !== 'completed').length}
                        onToggleAvailability={(isAvail) => {
                          setDonors((prev) =>
                            prev.map((d) => (d.id === currentDonorProfile.id ? { ...d, isAvailable: isAvail } : d))
                          );
                          showToast(`Availability status updated to ${isAvail ? 'Available' : 'Not Available'}`);
                        }}
                        onUpdateProfile={() => setIsRegisteringDonor(true)}
                        onViewRequests={() => setActiveTab('donors')}
                        onViewCertificate={() => setActiveTab('certificate')}
                      />
                    ) : currentRole === 'health_worker' ? (
                      <HealthWorkerDashboard
                        activeRequests={requests}
                        verifiedDonorsCount={donors.filter((d) => d.isVerified).length}
                        pendingVerificationsCount={5}
                        activities={INITIAL_ACTIVITIES}
                        onCreateNewRequest={() => setIsCreatingRequest(true)}
                        onViewRequestDetails={(req) => {
                          setSelectedTrackingRequest(req);
                          setActiveTab('requests');
                        }}
                      />
                    ) : currentRole === 'admin' ? (
                      <AdminOverview alerts={INITIAL_ALERTS} />
                    ) : (
                      <MatchingDonorsView
                        donors={donors}
                        selectedBloodGroup={selectedBloodGroupFilter}
                        onSelectBloodGroup={setSelectedBloodGroupFilter}
                        onCallDonor={handleCallDonor}
                        onNotifyDonor={handleNotifyDonor}
                      />
                    )}
                  </div>
                )}

                {activeTab === 'requests' && (
                  <div>
                    {selectedTrackingRequest ? (
                      <div className="space-y-4">
                        <div className="max-w-3xl mx-auto px-4 pt-4">
                          <button
                            onClick={() => setSelectedTrackingRequest(null)}
                            className="text-xs font-bold text-[#0061a4] hover:underline"
                          >
                            ← Back to Request List
                          </button>
                        </div>
                        <RequestTrackingView
                          request={selectedTrackingRequest}
                          onAdvanceStatus={handleAdvanceStatus}
                        />
                      </div>
                    ) : (
                      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <h1 className="text-2xl font-bold text-[#1a1c1c]">Emergency Requests</h1>
                          <button
                            onClick={() => setIsCreatingRequest(true)}
                            className="bg-[#af101a] text-white px-4 py-2 rounded-full font-bold text-xs shadow-xs"
                          >
                            + New Request
                          </button>
                        </div>

                        <div className="space-y-3">
                          {requests.map((req) => (
                            <div
                              key={req.id}
                              onClick={() => setSelectedTrackingRequest(req)}
                              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-base text-[#1a1c1c]">#{req.id}</span>
                                  <span className="bg-red-100 text-[#af101a] px-2.5 py-0.5 rounded-full font-black text-xs">
                                    {req.bloodGroup}
                                  </span>
                                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                                    {req.urgency}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">
                                  {req.hospitalName} • {req.locationWard}
                                </p>
                              </div>

                              <div className="text-right">
                                <span className="text-xs font-bold text-emerald-700 capitalize bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                                  {req.status.replace('_', ' ')}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'donors' && (
                  <MatchingDonorsView
                    donors={donors}
                    selectedBloodGroup={selectedBloodGroupFilter}
                    onSelectBloodGroup={setSelectedBloodGroupFilter}
                    onCallDonor={handleCallDonor}
                    onNotifyDonor={handleNotifyDonor}
                  />
                )}

                {activeTab === 'offline' && (
                  <OfflineModeView
                    nearbyDonorsCount={donors.filter((d) => d.distanceKm <= 5).length}
                    pendingSyncCount={1}
                    onRetrySync={() => {
                      setIsOffline(false);
                      showToast('Connectivity restored! All local Room DB requests synchronized with cloud.');
                    }}
                  />
                )}

                {activeTab === 'certificate' && (
                  <CertificateView donorName={currentDonorProfile.name} />
                )}

                {activeTab === 'profile' && (
                  <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-4">
                      <div className="w-20 h-20 rounded-full bg-[#af101a] text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md">
                        {currentDonorProfile.initials}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{currentDonorProfile.name}</h2>
                        <p className="text-xs text-gray-500">{currentDonorProfile.phone} • {currentDonorProfile.area}</p>
                      </div>

                      <div className="flex justify-center gap-2 pt-2">
                        <span className="px-3 py-1 bg-red-100 text-[#af101a] font-black rounded-full text-xs">
                          Blood Group {currentDonorProfile.bloodGroup}
                        </span>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-xs">
                          Verified Donor
                        </span>
                      </div>

                      <button
                        onClick={() => setIsRegisteringDonor(true)}
                        className="w-full mt-4 h-11 bg-gray-900 text-white font-bold rounded-xl text-xs"
                      >
                        Edit Profile Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Nav Bar */}
      {viewMode === 'app' && currentRole !== 'select' && !isRegisteringDonor && !isCreatingRequest && (
        <BottomNavBar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            if (tab !== 'requests') setSelectedTrackingRequest(null);
          }}
          pendingSyncCount={isOffline ? 1 : 0}
        />
      )}
    </div>
  );
}
