import React, { useState } from 'react';

interface HelpCategory {
  id: string;
  title: string;
  icon: JSX.Element;
  articles: HelpArticle[];
}

interface HelpArticle {
  id: string;
  title: string;
  preview: string;
  content: string;
}

interface HelpCenterProps {
  onNavigate?: () => void;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('getting-started');
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleHelpfulFeedback = () => {
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
    }, 3000);
  };

  const handleNeedMoreHelp = () => {
    window.location.href = 'mailto:rsaristomatch@gmail.com?subject=Help Request - ' + encodeURIComponent(selectedArticle?.title || 'Support Request');
  };

  const categories: HelpCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      articles: [
        {
          id: '1',
          title: 'How RSAristoMatch Works',
          preview: 'Understanding our matrimonial matchmaking platform',
          content: 'RSAristoMatch serves as a matrimonial matchmaking platform for introductions between registered members. We are not a marriage bureau or agency, and do not guarantee marriage, compatibility, or accuracy of user information. Our platform facilitates connections between individuals and families seeking suitable life partners. You are solely responsible for verifying the authenticity, background, and intentions of other members before proceeding with any communication or alliance.'
        },
        {
          id: '2',
          title: 'Creating Your Profile',
          preview: 'Register and set up your matrimonial profile',
          content: 'To register on RSAristoMatch, you must provide true, complete, and accurate information. Users must be legally eligible for marriage as per Indian law - 21 years for males and 18 years for females. Any false, misleading, or inappropriate content may result in suspension or permanent removal of your profile. Complete your profile with honest details about yourself, your family background, profession, and preferences to find the most suitable matches.'
        },
        {
          id: '3',
          title: 'User Responsibilities and Obligations',
          preview: 'What you need to know as a member',
          content: 'As a member of RSAristoMatch, you must provide accurate information during registration. The platform must not be used for commercial activities, harassment, or unlawful purposes. You are responsible for independently verifying details such as profession, income, family background, and character of other members before finalizing any relationship. Always exercise due diligence when interacting with potential matches.'
        }
      ]
    },
    {
      id: 'verification-safety',
      title: 'Verification & Safety',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      articles: [
        {
          id: '4',
          title: 'Profile Verification Process',
          preview: 'How we ensure profile genuineness',
          content: 'While reasonable efforts are made to ensure the genuineness of profiles, RSAristoMatch does not conduct background checks or verify user-provided information. It is your sole responsibility and that of your family to independently verify details such as profession, income, family background, and character before finalizing any relationship. We recommend meeting in safe public places and involving your family in the verification process.'
        },
        {
          id: '5',
          title: 'Safety Guidelines for Members',
          preview: 'Stay safe while using our platform',
          content: 'Your safety is paramount. Always verify information independently before sharing personal details or meeting in person. Never share financial information or send money to other members. Meet in public places with family members present. Report any suspicious behavior or profiles immediately. Remember, RSAristoMatch facilitates introductions only - thorough verification is your responsibility.'
        },
        {
          id: '6',
          title: 'Reporting Suspicious Activity',
          preview: 'How to report concerns or fraudulent profiles',
          content: 'If you encounter any suspicious activity, fraudulent profiles, harassment, or inappropriate behavior, please report it immediately to our Grievance Officer. We take all reports seriously and will investigate promptly. However, please note that the website shall not be held responsible for any fraud, misrepresentation, or disputes between members. User vigilance is essential.'
        }
      ]
    },
    {
      id: 'privacy-data',
      title: 'Privacy & Data Protection',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      articles: [
        {
          id: '7',
          title: 'How We Protect Your Privacy',
          preview: 'Your data security and privacy matters',
          content: 'All personal information provided by users is kept confidential and used only for matrimonial matchmaking purposes. Your data will not be disclosed to any third party without your consent, except as required by law. We adhere to the provisions of the Information Technology Act, 2000, and relevant Data Protection guidelines applicable in India. You have the right to edit, update, or delete your data at any time through your account settings.'
        },
        {
          id: '8',
          title: 'Managing Your Personal Information',
          preview: 'Control what information you share',
          content: 'You have complete control over your personal information on RSAristoMatch. You can edit, update, or delete your data at any time through your profile settings. Choose what information is visible to other members based on your privacy preferences. We recommend sharing detailed information only after initial verification and communication with potential matches.'
        },
        {
          id: '9',
          title: 'Data Protection Compliance',
          preview: 'Our commitment to legal compliance',
          content: 'RSAristoMatch strictly adheres to the Information Technology Act, 2000, and all relevant Data Protection guidelines applicable in India. We implement industry-standard security measures to protect your personal information. Your data is stored securely and accessed only for legitimate matrimonial matchmaking purposes. We comply with all legal requirements regarding data handling and user privacy.'
        }
      ]
    },
    {
      id: 'payment-billing',
      title: 'Payment & Billing',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      articles: [
        {
          id: '10',
          title: 'Subscription Plans and Fees',
          preview: 'Understanding our premium services',
          content: 'RSAristoMatch offers premium membership plans with enhanced features to help you find your perfect match faster. Subscription fees and plans are subject to change without prior notice. Please review current pricing on our website before subscribing. Premium features may include unlimited profile views, enhanced search filters, priority customer support, and direct contact information access.'
        },
        {
          id: '11',
          title: 'Payment Methods and Security',
          preview: 'Safe and secure payment options',
          content: 'We accept payments through secure payment gateways. All transactions are encrypted and processed securely. Please note that RSAristoMatch is not responsible for payment gateway errors, delays, or transaction failures. In case of payment issues, please contact your payment provider or our support team with transaction details for assistance.'
        },
        {
          id: '12',
          title: 'Refund Policy',
          preview: 'Understanding our refund terms',
          content: 'Fees once paid are non-refundable, except in the case of verified technical errors during payment. If you believe a technical error occurred during your transaction, please contact our support team immediately with proof of payment and error details. All refund requests will be reviewed on a case-by-case basis. Subscription cancellations do not entitle users to refunds for unused periods.'
        }
      ]
    },
    {
      id: 'legal-terms',
      title: 'Legal & Terms',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      articles: [
        {
          id: '13',
          title: 'Terms of Use',
          preview: 'Your agreement to use RSAristoMatch',
          content: 'By accessing or using RSAristoMatch, you agree to comply with and be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any part of these terms, please refrain from using this site. By registering or using this website, you confirm that you have read, understood, and agreed to all terms, conditions, and disclaimers. The platform serves as an introduction service only and does not guarantee any outcomes.'
        },
        {
          id: '14',
          title: 'Limitation of Liability',
          preview: 'Understanding platform limitations',
          content: 'RSAristoMatch and its management shall not be liable for any loss, damage, or inconvenience resulting from use of the platform. All interactions, communications, and alliances formed through this site are at your sole risk and discretion. The website shall not be held responsible for any fraud, misrepresentation, or disputes between members. Users agree to indemnify and hold harmless the website, its owners, employees, and representatives from any claims arising from their use of the site.'
        },
        {
          id: '15',
          title: 'Intellectual Property Rights',
          preview: 'Protecting our platform content',
          content: 'All content, text, graphics, designs, software, and logos displayed on RSAristoMatch are the exclusive intellectual property of the site owners. Any reproduction, copying, or redistribution without prior written consent is strictly prohibited. This includes but is not limited to profile templates, design elements, algorithms, and proprietary features of the platform.'
        },
        {
          id: '16',
          title: 'Jurisdiction and Dispute Resolution',
          preview: 'Legal jurisdiction for disputes',
          content: 'All disputes or claims related to the use of RSAristoMatch shall be subject to the exclusive jurisdiction of the courts located in Bathinda, Punjab, India. Any legal proceedings must be initiated in accordance with Indian law. We encourage members to resolve disputes amicably before pursuing legal action.'
        }
      ]
    },
    {
      id: 'support',
      title: 'Support & Contact',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      articles: [
        {
          id: '17',
          title: 'Grievance Redressal',
          preview: 'How to raise concerns or complaints',
          content: 'In accordance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, RSAristoMatch has appointed a Grievance Officer to address user concerns. For any grievances, complaints, or concerns, please contact: Grievance Officer: Prof. R.S. Singla, Email: rsaristomatch@gmail.com, Location: Bathinda, Punjab, India. We are committed to addressing your concerns promptly and fairly.'
        },
        {
          id: '18',
          title: 'Contacting Customer Support',
          preview: 'Get help with your account or queries',
          content: 'Our customer support team is here to help you with any questions or issues. You can reach us at rsaristomatch@gmail.com. Please provide detailed information about your query including your registered email ID (without sharing passwords) so we can assist you effectively. We strive to respond to all inquiries within 24-48 hours during business days.'
        },
        {
          id: '19',
          title: 'Frequently Asked Questions',
          preview: 'Quick answers to common questions',
          content: 'Before contacting support, please check if your question is answered in our FAQ section. Common topics include account registration, profile verification, subscription management, privacy settings, and match preferences. If you cannot find the answer you are looking for, please do not hesitate to contact our support team or Grievance Officer.'
        }
      ]
    }
  ];

  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  
  const filteredArticles = currentCategory?.articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Help Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers about our matrimonial platform, policies, and guidelines. Learn how to use RSAristoMatch safely and effectively.
          </p>
        </div>

        {/* Important Disclaimer Banner */}
        <div className="max-w-4xl mx-auto mb-8 bg-rose-50 border-l-4 border-rose-600 p-4 rounded-r-lg">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-rose-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-rose-900 mb-1">Important Notice</p>
              <p className="text-sm text-rose-800">
                RSAristoMatch is a matrimonial introduction platform only. Users are advised to verify details independently before proceeding. The website and its management are not responsible for any personal, financial, or social consequences arising from member interactions.
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full px-6 py-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSelectedArticle(null);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={selectedCategory === category.id ? 'text-white' : 'text-rose-600'}>
                      {category.icon}
                    </span>
                    <span className="font-medium text-sm">{category.title}</span>
                  </button>
                ))}
              </nav>

              {/* Contact Info Card */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Need More Help?</h3>
                <p className="text-xs text-gray-600 mb-3">Contact our Grievance Officer</p>
                <div className="space-y-2 text-xs text-gray-700">
                  <p className="font-medium">Prof. R.S. Singla</p>
                  <p className="break-words">rsaristomatch@gmail.com</p>
                  <p>Bathinda, Punjab, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Articles Content */}
          <div className="lg:col-span-3">
            {selectedArticle ? (
              <div className="bg-white rounded-lg shadow-md p-8">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center text-rose-600 hover:text-pink-600 mb-6 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to articles
                </button>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedArticle.title}
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                    {selectedArticle.content}
                  </p>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200">
                  {feedbackSubmitted ? (
                    <div className="flex items-center text-green-600 bg-green-50 px-4 py-3 rounded-lg">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Thank you for your feedback!
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-600 mb-4">Was this article helpful?</p>
                      <div className="flex space-x-4">
                        <button 
                          onClick={handleHelpfulFeedback}
                          className="px-6 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg hover:from-rose-700 hover:to-pink-700 transition-all"
                        >
                          Yes, helpful
                        </button>
                        <button 
                          onClick={handleNeedMoreHelp}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                        >
                          Need more help
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredArticles && filteredArticles.length > 0 ? (
                  <>
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {currentCategory?.title}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} in this category
                      </p>
                    </div>
                    {filteredArticles.map((article) => (
                      <div
                        key={article.id}
                        onClick={() => setSelectedArticle(article)}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-rose-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{article.preview}</p>
                        <div className="flex items-center text-rose-600 font-medium text-sm">
                          Read more
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-600 text-lg">No articles found matching your search</p>
                    <p className="text-gray-500 text-sm mt-2">Try different keywords or browse categories</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;