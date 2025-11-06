import React from 'react';
import { Heart, Users, Award, Sparkles, GraduationCap, Shield, Star, Zap, Crown } from 'lucide-react';

const AboutUs: React.FC = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-200/40 rounded-full blur-[128px] animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-[128px] animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-rose-200/40 rounded-full blur-[128px] animate-pulse-slow animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-pink-300/60 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-16 pb-24">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-100 to-rose-100 border-2 border-pink-300 px-5 py-2 rounded-full mb-6 animate-fade-in-up shadow-lg">
              <Star className="w-4 h-4 text-yellow-500 animate-spin-slow" />
              <span className="text-pink-700 font-bold text-sm">India's Premier Matrimonial Service</span>
              <Star className="w-4 h-4 text-yellow-500 animate-spin-slow" />
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-5 animate-fade-in-up animation-delay-200">
              <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent inline-block animate-gradient">
                R.S. ARISTOMATCH
              </span>
            </h1>

            {/* Subtitle with animated underline */}
            <div className="relative inline-block animate-fade-in-up animation-delay-400">
              <p className="text-lg md:text-xl text-gray-700 font-medium mb-3">
                A Team of Doctors, Professors, Retired Officers & Distinguished Businessmen
              </p>
              <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-shimmer"></div>
            </div>

            {/* Decorative elements */}
            <div className="flex items-center justify-center gap-4 mt-10 animate-fade-in-up animation-delay-600">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-500"></div>
              <Heart className="w-5 h-5 text-pink-600 animate-heartbeat" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-500"></div>
            </div>
          </div>
        </div>

        {/* Mission Statement - Open Design */}
        <div className="container mx-auto px-4 -mt-20 mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up animation-delay-800">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-7 h-7 text-yellow-500 animate-pulse" />
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
                  Guiding You Towards the Right Match
                </h2>
                <Sparkles className="w-7 h-7 text-yellow-500 animate-pulse" />
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 mx-auto rounded-full animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Services Section - Alternating Layout with Boxes */}
        <div className="container mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-pink-100 border-2 border-pink-300 px-4 py-2 rounded-full mb-3">
              <Zap className="w-4 h-4 text-pink-600" />
              <span className="text-pink-700 text-sm font-bold">OUR SERVICES</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Excellence in Every Step
            </h3>
            <p className="text-gray-600">Comprehensive support for your journey</p>
          </div>

          <div className="max-w-6xl mx-auto space-y-16">
            {/* Service 1 - Matrimonial Guidance (Left) */}
            <div className="group animate-fade-in-up animation-delay-1000">
              <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-xl shadow-pink-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Heart className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-3">
                    Matrimonial Guidance
                  </h4>
                  <div className="w-20 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mb-4 mx-auto md:mx-0"></div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We offer <span className="text-pink-600 font-semibold">value-based matrimonial guidance services</span> for families and individuals seeking <span className="text-rose-600 font-semibold">compatible and respectable life partners</span>. Our approach focuses on understanding family values, personal aspirations, and cultural compatibility.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-pink-200 shadow-sm">
                      <Shield className="w-3.5 h-3.5 text-pink-600" />
                      <span className="text-xs font-medium text-pink-700">Confidential</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-rose-200 shadow-sm">
                      <Users className="w-3.5 h-3.5 text-rose-600" />
                      <span className="text-xs font-medium text-rose-700">Personalized</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 2 - Pre & Post Wedding Courses (Right) */}
            <div className="group animate-fade-in-up animation-delay-1200">
              <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-gradient-to-br from-rose-50 to-purple-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <GraduationCap className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-right">
                  <h4 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-3">
                    Pre & Post Wedding Courses
                  </h4>
                  <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full mb-4 mx-auto md:ml-auto md:mr-0"></div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our team conducts <span className="text-rose-600 font-semibold">Special Pre-Wedding & Post-Wedding Courses</span> to help newly wedded couples develop <span className="text-purple-600 font-semibold">emotional understanding, mutual respect, and harmony</span> for a happy lifelong relationship.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-rose-200 shadow-sm">
                      <Award className="w-3.5 h-3.5 text-rose-600" />
                      <span className="text-xs font-medium text-rose-700">Expert-Led</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-purple-200 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-purple-600" />
                      <span className="text-xs font-medium text-purple-700">Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Promise - Full Width Banner */}
        <div className="relative py-20 mb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-200 to-purple-400"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <Crown className="w-12 h-12 text-yellow-300 mx-auto mb-4 animate-bounce-slow drop-shadow-lg" />
              <h3 className="text-3xl md:text-4xl font-bold text-purple-600 italic mb-4 leading-tight drop-shadow-lg">
                "Where Understanding Meets Togetherness"
              </h3>
              <p className="text-base md:text-lg text-white/95 leading-relaxed drop-shadow">
                Building bridges between hearts, fostering lifelong companionship through trust, respect, and genuine connections
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us - Open Grid Style */}
        <div className="container mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 border-2 border-purple-300 px-4 py-2 rounded-full mb-3">
              <Crown className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-bold">WHY CHOOSE US</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
              The AristoMatch Advantage
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group text-center animate-fade-in-up animation-delay-1400">
              <div className="relative inline-block mb-5">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 border-4 border-pink-300 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <Users className="w-10 h-10 text-pink-600" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Expert Team</h4>
              <p className="text-gray-700 leading-relaxed">
                Guided by experienced professionals from diverse backgrounds including doctors, professors, and retired officers
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center animate-fade-in-up animation-delay-1600">
              <div className="relative inline-block mb-5">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-rose-100 to-purple-100 border-4 border-rose-300 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <Heart className="w-10 h-10 text-rose-600" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Value-Based Matching</h4>
              <p className="text-gray-700 leading-relaxed">
                Finding compatible partners based on core values, principles, and shared life goals for lasting relationships
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center animate-fade-in-up animation-delay-1800">
              <div className="relative inline-block mb-5">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-300 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <Shield className="w-10 h-10 text-purple-600" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Support</h4>
              <p className="text-gray-700 leading-relaxed">
                Pre and post-wedding guidance ensuring couples are prepared for a harmonious and fulfilling married life
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section - Open Layout */}
        <div className="container mx-auto px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group cursor-pointer">
                <div className="relative inline-block mb-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                    500+
                  </div>
                </div>
                <div className="text-gray-800 font-bold text-lg mb-2">Happy Couples</div>
                <div className="w-20 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full"></div>
              </div>
              
              <div className="text-center group cursor-pointer">
                <div className="relative inline-block mb-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative text-5xl md:text-6xl font-black bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                    15+
                  </div>
                </div>
                <div className="text-gray-800 font-bold text-lg mb-2">Years of Experience</div>
                <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto rounded-full"></div>
              </div>
              
              <div className="text-center group cursor-pointer">
                <div className="relative inline-block mb-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                    100%
                  </div>
                </div>
                <div className="text-gray-800 font-bold text-lg mb-2">Confidential Service</div>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }

        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.1); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-float-particle {
          animation: float-particle linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1200 { animation-delay: 1.2s; }
        .animation-delay-1400 { animation-delay: 1.4s; }
        .animation-delay-1600 { animation-delay: 1.6s; }
        .animation-delay-1800 { animation-delay: 1.8s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default AboutUs;