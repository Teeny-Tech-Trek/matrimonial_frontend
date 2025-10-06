import { CompleteProfile, MembershipPlan } from '../types';

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'plan_free',
    tier: 'free',
    name: 'Free Plan',
    durationMonths: 0,
    priceInr: 0,
    contactRevealsLimit: 0,
    canSendUnlimitedInterests: false,
    canSendMessages: false,
    prioritySupport: false,
    profileHighlight: false,
    isActive: true
  },
  {
    id: 'plan_basic_1',
    tier: 'basic',
    name: 'Basic - 1 Month',
    durationMonths: 1,
    priceInr: 999,
    contactRevealsLimit: 10,
    canSendUnlimitedInterests: false,
    canSendMessages: true,
    prioritySupport: false,
    profileHighlight: false,
    isActive: true
  },
  {
    id: 'plan_basic_3',
    tier: 'basic',
    name: 'Basic - 3 Months',
    durationMonths: 3,
    priceInr: 2499,
    contactRevealsLimit: 30,
    canSendUnlimitedInterests: false,
    canSendMessages: true,
    prioritySupport: false,
    profileHighlight: false,
    isActive: true
  },
  {
    id: 'plan_premium_3',
    tier: 'premium',
    name: 'Premium - 3 Months',
    durationMonths: 3,
    priceInr: 4999,
    contactRevealsLimit: 100,
    canSendUnlimitedInterests: true,
    canSendMessages: true,
    prioritySupport: true,
    profileHighlight: true,
    isActive: true
  },
  {
    id: 'plan_premium_6',
    tier: 'premium',
    name: 'Premium - 6 Months',
    durationMonths: 6,
    priceInr: 8999,
    contactRevealsLimit: 200,
    canSendUnlimitedInterests: true,
    canSendMessages: true,
    prioritySupport: true,
    profileHighlight: true,
    isActive: true
  },
  {
    id: 'plan_elite_12',
    tier: 'elite',
    name: 'Elite - 1 Year',
    durationMonths: 12,
    priceInr: 15999,
    contactRevealsLimit: 500,
    canSendUnlimitedInterests: true,
    canSendMessages: true,
    prioritySupport: true,
    profileHighlight: true,
    isActive: true
  }
];

export const mockProfiles: CompleteProfile[] = [
  {
    id: 'user_1',
    phoneNumber: '+919876543210',
    phoneVerified: true,
    fullName: 'Priya Sharma',
    gender: 'female',
    dateOfBirth: '1995-05-15',
    profileCreatedFor: 'self',
    profileCompletionPercentage: 95,
    isActive: true,
    isVerified: true,
    lastActiveAt: new Date().toISOString(),
    createdAt: '2024-01-15T10:00:00Z',
    personalDetails: {
      id: 'pd_1',
      profileId: 'user_1',
      maritalStatus: 'never_married',
      heightCm: 162,
      weightKg: 55,
      bodyType: 'Average',
      complexion: 'Fair',
      physicalDisability: false,
      bloodGroup: 'O+',
      motherTongue: 'Hindi',
      languagesKnown: ['Hindi', 'English', 'Punjabi']
    },
    religiousDetails: {
      id: 'rd_1',
      profileId: 'user_1',
      religion: 'Hindu',
      caste: 'Brahmin',
      subCaste: 'Gaur',
      gotra: 'Kashyap',
      rashi: 'Taurus',
      star: 'Rohini',
      manglik: false
    },
    educationDetails: {
      id: 'ed_1',
      profileId: 'user_1',
      highestEducation: 'Masters',
      educationField: 'Computer Science',
      institutionName: 'Delhi University',
      additionalQualifications: 'MBA in IT'
    },
    professionalDetails: {
      id: 'prof_1',
      profileId: 'user_1',
      occupation: 'Software Engineer',
      occupationDetail: 'Senior Developer',
      organizationName: 'Tech Corp India',
      annualIncomeMin: 1200000,
      annualIncomeMax: 1500000,
      workingCity: 'Bangalore',
      workingState: 'Karnataka',
      workingCountry: 'India'
    },
    familyDetails: {
      id: 'fd_1',
      profileId: 'user_1',
      fatherName: 'Rajesh Sharma',
      fatherOccupation: 'Business Owner',
      motherName: 'Sunita Sharma',
      motherOccupation: 'Homemaker',
      brothers: 1,
      brothersMarried: 0,
      sisters: 1,
      sistersMarried: 1,
      familyType: 'Nuclear',
      familyStatus: 'Upper Middle Class',
      familyValues: 'Moderate',
      ancestralOrigin: 'Uttar Pradesh',
      currentResidenceCity: 'Delhi',
      currentResidenceState: 'Delhi',
      currentResidenceCountry: 'India'
    },
    lifestylePreferences: {
      id: 'lp_1',
      profileId: 'user_1',
      diet: 'Vegetarian',
      smoking: false,
      drinking: false,
      hobbies: ['Reading', 'Cooking', 'Yoga', 'Traveling'],
      interests: ['Technology', 'Arts', 'Music'],
      aboutMe: 'I am a software engineer with a passion for technology and creativity. I value family traditions while embracing modern thinking. Looking for a life partner who shares similar values and is ambitious.',
      partnerExpectations: 'Looking for a well-educated, family-oriented person with good values and a stable career. Someone who respects traditions and is also open-minded.'
    },
    photos: [
      {
        id: 'photo_1_1',
        profileId: 'user_1',
        photoUrl: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=800',
        isPrimary: true,
        displayOrder: 1,
        status: 'approved',
        uploadedAt: '2024-01-15T10:00:00Z',
        approvedAt: '2024-01-15T11:00:00Z'
      },
      {
        id: 'photo_1_2',
        profileId: 'user_1',
        photoUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
        isPrimary: false,
        displayOrder: 2,
        status: 'approved',
        uploadedAt: '2024-01-15T10:05:00Z',
        approvedAt: '2024-01-15T11:00:00Z'
      }
    ],
    subscription: {
      id: 'sub_1',
      profileId: 'user_1',
      planId: 'plan_premium_6',
      tier: 'premium',
      startDate: '2024-01-15T00:00:00Z',
      endDate: '2024-07-15T23:59:59Z',
      isActive: true,
      autoRenew: true,
      contactRevealsUsed: 15,
      contactRevealsLimit: 200
    },
    privacySettings: {
      id: 'priv_1',
      profileId: 'user_1',
      hideProfile: false,
      hidePhotosUntilInterest: false,
      hideContactInfo: true,
      showHoroscope: true,
      showLastActive: true,
      allowMessagesFrom: 'all'
    }
  },
  {
    id: 'user_2',
    phoneNumber: '+919876543211',
    phoneVerified: true,
    fullName: 'Rahul Verma',
    gender: 'male',
    dateOfBirth: '1992-08-20',
    profileCreatedFor: 'self',
    profileCompletionPercentage: 90,
    isActive: true,
    isVerified: true,
    lastActiveAt: new Date(Date.now() - 3600000).toISOString(),
    createdAt: '2024-01-10T10:00:00Z',
    personalDetails: {
      id: 'pd_2',
      profileId: 'user_2',
      maritalStatus: 'never_married',
      heightCm: 175,
      weightKg: 72,
      bodyType: 'Athletic',
      complexion: 'Wheatish',
      physicalDisability: false,
      bloodGroup: 'A+',
      motherTongue: 'Hindi',
      languagesKnown: ['Hindi', 'English', 'Marathi']
    },
    religiousDetails: {
      id: 'rd_2',
      profileId: 'user_2',
      religion: 'Hindu',
      caste: 'Kshatriya',
      subCaste: 'Rajput',
      rashi: 'Leo',
      star: 'Magha',
      manglik: false
    },
    educationDetails: {
      id: 'ed_2',
      profileId: 'user_2',
      highestEducation: 'MBA',
      educationField: 'Finance',
      institutionName: 'IIM Ahmedabad',
      additionalQualifications: 'CFA Level 2'
    },
    professionalDetails: {
      id: 'prof_2',
      profileId: 'user_2',
      occupation: 'Investment Banker',
      occupationDetail: 'Vice President',
      organizationName: 'Global Finance Corp',
      annualIncomeMin: 2500000,
      annualIncomeMax: 3000000,
      workingCity: 'Mumbai',
      workingState: 'Maharashtra',
      workingCountry: 'India'
    },
    familyDetails: {
      id: 'fd_2',
      profileId: 'user_2',
      fatherName: 'Vijay Verma',
      fatherOccupation: 'Retired Government Officer',
      motherName: 'Meera Verma',
      motherOccupation: 'Teacher',
      brothers: 0,
      brothersMarried: 0,
      sisters: 2,
      sistersMarried: 1,
      familyType: 'Nuclear',
      familyStatus: 'Upper Middle Class',
      familyValues: 'Traditional',
      ancestralOrigin: 'Rajasthan',
      currentResidenceCity: 'Mumbai',
      currentResidenceState: 'Maharashtra',
      currentResidenceCountry: 'India'
    },
    lifestylePreferences: {
      id: 'lp_2',
      profileId: 'user_2',
      diet: 'Non-Vegetarian',
      smoking: false,
      drinking: true,
      hobbies: ['Cricket', 'Traveling', 'Photography', 'Fitness'],
      interests: ['Finance', 'Sports', 'Adventure'],
      aboutMe: 'Investment banker with strong family values. I enjoy traveling and staying fit. Believe in work-life balance and looking for a compatible life partner.',
      partnerExpectations: 'Looking for an educated, independent woman who values family and has her own career goals. Should be caring and have a good sense of humor.'
    },
    photos: [
      {
        id: 'photo_2_1',
        profileId: 'user_2',
        photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800',
        isPrimary: true,
        displayOrder: 1,
        status: 'approved',
        uploadedAt: '2024-01-10T10:00:00Z',
        approvedAt: '2024-01-10T11:00:00Z'
      }
    ],
    subscription: {
      id: 'sub_2',
      profileId: 'user_2',
      planId: 'plan_basic_3',
      tier: 'basic',
      startDate: '2024-01-10T00:00:00Z',
      endDate: '2024-04-10T23:59:59Z',
      isActive: true,
      autoRenew: false,
      contactRevealsUsed: 5,
      contactRevealsLimit: 30
    },
    privacySettings: {
      id: 'priv_2',
      profileId: 'user_2',
      hideProfile: false,
      hidePhotosUntilInterest: false,
      hideContactInfo: true,
      showHoroscope: true,
      showLastActive: true,
      allowMessagesFrom: 'all'
    }
  },
  {
    id: 'user_3',
    phoneNumber: '+919876543212',
    phoneVerified: true,
    fullName: 'Anjali Patel',
    gender: 'female',
    dateOfBirth: '1997-03-10',
    profileCreatedFor: 'daughter',
    profileCompletionPercentage: 85,
    isActive: true,
    isVerified: true,
    lastActiveAt: new Date(Date.now() - 7200000).toISOString(),
    createdAt: '2024-02-01T10:00:00Z',
    personalDetails: {
      id: 'pd_3',
      profileId: 'user_3',
      maritalStatus: 'never_married',
      heightCm: 158,
      weightKg: 50,
      bodyType: 'Slim',
      complexion: 'Fair',
      physicalDisability: false,
      bloodGroup: 'B+',
      motherTongue: 'Gujarati',
      languagesKnown: ['Gujarati', 'Hindi', 'English']
    },
    religiousDetails: {
      id: 'rd_3',
      profileId: 'user_3',
      religion: 'Hindu',
      caste: 'Patel',
      subCaste: 'Leva Patel',
      rashi: 'Virgo',
      star: 'Hasta',
      manglik: true
    },
    educationDetails: {
      id: 'ed_3',
      profileId: 'user_3',
      highestEducation: 'Bachelors',
      educationField: 'Fashion Design',
      institutionName: 'NIFT Delhi',
      additionalQualifications: 'Diploma in Textile Design'
    },
    professionalDetails: {
      id: 'prof_3',
      profileId: 'user_3',
      occupation: 'Fashion Designer',
      occupationDetail: 'Designer',
      organizationName: 'Fashion Studio',
      annualIncomeMin: 600000,
      annualIncomeMax: 800000,
      workingCity: 'Ahmedabad',
      workingState: 'Gujarat',
      workingCountry: 'India'
    },
    familyDetails: {
      id: 'fd_3',
      profileId: 'user_3',
      fatherName: 'Ashok Patel',
      fatherOccupation: 'Business',
      motherName: 'Hansa Patel',
      motherOccupation: 'Homemaker',
      brothers: 1,
      brothersMarried: 1,
      sisters: 0,
      sistersMarried: 0,
      familyType: 'Joint',
      familyStatus: 'Upper Middle Class',
      familyValues: 'Traditional',
      ancestralOrigin: 'Gujarat',
      currentResidenceCity: 'Ahmedabad',
      currentResidenceState: 'Gujarat',
      currentResidenceCountry: 'India'
    },
    lifestylePreferences: {
      id: 'lp_3',
      profileId: 'user_3',
      diet: 'Vegetarian',
      smoking: false,
      drinking: false,
      hobbies: ['Drawing', 'Shopping', 'Dancing', 'Cooking'],
      interests: ['Fashion', 'Art', 'Culture'],
      aboutMe: 'Creative fashion designer with traditional values. Love art and culture. Looking for a supportive life partner.',
      partnerExpectations: 'Looking for someone from similar community who values family and traditions. Should be well-settled and respectful.'
    },
    photos: [
      {
        id: 'photo_3_1',
        profileId: 'user_3',
        photoUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
        isPrimary: true,
        displayOrder: 1,
        status: 'approved',
        uploadedAt: '2024-02-01T10:00:00Z',
        approvedAt: '2024-02-01T11:00:00Z'
      }
    ],
    subscription: {
      id: 'sub_3',
      profileId: 'user_3',
      planId: 'plan_free',
      tier: 'free',
      startDate: '2024-02-01T00:00:00Z',
      endDate: '2099-12-31T23:59:59Z',
      isActive: true,
      autoRenew: false,
      contactRevealsUsed: 0,
      contactRevealsLimit: 0
    },
    privacySettings: {
      id: 'priv_3',
      profileId: 'user_3',
      hideProfile: false,
      hidePhotosUntilInterest: true,
      hideContactInfo: true,
      showHoroscope: true,
      showLastActive: true,
      allowMessagesFrom: 'premium_only'
    }
  }
];

export const initializeMockData = () => {
  if (!localStorage.getItem('users')) {
    const users = mockProfiles.map(profile => ({
      ...profile,
      password: 'password123'
    }));
    localStorage.setItem('users', JSON.stringify(users));
  }

  if (!localStorage.getItem('profiles')) {
    localStorage.setItem('profiles', JSON.stringify(mockProfiles));
  }

  if (!localStorage.getItem('membershipPlans')) {
    localStorage.setItem('membershipPlans', JSON.stringify(membershipPlans));
  }
};