export type UserRole = 'donor' | 'acceptor' | 'health_worker' | 'admin' | 'select';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export type UrgencyLevel = 'critical' | 'high' | 'normal';

export type RequestStatus = 'created' | 'notified' | 'accepted' | 'hw_confirmed' | 'completed';

export interface DonorProfile {
  id: string;
  name: string;
  initials: string;
  phone: string;
  bloodGroup: BloodGroup;
  age: number;
  area: string;
  lastDonationDate: string;
  isAvailable: boolean;
  distanceKm: number;
  isVerified: boolean;
  consent: boolean;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  unitsRequired: number;
  urgency: UrgencyLevel;
  hospitalName: string;
  locationWard: string;
  requiredByTime: string;
  doctorHwVerified: boolean;
  hwId?: string;
  status: RequestStatus;
  createdAt: string;
  acceptedDonorId?: string;
  acceptedDonorName?: string;
  acceptedDonorPhone?: string;
}

export interface SystemAlert {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  timestamp: string;
}

export interface ActivityItem {
  id: string;
  type: 'completed' | 'new_donor' | 'broadcast';
  title: string;
  description: string;
  timeAgo: string;
}

export interface KotlinCodeFile {
  id: string;
  filename: string;
  language: string;
  description: string;
  code: string;
}
