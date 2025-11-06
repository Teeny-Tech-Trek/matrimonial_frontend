import React from 'react';

interface SafetyTip {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  tips: string[];
}

interface SafetyTipsProps {
  onNavigate?: () => void;
}

const SafetyTips: React.FC<SafetyTipsProps> = ({ onNavigate }) => {
  const safetyCategories: SafetyTip[] = [
    {
      id: '1',
      title: 'Profile Verification',
      description: 'Verify authenticity before proceeding',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      tips: [
        'Always verify profile details independently before proceeding with any alliance',
        'RSAristoMatch does not conduct background checks - verification is your responsibility',
        'Independently verify profession, income, family background, and character',
        'Meet potential matches in safe public places with family members present',
        'Take time to thoroughly verify all information shared by other members',
        'Trust your instincts - if something seems inconsistent, investigate further'
      ]
    },
    {
      id: '2',
      title: 'Personal Information Safety',
      description: 'Protect your privacy and personal data',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      tips: [
        'Provide only true, complete, and accurate information in your profile',
        'Do not share sensitive information like bank details or passwords',
        'Share contact details only after initial verification and family approval',
        'Be cautious about sharing your home address in early conversations',
        'Your data is confidential and used only for matrimonial purposes',
        'You can edit, update, or delete your data at any time'
      ]
    },
    {
      id: '3',
      title: 'Communication Guidelines',
      description: 'Safe practices for interacting with matches',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      tips: [
        'Keep conversations respectful and appropriate at all times',
        'Involve your family in communication and decision-making process',
        'Do not use the platform for commercial activities or harassment',
        'Report any inappropriate behavior or suspicious profiles immediately',
        'All interactions are at your own risk and discretion',
        'Do not engage with profiles that seem misleading or suspicious'
      ]
    },
    {
      id: '4',
      title: 'Financial Safety',
      description: 'Protect yourself from financial fraud',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      tips: [
        'Never send money to someone you have not met and verified in person',
        'Be extremely cautious of any financial requests from other members',
        'Verify financial claims and background through proper channels',
        'RSAristoMatch is not responsible for any financial transactions between members',
        'Report any suspicious financial requests immediately',
        'Consult with family before making any financial commitments'
      ]
    },
    {
      id: '5',
      title: 'Account Security',
      description: 'Keep your account safe and secure',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      tips: [
        'Use a strong, unique password for your account',
        'Never share your password with anyone',
        'Log out when using shared or public devices',
        'You are responsible for all activities under your account',
        'Immediately notify us of any unauthorized account access',
        'False or misleading profiles may be suspended or removed'
      ]
    },
    {
      id: '6',
      title: 'Meeting Safety',
      description: 'Safe practices for in-person meetings',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      tips: [
        'Always meet in public places with family members present',
        'Inform family members about meeting details and location',
        'Conduct thorough background verification before meeting',
        'Take time to know the person and family through multiple interactions',
        'All alliances formed are at your sole risk and discretion',
        'Never rush into decisions - take adequate time for verification'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Safety Guidelines
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your safety is our priority. Follow these guidelines to ensure a secure and positive matrimonial experience on RSAristoMatch.
          </p>
        </div>

        {/* Important Notice */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-lg p-6 text-white">
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="font-semibold text-lg mb-2">Critical Reminder</h3>
                <p className="text-white/90 mb-3">
                  RSAristoMatch is a matrimonial introduction platform only. We do not conduct background checks or verify user-provided information. You are solely responsible for verifying the authenticity, background, and intentions of other members before proceeding with any alliance.
                </p>
                <p className="text-white/90">
                  The website and its management are not responsible for any fraud, misrepresentation, disputes, or consequences arising from member interactions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {safetyCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-rose-600 to-pink-600 rounded-lg flex items-center justify-center text-white">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {category.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Assistance?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-rose-600 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Report Suspicious Activity</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Encountered fraud, harassment, or suspicious behavior? Report it immediately to our Grievance Officer.
                </p>
                <a href="/contact">
                <button className="text-rose-600 hover:text-pink-600 font-medium text-sm flex items-center">
                  Report Now
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                </a>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:border-rose-600 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Verification Tips</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Learn best practices for verifying profiles and conducting background checks on potential matches.
                </p>
                {/* <button className="text-rose-600 hover:text-pink-600 font-medium text-sm flex items-center">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button> */}
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:border-rose-600 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Grievance Redressal</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Contact our appointed Grievance Officer for any concerns or complaints.
                </p>
                <div className="text-sm text-gray-700 space-y-1 mb-3">
                  <p className="font-medium">Prof. R.S. Singla</p>
                  <p>rsaristomatch@gmail.com</p>
                  <p>Bathinda, Punjab, India</p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:border-rose-600 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">User Responsibilities</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Understand your obligations as a member and ensure platform is used appropriately.
                </p>
                <a href="/terms-of-service">
                <button className="text-rose-600 hover:text-pink-600 font-medium text-sm flex items-center">
                  View Guidelines
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;