import React, { useState } from 'react';

interface TermsSection {
  id: string;
  title: string;
  content: string[];
}

interface TermsOfServiceProps {
  onNavigate?: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('introduction');

  const sections: TermsSection[] = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: [
        'Welcome to www.rsaristomatch.com, an online matrimonial platform developed to assist individuals and families in finding suitable life partners.',
        'By accessing or using this website, you agree to comply with and be bound by these Terms of Use and all applicable laws and regulations.',
        'If you do not agree with any part of these terms, please refrain from using this site.',
        'By registering or using this website, you confirm that you have read, understood, and agreed to all terms, conditions, and disclaimers stated herein.'
      ]
    },
    {
      id: 'nature-of-service',
      title: 'Nature of Service',
      content: [
        'www.rsaristomatch.com serves only as a matrimonial matchmaking platform for introductions between registered members.',
        'The website is not a marriage bureau or agency, and it does not guarantee marriage, compatibility, or accuracy of user information.',
        'Users are solely responsible for verifying the authenticity, background, and intentions of other members before proceeding with any communication or alliance.',
        'This platform facilitates connections only - all decisions and outcomes are the responsibility of the users.'
      ]
    },
    {
      id: 'user-obligations',
      title: 'User Obligations',
      content: [
        'Members must provide true, complete, and accurate information while registering.',
        'Any false, misleading, or inappropriate content may result in suspension or permanent removal of the profile.',
        'Users must be legally eligible for marriage as per Indian law: 21 years for males and 18 years for females.',
        'The platform must not be used for commercial activities, harassment, or unlawful purposes.',
        'Users agree to use the platform responsibly and in accordance with all applicable laws.'
      ]
    },
    {
      id: 'verification',
      title: 'Verification and Responsibility',
      content: [
        'While reasonable efforts are made to ensure the genuineness of profiles, www.rsaristomatch.com does not conduct background checks or verify user-provided information.',
        'It is the sole responsibility of users and their families to independently verify details such as profession, income, family background, and character before finalizing any relationship.',
        'Users should exercise due diligence and take necessary precautions when interacting with other members.',
        'The platform provides a space for introductions only - all verification and decision-making rests with the users.'
      ]
    },
    {
      id: 'limitation-of-liability',
      title: 'Limitation of Liability',
      content: [
        'www.rsaristomatch.com and its management shall not be liable for any loss, damage, or inconvenience resulting from use of the platform.',
        'All interactions, communications, and alliances formed through this site are at the sole risk and discretion of the users.',
        'The website shall not be held responsible for any fraud, misrepresentation, or disputes between members.',
        'Users acknowledge that they use the platform at their own risk and the website disclaims all liability for any consequences arising from such use.'
      ]
    },
    {
      id: 'indemnity',
      title: 'Indemnity',
      content: [
        'Users agree to indemnify and hold harmless the website, its owners, employees, and representatives from any claims, damages, or actions arising from their use or misuse of the site.',
        'This includes any claims arising from interactions with other members, content posted, or alliances formed through the platform.',
        'Users bear full responsibility for their actions on the platform and any consequences thereof.'
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      content: [
        'All content, text, graphics, designs, software, and logos displayed on www.rsaristomatch.com are the exclusive intellectual property of the site owners.',
        'Any reproduction, copying, or redistribution without prior written consent is strictly prohibited.',
        'Unauthorized use of the platform\'s intellectual property may result in legal action.'
      ]
    },
    {
      id: 'jurisdiction',
      title: 'Jurisdiction',
      content: [
        'All disputes or claims related to the use of www.rsaristomatch.com shall be subject to the exclusive jurisdiction of the courts located in Bathinda, Punjab, India.',
        'These Terms of Use shall be governed by and construed in accordance with the laws of India.',
        'By using this platform, you consent to the jurisdiction of courts in Bathinda, Punjab for resolution of any disputes.'
      ]
    },
    {
      id: 'grievance-redressal',
      title: 'Grievance Redressal',
      content: [
        'In accordance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the website has appointed a Grievance Officer to address user concerns.',
        'Grievance Officer: Prof. R.S. Singla',
        'Email: info@rsaristomatch.com',
        'Location: Bathinda, Punjab, India',
        'Users may contact the Grievance Officer for any complaints, concerns, or issues related to the platform.'
      ]
    },
    {
      id: 'modifications',
      title: 'Modifications to Terms',
      content: [
        'We reserve the right to update, change, or modify these Terms of Use at any time without prior notice.',
        'Continued use of the platform after any changes constitutes acceptance of the modified terms.',
        'Users are encouraged to review the Terms of Use periodically to stay informed of any updates.'
      ]
    },
    {
      id: 'account-termination',
      title: 'Account Suspension and Termination',
      content: [
        'The platform reserves the right to suspend or permanently remove any profile that violates these Terms of Use.',
        'Accounts may be terminated for providing false information, engaging in harassment, or misusing the platform.',
        'Users may delete their accounts at any time through their profile settings.',
        'Upon termination, users lose access to all platform features and their profile information may be removed.'
      ]
    },
    {
      id: 'disclaimer',
      title: 'General Disclaimer',
      content: [
        'www.rsaristomatch.com is a matrimonial introduction platform only.',
        'Users are advised to verify details independently before proceeding with any alliance.',
        'The website and its management are not responsible for any personal, financial, or social consequences arising from member interactions.',
        'Use of this platform is entirely at the user\'s own risk and discretion.'
      ]
    }
  ];

  const activeContent = sections.find(section => section.id === activeSection);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Use
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Please read these terms carefully before using RSAristoMatch
          </p>
        </div>

        {/* Important Notice */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-lg p-6 text-white">
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-lg mb-2">Legal Agreement</h3>
                <p className="text-white/90">
                  By using RSAristoMatch, you agree to be bound by these terms. This is a matrimonial introduction platform only - we do not guarantee marriage, compatibility, or accuracy of user information. All interactions are at your own risk.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contents</h2>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-8">
              {activeContent && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {activeContent.title}
                  </h2>
                  <div className="space-y-4">
                    {activeContent.content.map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex > 0) {
                      setActiveSection(sections[currentIndex - 1].id);
                    }
                  }}
                  disabled={sections.findIndex(s => s.id === activeSection) === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    sections.findIndex(s => s.id === activeSection) === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex < sections.length - 1) {
                      setActiveSection(sections[currentIndex + 1].id);
                    }
                  }}
                  disabled={sections.findIndex(s => s.id === activeSection) === sections.length - 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    sections.findIndex(s => s.id === activeSection) === sections.length - 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  <span>Next</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Download and Print Options */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <p className="text-gray-600">
                  Need a copy of our Terms of Use?
                </p>
                <div className="flex space-x-4">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <span>Print</span>
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg hover:from-rose-700 hover:to-pink-700 transition-all flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;