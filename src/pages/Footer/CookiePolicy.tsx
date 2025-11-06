import React, { useState } from 'react';

interface CookieCategory {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  required: boolean;
  cookies: CookieDetail[];
}

interface CookieDetail {
  name: string;
  purpose: string;
  duration: string;
}

interface CookiePolicyProps {
  onNavigate?: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ onNavigate }) => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    advertising: false
  });

  const [showBanner, setShowBanner] = useState(true);

  const cookieCategories: CookieCategory[] = [
    {
      id: 'necessary',
      title: 'Strictly Necessary Cookies',
      description: 'These cookies are essential for RSAristoMatch to function properly. They enable core functionality such as secure login, session management, and account security. You cannot opt-out of these cookies as they are required for the platform to work.',
      required: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      cookies: [
        {
          name: 'session_id',
          purpose: 'Maintains your login session and keeps you authenticated while browsing profiles',
          duration: 'Session (deleted when you close your browser)'
        },
        {
          name: 'csrf_token',
          purpose: 'Protects your account from security threats and unauthorized access',
          duration: 'Session'
        },
        {
          name: 'cookie_consent',
          purpose: 'Remembers your cookie preferences on RSAristoMatch',
          duration: '1 year'
        },
        {
          name: 'user_auth',
          purpose: 'Verifies your identity and maintains account security',
          duration: '30 days'
        }
      ]
    },
    {
      id: 'functional',
      title: 'Functional Cookies',
      description: 'These cookies enhance your experience on RSAristoMatch by remembering your preferences, search filters, and customization settings. They help us provide personalized matchmaking services.',
      required: false,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      cookies: [
        {
          name: 'match_preferences',
          purpose: 'Stores your partner preferences and search criteria for better matchmaking',
          duration: '6 months'
        },
        {
          name: 'profile_views',
          purpose: 'Keeps track of profiles you have viewed to avoid repetition',
          duration: '60 days'
        },
        {
          name: 'language_pref',
          purpose: 'Remembers your language preference for the platform interface',
          duration: '1 year'
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      description: 'These cookies help us understand how users interact with RSAristoMatch. We use this information to improve our matchmaking algorithms, enhance user experience, and develop better features for finding suitable life partners.',
      required: false,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      cookies: [
        {
          name: '_ga',
          purpose: 'Helps us analyze platform usage patterns and improve matchmaking features',
          duration: '2 years'
        },
        {
          name: '_gid',
          purpose: 'Distinguishes unique users to understand platform engagement',
          duration: '24 hours'
        },
        {
          name: 'analytics_id',
          purpose: 'Tracks user journey to optimize the matrimonial search experience',
          duration: '1 year'
        }
      ]
    },
    {
      id: 'advertising',
      title: 'Marketing Cookies',
      description: 'These cookies may be used to show you relevant information about our premium services and features that could enhance your matchmaking experience. They do not share your personal profile information.',
      required: false,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      cookies: [
        {
          name: 'premium_info',
          purpose: 'Shows relevant information about premium membership benefits',
          duration: '90 days'
        },
        {
          name: 'feature_promo',
          purpose: 'Displays information about new features that might interest you',
          duration: '30 days'
        }
      ]
    }
  ];

  const handleToggle = (category: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category as keyof typeof preferences]
    }));
  };

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      functional: true,
      analytics: true,
      advertising: true
    });
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    setPreferences({
      necessary: true,
      functional: false,
      analytics: false,
      advertising: false
    });
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    setShowBanner(false);
    console.log('Saving preferences:', preferences);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Understanding how RSAristoMatch uses cookies to enhance your matrimonial search experience
          </p>
        </div>

        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies are small text files that are placed on your device when you visit RSAristoMatch. They help us provide you with a better, faster, and safer matrimonial matchmaking experience.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies to remember your preferences, keep you logged in securely, understand how you use our platform, and show you relevant matches and features. This Cookie Policy explains what cookies we use and why.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By continuing to use RSAristoMatch, you consent to our use of cookies as described in this policy. You can manage your cookie preferences at any time using the controls below.
            </p>
          </div>
        </div>

        {/* Cookie Categories */}
        <div className="max-w-4xl mx-auto space-y-6 mb-12">
          {cookieCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-rose-600 to-pink-600 rounded-lg flex items-center justify-center text-white">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                  </div>
                </div>
                <div className="ml-4">
                  {category.required ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                      Always Active
                    </span>
                  ) : (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences[category.id as keyof typeof preferences]}
                        onChange={() => handleToggle(category.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-rose-600 peer-checked:to-pink-600"></div>
                    </label>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Cookies in this category:</h4>
                <div className="space-y-3">
                  {category.cookies.map((cookie, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-mono text-sm text-rose-600">{cookie.name}</span>
                        <span className="text-xs text-gray-500">{cookie.duration}</span>
                      </div>
                      <p className="text-sm text-gray-600">{cookie.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Managing Cookies */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can manage your cookie preferences at any time using the toggles above. Your choices will be saved and applied to your experience on RSAristoMatch.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Most web browsers allow you to control cookies through their settings. However, if you disable necessary cookies, you may not be able to use certain features of our matrimonial platform, including profile viewing and messaging.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              This Cookie Policy is part of our broader commitment to privacy as outlined in our Privacy Policy, which complies with the Information Technology Act, 2000, and applicable data protection guidelines in India.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleSavePreferences}
                className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg hover:from-rose-700 hover:to-pink-700 transition-all font-medium"
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Accept All Cookies
              </button>
              <button
                onClick={handleAcceptNecessary}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Accept Only Necessary
              </button>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Cookies?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Grievance Officer:</span> Prof. R.S. Singla</p>
              <p><span className="font-medium">Email:</span> info@rsaristomatch.com</p>
              <p><span className="font-medium">Location:</span> Bathinda, Punjab, India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Consent Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">We Value Your Privacy</h3>
                <p className="text-sm text-gray-600">
                  RSAristoMatch uses cookies to enhance your matrimonial search experience and keep your account secure. By clicking "Accept All", you consent to our use of cookies as described in our Cookie Policy.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAcceptNecessary}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Necessary Only
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg hover:from-rose-700 hover:to-pink-700 transition-all whitespace-nowrap"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookiePolicy;