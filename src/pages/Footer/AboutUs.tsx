import React, { useState } from 'react';
import { Heart, Users, Award, Sparkles, GraduationCap, Shield, Star, Zap, Crown, Target, Camera, BookOpen, MessageCircle, Compass, Gift, Laugh } from 'lucide-react';

const AboutUs = () => {
  const [activeService, setActiveService] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Magazine Style */}
      <section className="relative overflow-hidden">
        {/* Top section with logo and tagline */}
        <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 border-b-4 border-pink-200">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-block mb-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-pink-300">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-pink-700">LIVE | TRUSTED BY 500+ FAMILIES</span>
                </div>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black tracking-tight mb-4" style={{letterSpacing: '-0.02em'}}>
                <span className="block text-gray-900">ARISTO</span>
                <span className="block bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent" style={{WebkitTextStroke: '2px transparent'}}>MATCH</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 font-medium mb-2">R.S. Matrimonial Services</p>
              <p className="text-base text-gray-500 italic">Est. 2025 | Bathinda, Punjab</p>
            </div>
          </div>
        </div>

        {/* Main content area - Newspaper/Magazine Layout */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Featured Quote Box */}
              <div className="bg-gradient-to-br from-pink-600 to-purple-700 text-white p-12 rounded-3xl mb-16 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4 opacity-50">"</div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    Where Understanding Meets Togetherness
                  </h2>
                  <p className="text-lg text-white/90 leading-relaxed max-w-3xl">
                    We don't just introduce people. We connect souls, unite families, and build foundations 
                    for lifelong partnerships based on shared values, mutual respect, and genuine understanding.
                  </p>
                </div>
              </div>
              {/* Who We Are - Centered */}
              <div className="mb-16">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-pink-700 uppercase tracking-wider mb-2">Who We Are</h3>
                    <h4 className="text-3xl font-black text-gray-900 mb-4">A Team Like No Other</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Founded and led by a distinguished panel of doctors, professors, retired military officers,
                    and successful businessmen, AristoMatch brings together decades of life experience,
                    professional expertise, and genuine care for your happiness.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We understand that matrimony is not just about two individuals - it's about two families,
                    two cultures, and two sets of dreams coming together.
                  </p>
                </div>

                {/* Stats cards commented out as requested
                <div className="space-y-6">
                  ...
                </div>
                */}
              </div>
              {/* Bottom Feature Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="text-sm font-bold text-gray-900">Confidential</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-sm font-bold text-gray-900">Personalized</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-rose-600" />
                  </div>
                  <div className="text-sm font-bold text-gray-900">Expert-Led</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="text-sm font-bold text-gray-900">Value-Based</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
      `}</style>

      {/* Story Section - Timeline Style */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black text-gray-900 mb-4">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Story</span>
              </h2>
              <p className="text-xl text-gray-600">More than a service, it's a calling</p>
            </div>

            {/* Timeline items */}
            <div className="space-y-16">
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-xl">
                  <Compass className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">The Beginning</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Founded by a diverse group of doctors, professors, and distinguished professionals who saw the need for a more thoughtful, value-driven approach to matchmaking. We believe compatibility goes deeper than profiles and photos.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Philosophy</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We don't just match people; we understand them. Every family has a story, every person has dreams, and every relationship deserves to be built on a foundation of shared values, mutual respect, and genuine connection.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Today & Beyond</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Over 500 beautiful love stories later, we continue to believe that finding the right partner is life's most important journey. And we're honored to walk alongside you every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-bold mb-4">
              WHAT WE DO
            </span>
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              More Than Matchmaking
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Service Cards */}
              <div 
                className="group cursor-pointer bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:scale-105 border-2 border-transparent hover:border-pink-300"
                onMouseEnter={() => setActiveService(0)}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Matrimonial Guidance</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Personalized matchmaking that considers your values, aspirations, and what truly matters to you and your family. No algorithms, just human understanding.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white px-3 py-1 rounded-full text-sm text-pink-700 font-medium shadow-sm">Confidential</span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm text-rose-700 font-medium shadow-sm">Value-Based</span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm text-purple-700 font-medium shadow-sm">Personal Touch</span>
                </div>
              </div>

              <div 
                className="group cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:scale-105 border-2 border-transparent hover:border-purple-300"
                onMouseEnter={() => setActiveService(1)}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Wedding Courses</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Unique pre and post-wedding programs that prepare couples for a lifetime of partnership. Because marriage is beautiful, but it also takes work and understanding.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white px-3 py-1 rounded-full text-sm text-purple-700 font-medium shadow-sm">Expert-Led</span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm text-pink-700 font-medium shadow-sm">Practical</span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm text-rose-700 font-medium shadow-sm">Supportive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Unique Cards */}
      <section className="py-14 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-4">
                Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Dream Team</span>
              </h2>
              <p className="text-xl text-gray-600">Diverse expertise, shared mission</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-center text-gray-900 mb-2">Medical Professionals</h4>
                <p className="text-gray-600 text-center text-sm">Doctors bringing empathy and care to every interaction</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-center text-gray-900 mb-2">Professors</h4>
                <p className="text-gray-600 text-center text-sm">Academics providing wisdom and thoughtful guidance</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-center text-gray-900 mb-2">Distinguished Leaders</h4>
                <p className="text-gray-600 text-center text-sm">Retired officers and businessmen with life experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;

