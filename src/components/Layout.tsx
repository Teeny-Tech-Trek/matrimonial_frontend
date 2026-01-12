import React from 'react';
import { Heart, Menu, X, User, Search, MessageCircle, LogOut, Shield, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoImgWithName from "../Images/ChatGPT Image Dec 28, 2025, 10_58_32 PM.png"
import logoImg from "../Images/ChatGPT Image Dec 28, 2025, 03_31_49 PM.png"

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const { isAuthenticated, currentUser, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Check if current page is messages
  const isMessagesPage = currentPage === 'messages';

  const handleLogout = () => {
    logout();
    onNavigate('login');
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <nav className="bg-rose-50 shadow-md sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-18 lg:h-20">
            <div
              className="flex items-center space-x-1.5 sm:space-x-2 cursor-pointer flex-shrink-0"
              onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'landing')}
            >
              <img 
                src={logoImgWithName} 
                alt='AristoMatch Logo' 
                className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 object-contain"
              />
            </div>

            {isAuthenticated ? (
              <>
                <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 2xl:space-x-6">
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className={`flex items-center space-x-1.5 px-3 py-2 xl:px-4 xl:py-2.5 rounded-lg transition-colors text-sm xl:text-base ${
                      currentPage === 'matches'
                        ? 'bg-rose-100 text-rose-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Home className="h-4 w-4 xl:h-5 xl:w-5" />
                    <span>Dashboard</span>
                  </button>

                  <button
                    onClick={() => onNavigate('search')}
                    className={`flex items-center space-x-1.5 px-3 py-2 xl:px-4 xl:py-2.5 rounded-lg transition-colors text-sm xl:text-base ${
                      currentPage === 'search'
                        ? 'bg-rose-100 text-rose-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Search className="h-4 w-4 xl:h-5 xl:w-5" />
                    <span>Search</span>
                  </button>

                  <button
                    onClick={() => onNavigate('requests')}
                    className={`flex items-center space-x-1.5 px-3 py-2 xl:px-4 xl:py-2.5 rounded-lg transition-colors text-sm xl:text-base ${
                      currentPage === 'requests'
                        ? 'bg-rose-100 text-rose-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className="h-4 w-4 xl:h-5 xl:w-5" />
                    <span>Requests</span>
                  </button>

                  <button
                    onClick={() => onNavigate('messages')}
                    className={`flex items-center space-x-1.5 px-3 py-2 xl:px-4 xl:py-2.5 rounded-lg transition-colors text-sm xl:text-base ${
                      currentPage === 'messages'
                        ? 'bg-rose-100 text-rose-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <MessageCircle className="h-4 w-4 xl:h-5 xl:w-5" />
                    <span>Messages</span>
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => onNavigate('admin')}
                      className={`flex items-center space-x-1.5 px-3 py-2 xl:px-4 xl:py-2.5 rounded-lg transition-colors text-sm xl:text-base ${
                        currentPage === 'admin'
                          ? 'bg-rose-100 text-rose-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Shield className="h-4 w-4 xl:h-5 xl:w-5" />
                      <span>Admin</span>
                    </button>
                  )}

                  <button
                    onClick={() => onNavigate('my-profile')}
                    className={`flex items-center space-x-1.5 px-3 py-2 xl:px-4 xl:py-2.5 rounded-lg transition-colors text-sm xl:text-base ${
                      currentPage === 'my-profile'
                        ? 'bg-rose-100 text-rose-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User className="h-4 w-4 xl:h-5 xl:w-5" />
                    <span className="max-w-[100px] xl:max-w-[150px] truncate">
                      {currentUser?.fullName?.split(' ')[0]}
                    </span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1.5 px-3 py-2 xl:px-4 xl:py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm xl:text-base"
                  >
                    <LogOut className="h-4 w-4 xl:h-5 xl:w-5" />
                    <span>Logout</span>
                  </button>
                </div>

                <button
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>
              </>
            ) : (
              <div className="hidden sm:flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm md:text-base text-gray-700 hover:text-rose-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2 text-sm md:text-base bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all whitespace-nowrap"
                >
                  Register Free
                </button>
              </div>
            )}
          </div>

          {mobileMenuOpen && isAuthenticated && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <div className="fixed top-0 right-0 w-72 sm:w-80 bg-white shadow-2xl z-50 lg:hidden rounded-l-2xl max-h-screen overflow-y-auto">
                <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-6 w-6 text-rose-600 fill-rose-600" />
                    <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                      Menu
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-4 space-y-1 pb-6">
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-base transition-colors ${
                      currentPage === 'dashboard'
                        ? 'bg-rose-100 text-rose-700 font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('search');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-base transition-colors ${
                      currentPage === 'search'
                        ? 'bg-rose-100 text-rose-700 font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Search
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('requests');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-base transition-colors ${
                      currentPage === 'requests'
                        ? 'bg-rose-100 text-rose-700 font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Requests
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('messages');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-base transition-colors ${
                      currentPage === 'messages'
                        ? 'bg-rose-100 text-rose-700 font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Messages
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        onNavigate('admin');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-base transition-colors ${
                        currentPage === 'admin'
                          ? 'bg-rose-100 text-rose-700 font-medium'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      Admin Panel
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onNavigate('my-profile');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-base transition-colors ${
                      currentPage === 'my-profile'
                        ? 'bg-rose-100 text-rose-700 font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    My Profile
                  </button>

                  <div className="pt-4 border-t mt-4">
                    <button
                      onClick={handleLogout}
                      className="w-full text-center px-4 py-3 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-base font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Main content - no padding when on messages page */}
      <main className={`max-w-[1920px] mx-auto ${isMessagesPage ? '' : ''}`}>
        {children}
      </main>

      {/* Footer - hidden on messages page */}
      {!isMessagesPage && (
        <footer className="bg-[#590d22] text-white   relative">
          <div className="max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-10 md:py-12 lg:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
              <div>
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <img src={logoImgWithName} alt="AristoMatch-logo" className='h-40 object-contain absolute left-4 top-4' />
                </div>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-16">
                  India's trusted matrimonial platform connecting hearts and families.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
                <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                  <li>
                    <a href="/about" className="hover:text-white transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-white transition-colors">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h3>
                <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                  <li>
                    <a href="/help-center" className="hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="/safety-tips" className="hover:text-white transition-colors">
                      Safety Tips
                    </a>
                  </li>
                  <li>
                    <a href="/faq" className="hover:text-white transition-colors">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h3>
                <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                  <li>
                    <a href="/privacy-policy" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms-of-service" className="hover:text-white transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="/cookie-policy" className="hover:text-white transition-colors">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-6 sm:mt-8 md:mt-10 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
              <p>&copy; 2025 AristoMatch. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};