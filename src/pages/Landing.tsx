import React from 'react';
import { useNavigate } from "react-router-dom";
import { Heart, Shield, Users, Star, CheckCircle, TrendingUp } from 'lucide-react';
import heroImage from '../Images/ChatGPT Image Jan 3, 2026, 04_53_31 PM.png';
import coupleOverlayImage from '../Images/Untitled design (3).png'; // Add your overlay image here


interface LandingProps {
  onNavigate: (page: string) => void;
}

export const Landing: React.FC<LandingProps> = ({onNavigate}) => {
 

  return (
    <div className="space-y-0">
      {/* ========================================
          HERO SECTION WITH BACKGROUND IMAGE
          ======================================== */}
      <div 
        className="relative overflow-hidden -mt-28 "
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          maxHeight: '110vh'
        }}
      >
       
        
        <div className="relative z-10 min-h-screen flex items-center justify-between px-6 md:px-8 lg:px-16 py-20">
          {/* Left Side - Text Content */}
          <div className=" lg:pl-16 pt-10">
            {/* Heading */}
            <h1 className="mb-5  ">
              <span 
                className="block pl-10  text-3xl md:text-4xl lg:text-5xl mb-1 italic leading-tight" 
                style={{ 
                  fontFamily: ' serif',
                  color: '#8B6F47',
                  fontWeight: '400',
                  letterSpacing: '0.01em',
                  textShadow: '0 2px 4px rgba(255,255,255,0.3)'
                }}
              >
                Find Your Perfect
              </span>
              <span 
                className="block text-5xl md:text-6xl lg:text-7xl font-bold leading-tight "
                style={{ 
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  color: '#A0522D',
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 4px rgba(255,255,255,0.3)'
                }}
              >
                Life Partner
              </span>
            </h1>
            
            {/* Decorative Divider */}
            <div className="flex items-center gap-20 my-2">
              <div className="h-px w-32" style={{ background: 'linear-gradient(to right, #B8956A, transparent)' }}></div>
              <div style={{ color: '#B8956A', fontSize: '14px' }}>✦</div>
              <div className="h-px w-32" style={{ background: 'linear-gradient(to right, transparent, #B8956A)' }}></div>
            </div>

            {/* Description Text */}
            <div className="space-y-0 mb-8   ">
              <p 
                className="text-xl ml-16  md:text-2xl leading-relaxed"
                style={{ color: '#A0522D', fontWeight: '550' }}
              >
                Join India's most trusted
              </p>
              <p 
                className="text-xl ml-20 md:text-2xl leading-relaxed"
                style={{ color: '#A0522D', fontWeight: '550' }}
              >
                matrimonial platform.
              </p>
              <p 
                className="text-xl ml-10 md:text-2xl leading-relaxed mt-3"
                style={{ color: '#A0522D', fontWeight: '550' }}
              >
                Thousands of verified profiles
              </p>
              <p 
                className="text-xl ml-14   md:text-2xl leading-relaxed"
                style={{ color: '#A0522D', fontWeight: '550' }}
              >
                waiting to connect with you.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 max-w-xs ml-14">
                <button
                    onClick={() => onNavigate('register')}
                  className="px-14 py-5 rounded-full cursor-pointer bg-gradient-to-r  from-rose-500 to-pink-500 text-white text-lg font-semibold transition-all hover:scale-105"
                  style={{
                    // background:
                    //   "linear-gradient(to right, rgba(214,140,125,0.98), rgba(224,155,140,0.98))",
                    border: "1px solid rgba(255,220,210,0.35)",
                    boxShadow: "0 12px 40px rgba(214,140,125,0.45)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)"
                  }}
                >
                  Register Free
                </button>


              <button
                onClick={() => onNavigate('login')}
                className="px-10 py-2 cursor-pointer rounded-full bg-pink-50 text-base md:text-lg font-medium transition-all hover:bg-white/60"
                style={{
                  // background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(8px)',
                  border: '2px solid rgba(255, 215, 180, 0.4)',
                  color: '#5D4E47',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  letterSpacing: '0.3px'
                }}
              >
                Login
              </button>
            </div>
          </div>

          {/* Right Side - Overlay Image */}
          <div className="hidden lg:block relative pt-12">
            <div className="relative w-auto h-[42rem] ">
              <img 
                src={coupleOverlayImage}
                alt="Happy Couple"
                className="w-full h-full object-contain drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))'
                }}
              />
              {/* Optional decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-rose-200/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

        
      <div 
        style={{ 
          backgroundImage: `url(${heroImage})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }} 
        className="relative z-10"
      >
  {/* Subtle overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 via-purple-50/20 to-pink-50/30"></div>
  
  <div className="relative z-10"> 
    {/* Header Text */}
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-8 text-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#A0522D' }}>
        <span style={{ color: '#8B6F47' }}>Experience matters.</span> That's why we're the
      </h2>
      <p className="text-2xl md:text-3xl lg:text-4xl font-semibold" style={{ color: '#A0522D' }}>
        #1 choice for finding your life partner.
      </p>
    </section>

    {/* Features Section */}
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <div className="space-y-12">
        {/* Verified Profiles */}
        <div className="flex items-center gap-8 bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#A0522D' }}>
              Verified Profiles
            </h3>
            <p className="text-xl text-gray-600">
              All profiles undergo strict verification to ensure authenticity and safety.
            </p>
          </div>
        </div>

        {/* Lakhs of Members */}
        <div className="flex items-center gap-8 bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl flex items-center justify-center shadow-xl">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#A0522D' }}>
              Lakhs of Members
            </h3>
            <p className="text-xl text-gray-600">
              Join millions of users who found their life partner through our platform
            </p>
          </div>
        </div>

        {/* Success Stories */}
        <div className="flex items-center gap-8 bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-xl">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#A0522D' }}>
              Success Stories
            </h3>
            <p className="text-xl text-gray-600">
              Thousands of happy couples have found their soulmate here.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Why Choose Section */}
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-20">
      <div className=" rounded-3xl shadow-xl p-12 md:p-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16" style={{ color: '#A0522D' }}>
          Why Choose AristoMatch?
        </h2>
        <div className="space-y-6">
          {[
            'Advanced search filters for precise matches',
            'Secure messaging and privacy controls',
            'Photo and video profiles',
            'Horoscope matching support',
            'Phone verification for all users',
            'Dedicated customer support',
            'Mobile-friendly platform',
            'Regular profile updates'
          ].map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <span className="text-3xl mt-1" style={{ color: '#ff5c8a' }}>•</span>
              <span className="text-xl md:text-2xl text-[#30343f] font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center   rounded-3xl p-12 shadow-lg">
          <div className="text-6xl md:text-7xl font-bold mb-3" style={{ color: '#8B6F47 ' }}>
            5L+
          </div>
          <div className="text-2xl font-semibold" style={{ color: '#A0522D' }}>Active Users</div>
        </div>
        <div className="text-center rounded-3xl p-12 shadow-lg">
          <div className="text-6xl md:text-7xl font-bold mb-3" style={{ color: '#8B6F47' }}>
            50K+
          </div>
          <div className="text-2xl font-semibold" style={{ color: '#A0522D' }}>Success Stories</div>
        </div>
        <div className="text-center rounded-3xl p-12 shadow-lg">
          <div className="text-6xl md:text-7xl font-bold mb-3" style={{ color: '#8B6F47' }}>
            4.8/5
          </div>
          <div className="flex justify-center mb-3 gap-2">
            <span className="text-4xl" style={{ color: '#FFD700' }}>★</span>
            <span className="text-4xl" style={{ color: '#FFD700' }}>★</span>
            <span className="text-4xl" style={{ color: '#FFD700' }}>★</span>
            <span className="text-4xl" style={{ color: '#FFD700' }}>★</span>
            <span className="text-4xl" style={{ color: '#FFD700', opacity: 0.5 }}>★</span>
          </div>
          <div className="text-2xl font-semibold" style={{ color: '#A0522D' }}>User Rating</div>
        </div>
      </div>
    </section>

    {/* Final CTA Section */}
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 pb-24">
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 md:p-16 text-center shadow-xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#A0522D' }}>
          Ready to Start Your Journey?
        </h2>
        <p className="text-2xl md:text-3xl mb-12 font-medium" style={{ color: '#A0522D' }}>
          Register now and find your perfect match today!
        </p>
        <button
          onClick={() => onNavigate('register')}
          className="px-16 py-5 rounded-full text-2xl font-bold bg-gradient-to-r  from-rose-500 to-pink-500 text-white shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
          style={{
            // background: 'linear-gradient(135deg, #E87BA0 0%, #F5A7B8 100%)',
            border: 'none'
          }}
        >
          Get Started Free
        </button>
      </div>
    </section>
  </div>
</div>
    </div>
  );
};