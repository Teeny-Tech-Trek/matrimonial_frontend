import React, { useState } from 'react';

interface PolicySection {
  id: string;
  title: string;
  content: string[];
}

interface PrivacyPolicyProps {
  onNavigate?: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('introduction');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Create a printable version
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const fullContent = sections.map(section => `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #111827; font-size: 24px; font-weight: bold; margin-bottom: 16px;">
            ${section.title}
          </h2>
          ${section.content.map(para => `
            <p style="color: #374151; line-height: 1.75; margin-bottom: 16px;">
              ${para}
            </p>
          `).join('')}
        </div>
      `).join('');

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>RSAristoMatch - Privacy Policy</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 40px;
                max-width: 800px;
                margin: 0 auto;
              }
              h1 {
                color: #111827;
                font-size: 32px;
                margin-bottom: 20px;
                text-align: center;
              }
              .subtitle {
                color: #6B7280;
                text-align: center;
                margin-bottom: 40px;
              }
              @media print {
                body { padding: 20px; }
              }
            </style>
          </head>
          <body>
            <h1>Privacy Policy</h1>
            <p class="subtitle">RSAristoMatch - www.rsaristomatch.com</p>
            ${fullContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      
      // Trigger print dialog which allows "Save as PDF"
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const sections: PolicySection[] = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: [
        'At RSAristoMatch, we are committed to protecting your privacy and personal information.',
        'This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our matrimonial matchmaking platform.',
        'By using www.rsaristomatch.com, you consent to the data practices described in this policy.',
        'Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not use our platform.'
      ]
    },
    {
      id: 'information-collection',
      title: 'Information We Collect',
      content: [
        'We collect personal information that you provide directly to us during registration and profile creation.',
        'This may include your name, age, gender, contact details, family background, educational qualifications, profession, income details, and other matrimonial preferences.',
        'Users must provide true, complete, and accurate information while registering on the platform.',
        'Profile photographs and other documents you choose to upload are also collected and stored.',
        'We may collect technical information such as IP address, browser type, and device information for security and analytics purposes.'
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      content: [
        'All personal information provided by users will be kept confidential and used only for matrimonial matchmaking purposes.',
        'Your information is used to facilitate introductions between registered members seeking suitable life partners.',
        'We use your data to maintain and improve our services, provide customer support, and enhance user experience.',
        'Your profile information is displayed to other registered members based on compatibility and preferences.',
        'We may use your information to send important notifications, updates, and relevant communication about potential matches.'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      content: [
        'Data will not be disclosed to any third party without user consent, except as required by law.',
        'Your profile information is visible to other registered members of the platform for matrimonial purposes.',
        'We do not sell, trade, or rent your personal information to third parties for commercial purposes.',
        'We may share information with service providers who assist in operating our platform, subject to confidentiality agreements.',
        'We may disclose information when required to comply with legal obligations or respond to lawful requests from authorities.'
      ]
    },
    {
      id: 'data-protection',
      title: 'Data Protection and Security',
      content: [
        'We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure.',
        'The website adheres to the provisions of the Information Technology Act, 2000, and relevant Data Protection guidelines applicable in India.',
        'While we strive to protect your information, no method of transmission over the internet is 100% secure.',
        'You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.',
        'We regularly review and update our security practices to ensure the safety of user data.'
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Privacy Rights',
      content: [
        'Users have the right to edit, update, or delete their data at any time through their account settings.',
        'You can control what information is visible on your profile and to whom.',
        'You may request access to the personal information we hold about you.',
        'You have the right to withdraw consent for data processing, subject to our legal obligations.',
        'You can request deletion of your account and associated data, though some information may be retained for legal or administrative purposes.'
      ]
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      content: [
        'We retain your personal information for as long as your account is active or as needed to provide you services.',
        'If you delete your account, your profile information will be removed from public view.',
        'Some data may be retained for legal, regulatory, or legitimate business purposes even after account deletion.',
        'Inactive accounts may be archived or deleted after a reasonable period of inactivity.'
      ]
    },
    {
      id: 'children-privacy',
      title: 'Age Eligibility',
      content: [
        'Users must be legally eligible for marriage as per Indian law to use this platform.',
        'The minimum age requirement is 21 years for males and 18 years for females.',
        'We do not knowingly collect information from individuals who do not meet these age requirements.',
        'If we become aware that a user does not meet the eligibility criteria, we will take appropriate action including account termination.'
      ]
    },
    {
      id: 'compliance',
      title: 'Legal Compliance',
      content: [
        'RSAristoMatch complies with the Information Technology Act, 2000, and all applicable data protection regulations in India.',
        'We comply with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.',
        'Our practices are designed to protect user privacy while meeting legal and regulatory requirements.',
        'We cooperate with law enforcement and regulatory authorities when legally required.'
      ]
    },
    {
      id: 'updates',
      title: 'Updates to Privacy Policy',
      content: [
        'We reserve the right to update or modify this Privacy Policy at any time.',
        'Changes will be posted on this page with an updated revision date.',
        'Continued use of the platform after changes constitutes acceptance of the updated policy.',
        'We encourage users to review this Privacy Policy periodically to stay informed about how we protect your information.'
      ]
    },
    {
      id: 'contact',
      title: 'Contact Information',
      content: [
        'For any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:',
        'Grievance Officer: Prof. R.S. Singla',
        'Email: rsaristomatch@gmail.com',
        'Location: Bathinda, Punjab, India',
        'We are committed to addressing your privacy concerns promptly and effectively.'
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
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your privacy and data protection are important to us
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">We Respect Your Privacy</h3>
                <p className="text-blue-800 text-sm">
                  Your personal information is confidential and used only for matrimonial matchmaking purposes. We comply with the Information Technology Act, 2000, and applicable data protection guidelines in India.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sections</h2>
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
                  Need a copy of our Privacy Policy?
                </p>
                <div className="flex space-x-4">
                  <button 
                    onClick={handlePrint}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <span>Print</span>
                  </button>
                  <button 
                    onClick={handleDownloadPDF}
                    className="px-6 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg hover:from-rose-700 hover:to-pink-700 transition-all flex items-center space-x-2">
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

export default PrivacyPolicy;