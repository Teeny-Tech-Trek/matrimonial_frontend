export type Gender = 'male' | 'female' | 'other';
export type MaritalStatus = 'never_married' | 'divorced' | 'widowed' | 'separated';
export type InterestStatus = 'pending' | 'accepted' | 'declined' | 'expired';
export type PhotoStatus = 'pending' | 'approved' | 'rejected';
export type MembershipTier = 'free' | 'basic' | 'premium' | 'elite';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type ReportStatus = 'pending' | 'investigating' | 'resolved' | 'dismissed';

export interface Profile {
  id: string;
  phoneNumber: string;
  phoneVerified: boolean;
  fullName: string;
  gender: Gender;
  dateOfBirth: string;
  profileCreatedFor: string;
  profileCompletionPercentage: number;
  isActive: boolean;
  isVerified: boolean;
  lastActiveAt: string;
  createdAt: string;
}

export interface PersonalDetails {
  id: string;
  profileId: string;
  maritalStatus: MaritalStatus;
  heightCm: number;
  weightKg?: number;
  bodyType?: string;
  complexion?: string;
  physicalDisability: boolean;
  disabilityDetails?: string;
  bloodGroup?: string;
  motherTongue: string;
  languagesKnown: string[];
}

export interface ReligiousDetails {
  id: string;
  profileId: string;
  religion: string;
  caste?: string;
  subCaste?: string;
  gotra?: string;
  rashi?: string;
  star?: string;
  manglik?: boolean;
}

export interface EducationDetails {
  id: string;
  profileId: string;
  highestEducation: string;
  educationField: string;
  institutionName?: string;
  additionalQualifications?: string;
}

export interface ProfessionalDetails {
  id: string;
  profileId: string;
  occupation: string;
  occupationDetail?: string;
  organizationName?: string;
  annualIncomeMin?: number;
  annualIncomeMax?: number;
  workingCity?: string;
  workingState?: string;
  workingCountry?: string;
}

export interface FamilyDetails {
  id: string;
  profileId: string;
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherOccupation?: string;
  brothers: number;
  brothersMarried: number;
  sisters: number;
  sistersMarried: number;
  familyType?: string;
  familyStatus?: string;
  familyValues?: string;
  ancestralOrigin?: string;
  currentResidenceCity: string;
  currentResidenceState: string;
  currentResidenceCountry: string;
}

export interface LifestylePreferences {
  id: string;
  profileId: string;
  diet?: string;
  smoking: boolean;
  drinking: boolean;
  hobbies: string[];
  interests: string[];
  aboutMe?: string;
  partnerExpectations?: string;
}

export interface Horoscope {
  id: string;
  profileId: string;
  birthTime?: string;
  birthPlace?: string;
  horoscopeFileUrl?: string;
  horoscopeFileName?: string;
  uploadedAt: string;
}

export interface ProfilePhoto {
  id: string;
  profileId: string;
  photoUrl: string;
  watermarkedUrl?: string;
  isPrimary: boolean;
  displayOrder: number;
  status: PhotoStatus;
  rejectionReason?: string;
  uploadedAt: string;
  approvedAt?: string;
}

export interface ProfileVideo {
  id: string;
  profileId: string;
  videoUrl: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  status: PhotoStatus;
  rejectionReason?: string;
  uploadedAt: string;
}

export interface UserPreferences {
  id: string;
  profileId: string;
  ageMin?: number;
  ageMax?: number;
  heightMinCm?: number;
  heightMaxCm?: number;
  maritalStatus?: MaritalStatus[];
  religions?: string[];
  castes?: string[];
  motherTongues?: string[];
  countries?: string[];
  states?: string[];
  cities?: string[];
  educationLevels?: string[];
  occupations?: string[];
  incomeMin?: number;
  incomeMax?: number;
  diet?: string[];
  manglikPreference?: string;
}

export interface PrivacySettings {
  id: string;
  profileId: string;
  hideProfile: boolean;
  hidePhotosUntilInterest: boolean;
  hideContactInfo: boolean;
  showHoroscope: boolean;
  showLastActive: boolean;
  allowMessagesFrom: 'all' | 'premium_only' | 'accepted_interests';
}

export interface MembershipPlan {
  id: string;
  tier: MembershipTier;
  name: string;
  durationMonths: number;
  priceInr: number;
  contactRevealsLimit: number | null;
  canSendUnlimitedInterests: boolean;
  canSendMessages: boolean;
  prioritySupport: boolean;
  profileHighlight: boolean;
  isActive: boolean;
}

export interface UserSubscription {
  id: string;
  profileId: string;
  planId: string;
  tier: MembershipTier;
  startDate: string;
  endDate: string;
  isActive: boolean;
  autoRenew: boolean;
  contactRevealsUsed: number;
  contactRevealsLimit: number | null;
}

export interface Payment {
  id: string;
  profileId: string;
  subscriptionId?: string;
  amountInr: number;
  currency: string;
  paymentMethod: string;
  paymentGatewayId?: string;
  status: PaymentStatus;
  transactionDate: string;
}

export interface Interest {
  id: string;
  senderId: string;
  receiverId: string;
  status: InterestStatus;
  message?: string;
  sentAt: string;
  respondedAt?: string;
  expiresAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  messageText: string;
  isRead: boolean;
  readAt?: string;
  sentAt: string;
}

export interface ContactReveal {
  id: string;
  requesterId: string;
  profileId: string;
  revealedAt: string;
}

export interface ProfileView {
  id: string;
  viewerId: string;
  profileId: string;
  viewedAt: string;
}

export interface Favorite {
  id: string;
  profileId: string;
  favoritedProfileId: string;
  createdAt: string;
}

export interface Block {
  id: string;
  blockerId: string;
  blockedId: string;
  reason?: string;
  blockedAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedProfileId: string;
  reason: string;
  description?: string;
  status: ReportStatus;
  adminNotes?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface CompleteProfile extends Profile {
  [x: string]: any;
  personalDetails?: PersonalDetails;
  religiousDetails?: ReligiousDetails;
  educationDetails?: EducationDetails;
  professionalDetails?: ProfessionalDetails;
  familyDetails?: FamilyDetails;
  lifestylePreferences?: LifestylePreferences;
  horoscope?: Horoscope;
  photos: ProfilePhoto[];
  video?: ProfileVideo;
  subscription?: UserSubscription;
  privacySettings?: PrivacySettings;
}