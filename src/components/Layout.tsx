import React from 'react';
import { Heart, Menu, X, User, Search, MessageCircle, Settings, LogOut, Shield, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const { isAuthenticated, currentUser, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    onNavigate('login');
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'landing')}
            >
              <Heart className="h-8 w-8 text-rose-600 fill-rose-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                AristoMatch
              </span>
            </div>

            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-6">
                  {/* <button
                    onClick={() => onNavigate('dashboard')}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                      currentPage === 'dashboard'
                        ? 'bg-rose-100 text-rose-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                    <span>Matches</span>
                  </button> */}
                  <button
                    onClick={() => onNavigate('dashboard')} // ✅ Change from 'dashboard' to 'matches'
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${currentPage === 'matches' // ✅ Change from 'dashboard' to 'matches'
                        ? 'bg-rose-100 text-rose-700'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </button>



                  <button
                    onClick={() => onNavigate('search')}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${currentPage === 'search'
                        ? 'bg-rose-100 text-rose-700'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </button>

                  <button
                    onClick={() => onNavigate('requests')}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${currentPage === 'requests'
                        ? 'bg-rose-100 text-rose-700'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Heart className="h-4 w-4" />
                    <span>Requests</span>
                  </button>

                  <button
                    onClick={() => onNavigate('messages')}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${currentPage === 'messages'
                        ? 'bg-rose-100 text-rose-700'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Messages</span>
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => onNavigate('admin')}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${currentPage === 'admin'
                          ? 'bg-rose-100 text-rose-700'
                          : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <Shield className="h-4 w-4" />
                      <span>Admin</span>
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate('my-profile')}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${currentPage === 'my-profile'
                        ? 'bg-rose-100 text-rose-700'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <User className="h-4 w-4" />
                    <span>{currentUser?.fullName?.split(' ')[0]}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>

                <button
                  className="md:hidden p-2"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 text-gray-700 hover:text-rose-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-6 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Register Free
                </button>
              </div>
            )}
          </div>

          {mobileMenuOpen && isAuthenticated && (
            <div className="md:hidden py-4 space-y-2 border-t">
              <button
                onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Matches
              </button>
              <button
                onClick={() => { onNavigate('search'); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Search
              </button>
              <button
                onClick={() => { onNavigate('messages'); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Messages
              </button>
              {isAdmin && (
                <button
                  onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                >
                  Admin Panel
                </button>
              )}
              <button
                onClick={() => { onNavigate('my-profile'); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-rose-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 fill-rose-600 text-rose-600" />
                <span className="text-xl font-bold">AristoMatch</span>
              </div>
              <p className="text-gray-400 text-sm">
                India's trusted matrimonial platform connecting hearts and families.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Safety Tips</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 AristoMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};